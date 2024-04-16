<template>
  <div v-if="!!storeProcess.term_reference?.id">
    <span class="header-group-itens">
      <p class="text-xl mb-0 font-bold text-gray-800">Cadastrar Item/Grupo</p>
      <span class="actions">
        <SelectButton
          v-model="isGroupMode"
          :options="optionsModeRegisterItem"
          option-disabled="constant"
          option-value="value"
          option-label="name"
          aria-labelledby="basic"
          @change="(event) => changeModeItem(event.value)"
        />
      </span>
    </span>
    <div v-if="'grupo' in item" class="card-item">
      <span class="group-header relative">
        <InputNumberBase
          v-model="item.grupo"
          label="Grupo N°"
          :required="true"
          :error="errorsItem.grupo?.message"
          :invalid="!!errorsItem.grupo?.message"
          helper="Digite o número do grupo"
          :input-props="{
            allowEmpty: true,
            useGrouping: false
          }"
        />
      </span>
      <!-- Item -->
      <div class="mt-4 card-item mb-1">
        <div class="container-inputs">
          <InputNumberBase
            v-model="item.numero"
            label="N° ITEM"
            :required="true"
            :error="errorsItem.numero?.message"
            :invalid="!!errorsItem.numero?.message"
            helper="Digite o número do item."
            :input-props="{
              allowEmpty: true,
              useGrouping: false
            }"
          />
          <InputTextBase
            v-model="item.descricao_simplificada"
            label="Descrição Simplificada"
            helper="Busca de descrições compatíveis."
            :required="true"
            :error="errorsItem.produto_item_id?.message"
            :invalid="!!errorsItem.produto_item_id?.message"
            :input-props="{
              onBlur(payload) {
                if ((payload.target as HTMLInputElement).value.length)
                  searchProductsItem((payload.target as HTMLInputElement).value)
              }
            }"
          />
          <TextareaBase
            v-model="item.descricao_completa"
            label="Descrição completa"
            helper="Exibição de descrição completa"
            :required="true"
            :invalid="!!errorsItem.produto_item_id?.message"
            :error="errorsItem.produto_item_id?.message"
            :input-props="{ autoResize: true, disabled: true }"
          />
          <DropdownBase
            v-model="item.unidade_medida"
            label="Unidade de medida"
            helper="Selecione uma unidade medida"
            :required="true"
            :error="errorsItem.produto_item_id?.message"
            :invalid="!!errorsItem.produto_item_id?.message"
            :input-props="{
              optionLabel: 'text',
              optionValue: 'value',
              options: storeOptions.unidades_medidas,
              disabled: true
            }"
          />
          <InputNumberBase
            v-model="item.quantidade"
            label="Quantidade"
            :error="errorsItem.quantidade?.message"
            :invalid="!!errorsItem.quantidade?.message"
            :required="true"
            helper="Digite a quantidade"
            :input-props="{
              allowEmpty: true,
              useGrouping: false
            }"
          />
        </div>
      </div>
    </div>
    <!-- Item -->
    <div v-else class="card-item">
      <div class="pb-1 pt-2 container-inputs">
        <InputNumberBase
          v-model="item.numero"
          label="N° ITEM"
          :error="errorsItem.numero?.message"
          :invalid="!!errorsItem.numero?.message"
          helper="Digite o número do item."
          :required="true"
          :input-props="{
            allowEmpty: true,
            useGrouping: false
          }"
        />
        <InputTextBase
          v-model="item.descricao_simplificada"
          label="Descrição Simplificada"
          helper="Busca de descrições compatíveis."
          :error="errorsItem.produto_item_id?.message"
          :invalid="!!errorsItem.produto_item_id?.message"
          :required="true"
          :input-props="{
            onBlur(payload) {
              if ((payload.target as HTMLInputElement).value.length)
                searchProductsItem((payload.target as HTMLInputElement).value)
            }
          }"
        />
        <TextareaBase
          v-model="item.descricao_completa"
          label="Descrição completa"
          helper="Exibição de descrição completa"
          :required="true"
          :invalid="!!errorsItem.produto_item_id?.message"
          :error="errorsItem.produto_item_id?.message"
          :input-props="{ autoResize: true, disabled: true }"
        />
        <DropdownBase
          v-model="item.unidade_medida"
          label="Unidade de medida"
          helper="Selecione uma unidade medida"
          :error="errorsItem.produto_item_id?.message"
          :invalid="!!errorsItem.produto_item_id?.message"
          :required="true"
          :input-props="{
            optionLabel: 'text',
            optionValue: 'value',
            options: storeOptions.unidades_medidas,
            disabled: true
          }"
        />
        <InputNumberBase
          v-model="item.quantidade"
          label="Quantidade"
          :error="errorsItem.quantidade?.message"
          :invalid="!!errorsItem.quantidade?.message"
          helper="Digite a quantidade"
          :required="true"
          :input-props="{
            allowEmpty: true,
            useGrouping: false
          }"
        />
      </div>
    </div>
    <div class="card-item mt-2 flex gap-3">
      <Button class="w-full" label="Limpar Item" outlined severity="primary" />
      <Button
        class="w-full"
        label="Salvar Item"
        icon="pi pi-check"
        icon-pos="right"
        :loading="loadingCreate"
        @click="onFormSubmit(item)"
      />
    </div>
  </div>
  <div v-else class="card-item">
    <h5 class="font-semibold">Cadastro de produto</h5>
    Para cadastrar itens é necessário salvar o termo. (Salvar não é finalizar)
  </div>
  <Dialog
    v-model:visible="condition"
    modal
    class="dialog-products"
    :header="!active ? 'Selecione os Produtos' : 'Cadastre um produto'"
    :content-style="!active ? { height: '350px' } : { height: '500px' }"
    :draggable="false"
    :closable="true"
    :style="{ width: '40rem' }"
    @hide="clearProductItem"
  >
    <TabView v-model:activeIndex="active" class="tabview-products">
      <TabPanel>
        <SelectProductItem
          :select-product-item="selectProductItem"
          :register-produto="() => (active = 1)"
          :products-items="optionsProductsItems"
        />
      </TabPanel>
      <TabPanel>
        <FormProductItem
          :type-measure="
            storeProcess.edital.regime.nome.includes('Fornecimento')
              ? 'material'
              : 'servico'
          "
          @event-back="changeTabView"
          @event-create="selectProductItem"
          @event-close="condition = false"
        />
      </TabPanel>
    </TabView>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import useProcessStore from '@/store/process'
import useOptionsStore from '@/store/options'
import { useToast } from 'primevue/usetoast'

import InputTextBase from './Forms/components/InputTextBase.vue'
import InputNumberBase from './Forms/components/InputNumberBase.vue'
import TextareaBase from './Forms/components/TextareaBase.vue'
import DropdownBase from './Forms/components/DropdownBase.vue'
import FormProductItem from './Forms/FormProductItem.vue'
import SelectProductItem from './SelectProductItem.vue'

import type { ProductItemProtocol } from '@/@types/products'
import type { BaseItem, ErrorsItem, Group } from '@/@types/term_reference'

import { deepClone, validityForm } from '@/utils/helpers'
import { itemProductSchema } from '@/utils/validations'
import { newItem } from '@/utils/constants'
import services from '@/api'
import * as z from 'zod'

const storeProcess = useProcessStore()
const storeOptions = useOptionsStore()
const active = ref<number>()
const condition = ref<boolean>(false)
const isGroupMode = ref<boolean>(
  ['Menor preço por grupo', 'Menor preço por item e por grupo'].includes(
    storeProcess.edital?.julgamento?.nome ?? ''
  )
)
const item = ref<BaseItem | Group>(
  isGroupMode.value
    ? { grupo: null, ...deepClone(newItem) }
    : deepClone(newItem)
)
const errorsItem = ref<ErrorsItem>({})
const itemIndex = ref<number | null>(null)
const selectedProduct = ref<string | null>(null)
const loadingSearch = ref<boolean>(false)
const optionsProductsItems = ref<ProductItemProtocol[]>([])
const toast = useToast()
const loadingCreate = ref<boolean>()

const optionsModeRegisterItem = ref([
  {
    name: 'Grupo',
    value: true,
    constant: ![
      'Menor preço por grupo',
      'Menor preço por item e por grupo'
    ].includes(storeProcess.edital?.julgamento?.nome ?? '')
  },
  {
    name: 'Item',
    value: false,
    constant: ![
      'Menor preço por item',
      'Menor preço por item e por grupo'
    ].includes(storeProcess.edital?.julgamento?.nome ?? '')
  }
])

const changeModeItem = (isGroup: boolean) => {
  errorsItem.value = {}
  if (isGroup) {
    item.value = {
      grupo: null,
      ...deepClone(newItem)
    }
    return
  }
  item.value = JSON.parse(JSON.stringify(newItem)) as BaseItem
}

const clearProductItem = () => {
  itemIndex.value = null
  selectedProduct.value = null
}

const searchProductsItem = async (query: string) => {
  loadingSearch.value = false
  itemIndex.value = null
  selectedProduct.value = null

  try {
    const response = await services.Products.getProductsItem({
      descricao_simplificada: query
    })
    optionsProductsItems.value = response.data
    condition.value = true
    if (optionsProductsItems.value.length) {
      active.value = 0
    } else {
      active.value = 1
    }
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Erro ao procurar produto'
    })
  } finally {
    loadingSearch.value = false
  }
}

const selectProductItem = (product: ProductItemProtocol) => {
  condition.value = false
  if ('grupo' in item.value) {
    item.value = {
      ...item.value,
      numero: item.value.numero,
      descricao_simplificada: product.descricao_simplificada.toUpperCase(),
      descricao_completa: product.descricao_completa.toUpperCase(),
      unidade_medida: product.unidade_medida_id,
      produto_item_id: product.id,
      quantidade: item.value.quantidade
    }
    return
  }
  item.value = {
    numero: item.value.numero,
    descricao_simplificada: product.descricao_simplificada.toUpperCase(),
    descricao_completa: product.descricao_completa.toUpperCase(),
    unidade_medida: product.unidade_medida_id,
    produto_item_id: product.id,
    quantidade: item.value.quantidade
  }
}

const changeTabView = (index: number) => {
  active.value = index
}

const clearItem = () => {
  if (isGroupMode.value) {
    item.value = {
      ...item.value,
      ...deepClone(newItem)
    }
    return
  }
  item.value = { ...deepClone(newItem) }
}

const onFormSubmit = async (values: BaseItem | Group) => {
  const idTermReference = storeProcess.term_reference?.id

  if (!idTermReference) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao criar item',
      detail: 'É necessário que salve o termo para que possa criar item'
    })
    return
  }

  const schema = itemProductSchema.extend({
    ...(isGroupMode.value && {
      grupo: z.number({ invalid_type_error: 'Digite um número válido' })
    })
  })

  errorsItem.value = validityForm(schema, values)
  if (Object.keys(errorsItem.value).length) return

  loadingCreate.value = true

  const body = {
    numero: String(values.numero),
    grupo: 'grupo' in values ? String(values.grupo) : null,
    quantidade: String(values.quantidade),
    produto_item_id: values.produto_item_id
  }

  try {
    await services.TermReference.createTermReferenceItem(idTermReference, body)
    toast.add({
      severity: 'success',
      summary: 'Item criado com sucesso!',
      detail: 'O item foi cadastrado e poderá ser visto em lista de produtos.'
    })
    clearItem()
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao criar item',
      detail: (err as Error).message
    })
  } finally {
    loadingCreate.value = false
  }
}

onMounted(async () => {
  const regimeName = storeProcess.edital.regime.nome
  await services.Option.getUnitMeasure(
    regimeName.includes('Fornecimento') ? 'material' : 'servico'
  )
})

onUnmounted(() => {
  storeOptions.unidades_medidas = []
})
</script>

<style scoped>
.container-inputs {
  @apply flex flex-col gap-6;
}
.col {
  @apply flex flex-col;
}
.header-group-itens {
  @apply flex justify-between items-center mb-4 px-2;
}
.header-group {
  @apply flex justify-between;
}
.card-item {
  @apply border-[1px] border-solid border-gray-300 p-4 rounded-md;
}
</style>
