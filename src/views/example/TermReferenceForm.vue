<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <div class="px-4 container-area-form">
          <div class="section-form">
            <div class="content">
              <h4 class="header">Termo de Referência</h4>
              <p class="description">
                Estas informações são para cadastrar dados do termo de
                referência, todos os dados dos termos cadastrados serão visíveis
                a partir de permissões liberadas para os usuários.
              </p>
            </div>
          </div>
          <form>
            <!-- Termo de Referência -->
            <h5 class="input-full">Termo de Referência</h5>
            <div class="p-field flex flex-column input-full pb-4 pt-4">
              <FileUpload
                v-if="!form?.caminho_arquivo"
                id="archive"
                mode="basic"
                name="archive"
                class="w-full"
                custom-upload
                :multiple="false"
                :choose-label="'Buscar anexo'"
                :upload-label="'Upload'"
                :cancel-label="'Cancelar'"
                @select="(event) => (form.arquivo = event.files)"
              />
              <span v-else class="component-download-archive">
                <a
                  target="_blank"
                  :href="
                    buildAccessArchives(
                      services.httpConfig.getUri(),
                      form.caminho_arquivo
                    )
                  "
                  >Visualizar Arquivo</a
                >
                <i v-tooltip.top="'Apagar Arquivo'" class="fa-solid fa-xmark" />
              </span>
              <small class="p-error">{{ errors.arquivo?.message }}</small>
            </div>
            <hr class="divider" />
            <!-- Seg. Comercial -->
            <div class="container-inputs-form">
              <h5 class="input-full">Seg. Comercial</h5>
              <div class="p-field">
                <label for="setorProduto">Setor do Produto</label>
                <MultiSelect
                  v-model="form.setor_produtos"
                  :options="optionsSetorProdutos"
                  option-label="text"
                  option-value="value"
                  placeholder="Selecionar Setor do Produto"
                  class="w-full"
                  :max-selected-labels="3"
                />
                <small class="p-error">{{
                  errors?.setor_produtos?.message
                }}</small>
              </div>
              <div class="p-field">
                <label for="subseguinteComercial">Subseguinte Comercial</label>
                <MultiSelect
                  v-model="form.subseguinte_comerciais"
                  :options="optionsSubseguinteComercial"
                  option-label="text"
                  option-value="value"
                  placeholder="Selecionar Subseguinte Comercial"
                  class="w-full"
                  :max-selected-labels="3"
                />
                <small class="p-error">{{
                  errors?.subseguinte_comerciais?.message
                }}</small>
              </div>
            </div>
            <hr class="divider" />
            <!-- Prazos -->
            <div class="container-inputs-form">
              <h5 class="input-full">Prazos</h5>
              <div class="flex flex-column gap-2 w-full">
                <label class="font-semibold" for="validade_proposta"
                  >Validade da Proposta</label
                >
                <Calendar
                  v-model="form.validade_proposta"
                  show-icon
                  date-format="dd/mm/yy"
                  placeholder="00/00/0000"
                />
                <small id="validade_proposta_error"
                  >Selecione a data da validade proposta.</small
                >
                <small class="p-error">{{
                  errors.validade_proposta?.message
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label class="font-semibold" for="validade_proposta"
                  >Prazo de Entrega</label
                >
                <Calendar
                  v-model="form.prazo_entrega"
                  show-icon
                  date-format="dd/mm/yy"
                  placeholder="00/00/0000"
                />
                <small id="validade_proposta_error" class="text-gray-600"
                  >Selecione a data do prazo.</small
                >
                <small class="p-error">{{
                  errors.prazo_entrega?.message
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label class="font-semibold" for="validade_proposta"
                  >Prazo de Garantia do Produto</label
                >
                <Calendar
                  v-model="form.prazo_garantia_produto"
                  show-icon
                  date-format="dd/mm/yy"
                  placeholder="00/00/0000"
                />
                <small id="validade_proposta_error"
                  >Selecione a data do prazo de garantia.</small
                >
                <small class="p-error">{{
                  errors.prazo_garantia_produto?.message
                }}</small>
              </div>
              <div v-if="showRPA" class="flex flex-column gap-2 w-full">
                <label class="font-semibold" for="validade_proposta"
                  >Validade da ARP (Meses)</label
                >
                <InputNumber
                  v-model="form.validade_assinatura_arp"
                  placeholder="00 - Meses"
                  suffix=" - Meses"
                  :use-grouping="false"
                />
                <small id="validade_proposta_error"
                  >Digite a quantidade de meses da validade da ARP.</small
                >
                <small class="p-error">{{
                  errors.validade_arp?.message
                }}</small>
              </div>
            </div>
            <hr class="divider" />
            <!-- Lista de Produtos -->
            <div>
              <span class="header-group-itens">
                <p class="text-xl mb-0 font-bold text-gray-800">
                  Lista de Produtos
                </p>
                <span class="actions">
                  <Button
                    v-if="showAddItem"
                    size="small"
                    icon="pi pi-plus"
                    label="Adicionar Item"
                    @click="addItem()"
                  />
                  <Button
                    v-if="showAddGroup"
                    size="small"
                    icon="pi pi-plus"
                    label="Adicionar Grupo"
                    @click="addGroup"
                  />
                </span>
              </span>
              <!-- Itens/Grupos ADD -->
              <!-- Grupo -->
              <div v-if="itensGroups.length > 0" class="container-group-itens">
                <div
                  v-for="(item, index) in itensGroups"
                  :key="index.toString() + 'item'"
                >
                  <div v-if="'grupo' in item" class="card-item">
                    <span class="group-header relative">
                      <span
                        style="min-width: 75px"
                        class="font-bold text-gray-800"
                        >Grupo N°:</span
                      >
                      <div style="display: flex; flex-direction: column; gap-1">
                        <InputNumber
                          v-model="item.grupo"
                          :use-grouping="false"
                          class="w-full"
                        />
                        <small class="p-error">{{
                          errors[`itens-${index}-grupo`]?.message
                        }}</small>
                      </div>
                      <Button
                        class="w-3"
                        icon="pi pi-plus"
                        label="Item"
                        @click="addItem(index)"
                      />
                      <Button
                        class="w-2 bg-red-400"
                        icon="pi pi-trash"
                        @click="deleteItem(index)"
                      />
                    </span>
                    <Fieldset
                      v-for="(itemGroup, indexItem) in item.items"
                      :key="itemGroup.numero?.toString()"
                      :legend="itemGroup.numero?.toString()"
                      :toggleable="true"
                      class="relative mb-4"
                    >
                      <button
                        type="button"
                        class="float-btn-delete"
                        @click="deleteItemGroup(index, indexItem)"
                      >
                        X
                      </button>
                      <div
                        style="display: flex; flex-direction: column; gap: 8px"
                        class="pl-4"
                      >
                        <!-- Itens -->
                        <div class="p-field input-full">
                          <label for="validadeARP">Nº ITEM</label>
                          <InputNumber
                            v-model="itemGroup.numero"
                            :use-grouping="false"
                            placeholder="Digite o número do item"
                            class="w-full"
                          />
                          <small class="p-error">{{
                            errors[`itens-${index}-numero`]?.message
                          }}</small>
                        </div>
                        <div class="p-field input-full">
                          <label for="validadeARP"
                            >Descrição Simplificada</label
                          >
                          <InputText
                            v-model="itemGroup.descricao_simplificada"
                            placeholder="Digite a descrição simplificada"
                            class="w-full"
                            @blur="
                              (event) =>
                                searchProductsItem(
                                  (event.target as HTMLInputElement).value,
                                  [index, indexItem]
                                )
                            "
                          />
                          <small class="p-error">{{
                            errors[`itens-${index}-produto_item_id`]?.message
                          }}</small>
                        </div>
                        <div class="p-field input-full">
                          <label for="validadeARP"
                            >Descrição completa Termo de Referência</label
                          >
                          <InputText
                            v-model="itemGroup.descricao_completa"
                            placeholder="Digite a descrição completa"
                            class="w-full"
                          />
                          <small class="p-error">{{
                            errors[`itens-${index}-produto_item_id`]?.message
                          }}</small>
                        </div>
                        <div style="display: flex; flex-direction: column">
                          <label for="validadeARP">Unidade de medida</label>
                          <Dropdown
                            v-model="itemGroup.unidade_medida"
                            :options="optionsUnitMeasure"
                            option-label="text"
                            option-value="value"
                            placeholder="Selecionar Unidade Medida"
                            class="w-full"
                          />
                          <small class="p-error">{{
                            errors[`itens-${index}-produto_item_id`]?.message
                          }}</small>
                        </div>
                        <div class="p-field input-full">
                          <label for="validadeARP">Quantidade</label>
                          <InputNumber
                            v-model="itemGroup.quantidade"
                            placeholder="Digite a quantidade"
                            class="w-full"
                          />
                          <small class="p-error">{{
                            errors[`itens-${index}-quantidade`]?.message
                          }}</small>
                        </div>
                      </div>
                    </Fieldset>
                  </div>
                  <!-- Itens -->
                  <Fieldset
                    v-else
                    :legend="item.numero?.toString()"
                    :toggleable="true"
                    class="relative"
                  >
                    <button
                      type="button"
                      class="float-btn-delete"
                      @click="deleteItem(index)"
                    >
                      X
                    </button>
                    <div
                      style="display: flex; flex-direction: column; gap: 8px"
                    >
                      <div class="p-field input-full">
                        <label for="validadeARP">Nº ITEM</label>
                        <InputNumber
                          v-model="item.numero"
                          :use-grouping="false"
                          placeholder="Digite o número do item"
                          class="w-full"
                        />
                        <small class="p-error">{{
                          errors[`itens-${index}-numero`]?.message
                        }}</small>
                      </div>
                      <div class="p-field input-full">
                        <label for="validadeARP">Descrição Simplificada</label>
                        <InputText
                          v-model="item.descricao_simplificada"
                          placeholder="Digite a descrição simplificada"
                          class="w-full"
                          @blur="
                            (event) =>
                              searchProductsItem(
                                (event.target as HTMLInputElement).value,
                                [index]
                              )
                          "
                        />
                        <small class="p-error">{{
                          errors[`itens-${index}-produto_item_id`]?.message
                        }}</small>
                      </div>
                      <div class="p-field input-full">
                        <label for="validadeARP"
                          >Descrição completa Termo de Referência</label
                        >
                        <InputText
                          v-model="item.descricao_completa"
                          placeholder="Digite a descrição completa"
                          class="w-full"
                        />
                        <small class="p-error">{{
                          errors[`itens-${index}-produto_item_id`]?.message
                        }}</small>
                      </div>
                      <div
                        class="flex flex-col"
                        style="display: flex; flex-direction: column"
                      >
                        <label for="validadeARP">Unidade de medida</label>
                        <Dropdown
                          v-model="item.unidade_medida"
                          :options="optionsUnitMeasure"
                          option-label="text"
                          option-value="value"
                          placeholder="Selecionar Unidade Medida"
                          class="w-full"
                        />
                        <small class="p-error">{{
                          errors[`itens-${index}-produto_item_id`]?.message
                        }}</small>
                      </div>
                      <div class="p-field input-full">
                        <label for="validadeARP">Quantidade</label>
                        <InputNumber
                          v-model="item.quantidade"
                          placeholder="Digite a quantidade"
                          class="w-full"
                        />
                        <small class="p-error">{{
                          errors[`itens-${index}-quantidade`]?.message
                        }}</small>
                      </div>
                    </div>
                  </Fieldset>
                </div>
              </div>
              <div v-else class="empty-itens container">
                Nenhum item ou grupo cadastrado!
              </div>
              <!-- Footer Actions -->
              <div class="input-full flex flex-row-reverse gap-2 mt-4">
                <Button
                  :label="
                    !storeProcess.term_reference.id ? 'Salvar' : 'Atualizar'
                  "
                  @click="requireConfirmation($event)"
                />
                <Button severity="secondary" label="Próximo" outlined text />
                <ConfirmPopup group="headless">
                  <template
                    #container="{ message, acceptCallback, rejectCallback }"
                  >
                    <div class="border-round p-3">
                      <span>{{ message.message }}</span>
                      <div class="flex align-items-center gap-2 mt-3">
                        <Button
                          label="Salvar"
                          size="small"
                          severity="secondary"
                          text
                          outlined
                          @click="acceptCallback"
                        ></Button>
                        <Button
                          label="Salvar e Finalizar"
                          size="small"
                          @click="rejectCallback"
                        ></Button>
                      </div>
                    </div>
                  </template>
                </ConfirmPopup>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="condition"
    modal
    class="dialog-products"
    :header="!active ? 'Selecione os Produtos' : 'Cadastre um produto'"
    :content-style="!active ? { height: '350px' } : { height: '500px' }"
    :draggable="false"
    :closable="false"
    :style="{ width: '40rem' }"
    @hide="clearProductItem"
  >
    <TabView v-model:activeIndex="active" class="tabview-products">
      <TabPanel>
        <div class="modal-options-itens">
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
            "
          >
            <span class="p-text-secondary block"
              >Escolha o que corresponder sua busca.</span
            >
            <div class="container-options">
              <div
                v-for="productItem in optionsProductsItems"
                :key="productItem.id"
                :class="[
                  'card-selection-item',
                  { active: selectedProduct === productItem.id }
                ]"
                @click="selectProductItem(productItem, itemIndex!)"
              >
                {{ productItem.descricao_simplificada.toUpperCase() }}
                <p class="text-gray-500 text-sm">
                  {{ productItem.descricao_completa.toLowerCase() }}
                </p>
              </div>
              <div class="card-selection-item" @click="registerProduto">
                Cadastrar Produto
              </div>
            </div>
            <div class="flex justify-content-end gap-2">
              <Button
                type="button"
                label="Confirmar"
                @click="condition = false"
              ></Button>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <FormProductItem
          :type-measure="typeMeasure"
          :index="itemIndex"
          @event-back="changeTabView"
          @event-create="selectProductItem"
          @event-close="condition = false"
        />
      </TabPanel>
    </TabView>
  </Dialog>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import { newItem } from '@/utils/constants'
import useProcessStore from '@/store/process'
import FormProductItem from '@/components/Forms/FormProductItem.vue'

import services from '@/api'

import type { Group, BaseItem } from '@/@types/term_reference'
import type { ProductItemProtocol } from '@/@types/products'
import { buildAccessArchives, validityForm } from '@/utils/helpers'
import { schemaTermReference } from '@/utils/validations'

const confirm = useConfirm()
const condition = ref(false)
const storeProcess = useProcessStore()
const loadingSearch = ref<number | null>(null)
const optionsProductsItems = ref<ProductItemProtocol[]>([])
const toast = useToast()
const selectedProduct = ref<string | null>(null)
const itemIndex = ref<number[] | null>(null)
const loading = ref<boolean>(false)

const errors = ref<{ [key: string]: any }>({})
const active = ref(0)

const form = ref({
  arquivo: null,
  caminho_arquivo: '',
  setor_produtos: [] as string[],
  subseguinte_comerciais: [] as string[],
  validade_proposta: '',
  prazo_entrega: '',
  prazo_garantia_produto: '',
  validade_assinatura_arp: null
})

const optionsUnitMeasure = ref([])
const optionsSetorProdutos = ref([])
const optionsSubseguinteComercial = ref([])

const itensGroups = ref<(BaseItem | Group)[]>([])

const showAddItem = computed(() => {
  return ['Menor preço por item', 'Menor preço por item e por grupo'].includes(
    String(storeProcess.edital.julgamento?.nome)
  )
})

const showAddGroup = computed(() => {
  return ['Menor preço por grupo', 'Menor preço por item e por grupo'].includes(
    String(storeProcess.edital.julgamento?.nome)
  )
})

const clearProductItem = () => {
  itemIndex.value = null
  selectedProduct.value = null
}

const searchProductsItem = async (query: string, index: number[]) => {
  loadingSearch.value = null
  itemIndex.value = null
  selectedProduct.value = null

  try {
    const response = await services.Products.getProductsItem({
      descricao_simplificada: query
    })
    optionsProductsItems.value = response.data
    if (optionsProductsItems.value.length) {
      condition.value = true
      itemIndex.value = index
    }
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Erro ao procurar produto'
    })
  } finally {
    loadingSearch.value = null
  }
}

const selectProductItem = (product: ProductItemProtocol, index: number[]) => {
  const item = itensGroups.value[index[0]]

  if (isGroup(item)) {
    item.items[index[1]] = {
      ...item.items[index[1]],
      produto_item_id: product.id,
      descricao_simplificada: product.descricao_simplificada.toLowerCase(),
      descricao_completa: product.descricao_completa.toLowerCase(),
      unidade_medida: product.unidade_medida_id
    }
  } else {
    itensGroups.value[index[0]] = {
      ...itensGroups.value[index[0]],
      produto_item_id: product.id,
      descricao_simplificada: product.descricao_simplificada.toLowerCase(),
      descricao_completa: product.descricao_completa.toLowerCase(),
      unidade_medida: product.unidade_medida_id
    }
  }
  selectedProduct.value = product.id
}

const changeTabView = (index: number) => {
  active.value = index
}

const showRPA = computed(() => {
  return ['Pregão SRP', 'Concorrência SRP'].includes(
    storeProcess?.edital?.modalidade.nome
  )
})

const typeMeasure = computed(() => {
  const regimeName = storeProcess.edital.regime.nome
  return regimeName.includes('Fornecimento') ? 'material' : 'servico'
})

const registerProduto = () => {
  active.value = 1
}

const deleteItem = (indexItem: number) => {
  itensGroups.value.splice(indexItem, 1)
}

const deleteItemGroup = (indexGroup: number, indexItem: number) => {
  const target = itensGroups.value[indexGroup]
  if (isGroup(target)) target.items?.splice(indexItem, 1)
}

const addItem = (indexGroup?: number) => {
  if (typeof indexGroup === 'number') {
    const target = itensGroups.value[indexGroup]
    if (isGroup(target)) {
      target.items.push(JSON.parse(JSON.stringify(newItem)))
    }
  } else {
    itensGroups.value.push(JSON.parse(JSON.stringify(newItem)))
  }
}

const addGroup = () => {
  itensGroups.value.push({
    grupo: null,
    items: []
  })
}

const isGroup = (object: BaseItem | Group): object is Group => {
  return 'grupo' in object
}

const requireConfirmation = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    position: 'top',
    group: 'headless',
    message: 'Deseja salvar termo de referência?',
    accept: () => {
      console.log('Accept')
    },
    reject: () => {
      onFormSubmit()
    }
  })
}

const getOptionsUnitMeasure = async () => {
  try {
    const response = await services.Option.getUnitMeasure(typeMeasure.value)
    optionsUnitMeasure.value = response.data
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Error receber opções de unidades medidas'
    })
  }
}

const getOptionsSetorProduto = async () => {
  try {
    const response = await services.Option.getSetorProduto()
    optionsSetorProdutos.value = response.data
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Error receber opções do setores dos produtos'
    })
  }
}

const getOptionsSubSeguinteComecial = async () => {
  try {
    const response = await services.Option.getSubSeguinteComercial()
    optionsSubseguinteComercial.value = response.data
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Error receber opções de subseguinte comercial medidas'
    })
  }
}

const populateOptions = async () => {
  loading.value = true
  try {
    await Promise.all([
      getOptionsUnitMeasure(),
      getOptionsSetorProduto(),
      getOptionsSubSeguinteComecial()
    ])
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Error receber as opções'
    })
  } finally {
    loading.value = false
  }
}

const treatBody = () => {
  const data = {
    ...form.value,
    itens: itensGroups.value
      .map((item) => {
        if (isGroup(item)) {
          const itensGroup = item.items.map((itemGroup) => ({
            numero: itemGroup.numero,
            quantidade: itemGroup.quantidade,
            produto_item_id: itemGroup.produto_item_id,
            grupo: item.grupo
          }))
          return itensGroup
        }
        return {
          numero: item.numero,
          quantidade: item.quantidade,
          produto_item_id: item.produto_item_id
        }
      })
      .flat(1)
  }

  if (!showRPA.value) {
    if (typeof data == 'object' && 'validade_assinatura_arp' in data) {
      delete data.validade_assinatura_arp
    }
  }

  return data
}

const transformFormData = (data: any) => {
  const formData = new FormData()
  if (!data.caminho_arquivo) {
    formData.append('arquivo', data.arquivo[0])
  }
  formData.append(
    'validade_proposta',
    (data.validade_proposta as Date).toISOString().split('T')[0]
  )
  formData.append(
    'prazo_entrega',
    (data.prazo_entrega as Date).toISOString().split('T')[0]
  )
  formData.append(
    'prazo_garantia_produto',
    (data.prazo_garantia_produto as Date).toISOString().split('T')[0]
  )
  if ('validade_assinatura_arp' in data) {
    formData.append('validade_assinatura_arp', data.validade_assinatura_arp)
    formData.append('validade_publicacao_arp', data.validade_assinatura_arp)
  }

  data.setor_produtos.forEach((setor, index) => {
    formData.append(`setor_produtos[${index}]`, setor)
  })
  data.subseguinte_comerciais.forEach((subseguinte, index) => {
    formData.append(`subseguinte_comerciais[${index}]`, subseguinte)
  })
  data.itens.forEach((item, index) => {
    if ('grupo' in item) {
      formData.append(`itens[${index}][grupo]`, item.grupo)
      formData.append(`itens[${index}][produto_item_id]`, item.produto_item_id)
      formData.append(`itens[${index}][numero]`, item.numero)
      formData.append(`itens[${index}][quantidade]`, item.quantidade)
    } else {
      formData.append(`itens[${index}][produto_item_id]`, item.produto_item_id)
      formData.append(`itens[${index}][numero]`, item.numero)
      formData.append(`itens[${index}][quantidade]`, item.quantidade)
    }
  })
  return formData
}

const onFormSubmit = async () => {
  const body = treatBody()

  errors.value = validityForm(schemaTermReference, body)

  if (Object.keys(errors.value).length) return

  const formData = transformFormData(body)

  try {
    loading.value = true
    if (!storeProcess.term_reference.id) {
      await services.TermReference.createTermReference(
        formData,
        storeProcess.process.id
      )
    } else {
      await services.TermReference.updateTermReference(
        formData,
        storeProcess.process.id,
        storeProcess.term_reference.id
      )
    }
    populateFields()
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Error ao salvar/atualizar termo de referência'
    })
  } finally {
    loading.value = false
  }
}

const populateFields = () => {
  form.value = {
    ...storeProcess.term_reference,
    arquivo: null,
    setor_produtos: storeProcess.term_reference.setor_produtos.map(
      (setor) => setor.id
    ),
    subseguinte_comerciais:
      storeProcess.term_reference.subseguinte_comerciais.map(
        (setor) => setor.id
      ),
    validade_assinatura_arp:
      storeProcess.term_reference?.validade_publicacao_arp
  }

  if (storeProcess.term_reference?.itensGroups?.length > 0) {
    itensGroups.value = storeProcess.term_reference.itensGroups
  }
}

onMounted(() => {
  if (!isNaN(+storeProcess.term_reference?.id)) populateFields()
  populateOptions()
})
</script>

<style>
.p-fileupload .p-fileupload-buttonbar {
  @apply bg-background-light-white70 dark:bg-background-dark-blue70;
}
.p-fileupload .p-fileupload-content {
  @apply bg-background-light-white dark:bg-background-dark-blue;
}
.p-fileupload .p-fileupload-content .name-file {
  @apply text-light-gray dark:text-dark-gray;
}
.p-fileupload .p-fileupload-empty .icon-upload {
  @apply text-light-black70 dark:text-dark-white70;
}
.p-fileupload .p-fileupload-empty .description {
  @apply text-light-gray dark:text-dark-gray;
}
.p-error {
  @apply text-red-400 !important;
}
.tabview-products .p-tabview-nav-container {
  @apply hidden !important;
}
.tabview-products .p-tabview-panels {
  @apply bg-transparent h-[350px] !important;
}
.dialog-products .p-dialog-content {
  @apply p-0 !important;
}
</style>

<style scoped lang="scss">
.float-btn-delete {
  @apply absolute -top-12 right-0 cursor-pointer rounded-full w-10 h-10 bg-red-200 text-red-500 border-[1px] border-solid border-red-300 shadow-md duration-300 transition-all ease-in-out;

  &:hover {
    @apply bg-red-500 text-white border-red-500 font-bold;
  }
}
.container-area-form {
  @apply grid grid-cols-3 relative;

  .section-form {
    .content {
      @apply sticky top-0;
    }

    .header {
      @apply text-light-black70 dark:text-dark-white70 text-lg mb-1 font-semibold;
    }
    .description {
      @apply text-light-gray dark:text-dark-gray pr-4;
    }
  }
}
.container-form-bussiness {
  @apply grid grid-cols-2 gap-6 py-6 col-start-2 col-end-4 bg-background-light-white dark:bg-background-dark-blue70 rounded-lg shadow-sm p-4 max-h-[70vh] overflow-y-scroll;

  label {
    @apply text-light-black70 dark:text-dark-white70;
  }
  small {
    @apply text-light-gray dark:text-dark-gray;
  }

  .input-full {
    @apply col-start-1 col-end-3;
  }
}
h5 {
  @apply m-0 text-xl font-semibold;
}
form {
  @apply col-start-2 col-end-4 bg-background-light-white dark:bg-background-dark-blue70 rounded-lg shadow-sm p-4 max-h-[60vh] overflow-y-scroll;

  .input-full {
    @apply col-start-1 col-end-3;
  }
}
.container-inputs-form {
  @apply grid grid-cols-2 gap-4 pb-4;
}

.p-field {
  @apply flex flex-col gap-2;
}

.header-group-itens {
  @apply flex justify-between items-center px-2 pb-4;

  .actions {
    @apply flex gap-2;
  }
}

.container-group-itens {
  @apply flex flex-col gap-4;
}

.group-header {
  @apply flex items-center gap-1 mb-4;
}

.container {
  .empty-itens {
    @apply border-[1px] border-solid border-gray-300 rounded-md h-[300px] grid place-items-center text-gray-600;
  }
}

.divider {
  @apply w-full border-solid border-t-[1px] border-zinc-300 mb-4 mt-4;
}

.card {
  @apply rounded-none;

  .header-page {
    @apply flex justify-between items-center dark:text-dark-white70;
  }
}

.card-item {
  @apply border-[1px] border-gray-300 border-solid rounded-md p-6 shadow-md;
}

.modal-options-itens {
  @apply flex flex-col justify-between h-full;

  .container-options {
    @apply flex flex-col gap-2 max-h-[250px] overflow-x-hidden overflow-y-auto py-6 px-2;
  }
}
.card-selection-item {
  @apply border-[1px] border-solid border-gray-300 p-4 bg-zinc-100 rounded-md shadow-md transition-all duration-300 ease-in-out cursor-pointer;

  &:hover {
    transform: scale(1.02);
    @apply shadow-md bg-primary-800/90 text-white border-transparent;
  }
}
.card-selection-item.active {
  transform: scale(1.02);
  @apply bg-primary-800 text-white font-bold shadow-none border-transparent;
}
</style>
