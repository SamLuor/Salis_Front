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
            <FileUploadBase
              v-model:file="form.arquivo"
              v-model:file-path="form.caminho_arquivo"
              label="Termo de Referência"
              helper="Envie o arquivo de termo de referência."
              :required="true"
              :invalid="!!errors?.arquivo"
              :error="errors?.arquivo?.message"
              :file-props="{
                mode: 'basic',
                chooseLabel: 'Buscar anexo',
                uploadLabel: 'Upload',
                cancelLabel: 'Cancelar',
                customUpload: true,
                multiple: false
              }"
            />
            <hr class="divider" />
            <!-- Seg. Comercial -->
            <div class="container-inputs-form">
              <h5 class="input-full">Seg. Comercial</h5>
              <MultiSelectBase
                v-model="form.setor_produtos"
                label="Setor do Produto"
                helper="Selecione um ou mais setores dos produtos"
                :error="errors?.setor_produtos?.message"
                :invalid="!!errors?.setor_produtos"
                :required="true"
                :input-props="{
                  options: storeOptions.setores_produtos,
                  optionLabel: 'text',
                  optionValue: 'value'
                }"
              />
              <MultiSelectBase
                v-model="form.subseguinte_comerciais"
                label="Subseguinte Comercial"
                helper="Selecione um ou mais subseguinte comerciais"
                :required="true"
                :error="errors?.subseguinte_comerciais?.message"
                :invalid="!!errors?.subseguinte_comerciais"
                :input-props="{
                  options: storeOptions.subseguintes_comerciais,
                  optionLabel: 'text',
                  optionValue: 'value'
                }"
              />
            </div>
            <hr class="divider" />
            <!-- Prazos -->
            <div class="container-inputs-form">
              <h5 class="input-full">Prazos</h5>
              <CalendarBase
                v-model="form.validade_proposta"
                label="Validade da Proposta"
                helper="Selecione a data da validade proposta."
                :required="true"
                :invalid="!!errors.validade_proposta"
                :error="errors.validade_proposta?.message"
                :input-props="{ dateFormat: 'dd/mm/yy', showIcon: true }"
              />
              <CalendarBase
                v-model="form.prazo_entrega"
                label="Prazo de Entrega"
                helper="Selecione a data do prazo."
                :required="true"
                :invalid="!!errors.prazo_entrega"
                :error="errors.prazo_entrega?.message"
                :input-props="{ dateFormat: 'dd/mm/yy', showIcon: true }"
              />
              <CalendarBase
                v-model="form.prazo_garantia_produto"
                label="Prazo de Garantia do Produto"
                helper="Selecione a data do prazo de garantia."
                :required="true"
                :invalid="!!errors.prazo_garantia_produto"
                :error="errors.prazo_garantia_produto?.message"
                :input-props="{ dateFormat: 'dd/mm/yy', showIcon: true }"
              />
              <InputNumberBase
                v-if="showRPA"
                v-model="form.validade_assinatura_arp"
                label="Validade da assinatura ARP (Meses)"
                helper="Digite a quantidade de meses validos."
                :required="true"
                :invalid="!!errors.validade_arp"
                :error="errors.validade_arp?.message"
                :input-props="{ useGrouping: false, suffix: ' - Meses' }"
              />
              <InputNumberBase
                v-if="showRPA"
                v-model="form.validade_publicacao_arp"
                label="Validade da publicação ARP (Meses)"
                helper="Digite a quantidade de meses da validos."
                class-base="input-full"
                :required="true"
                :invalid="!!errors.validade_arp"
                :error="errors.validade_arp?.message"
                :input-props="{ useGrouping: false, suffix: ' - Meses' }"
              />
            </div>
            <div class="input-full flex flex-row-reverse gap-2 mt-4">
              <Button
                :label="!storeProcess.term_reference.id ? 'Salvar' : 'Salvar'"
                @click="requireConfirmation($event)"
              />
              <Button
                severity="secondary"
                label="Próximo"
                outlined
                text
                :disabled="storeStepProcess.accessGranted! <= 2"
                @click="() => (storeStepProcess.currentAccess = 3)"
              />
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
            <hr class="divider" />
            <!-- Lista de Produtos -->
            <div>
              <!-- Itens/Grupos ADD -->
              <RegisterItem />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import useProcessStore from '@/store/process'
import { useStepProcessStore } from '@/store/steps_process'
import useOptionsStore from '@/store/options'

import services from '@/api'

import { validityForm } from '@/utils/helpers'
import { schemaTermReference } from '@/utils/validations'
import { Termo_Referencia, Termo_Referencia_Form } from '@/@types/process'

import RegisterItem from '@/components/RegisterItem.vue'
import MultiSelectBase from '@/components/Forms/components/MultiSelectBase.vue'
import CalendarBase from '@/components/Forms/components/CalendarBase.vue'
import InputNumberBase from '@/components/Forms/components/InputNumberBase.vue'
import FileUploadBase from '@/components/Forms/components/FileUploadBase.vue'

const storeProcess = useProcessStore()
const storeOptions = useOptionsStore()
const storeStepProcess = useStepProcessStore()

const toast = useToast()
const confirm = useConfirm()

const loading = ref<boolean>(false)
const errors = ref<{ [key: string]: any }>({})
const form = ref<Termo_Referencia_Form>({
  arquivo: null,
  caminho_arquivo: '',
  setor_produtos: [] as string[],
  subseguinte_comerciais: [] as string[],
  validade_proposta: null,
  prazo_entrega: null,
  prazo_garantia_produto: null,
  validade_assinatura_arp: null,
  validade_publicacao_arp: null
})

const optionsSetorProdutos = ref([])
const optionsSubseguinteComercial = ref([])

const showRPA = computed(() => {
  return ['Pregão SRP', 'Concorrência SRP'].includes(
    storeProcess?.edital?.modalidade.nome
  )
})

const requireConfirmation = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    position: 'top',
    group: 'headless',
    message: 'Deseja salvar termo de referência?',
    accept: () => {
      onFormSubmit()
    },
    reject: () => {
      onFormSubmit()
    }
  })
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
    ...form.value
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
    formData.append('arquivo', data.arquivo)
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
    populateFields(storeProcess.term_reference)
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

const populateFields = (data: Termo_Referencia) => {
  form.value = {
    id: data.id,
    caminho_arquivo: data.caminho_arquivo,
    setor_produtos: data.setor_produtos.map((setor) => setor.id),
    prazo_entrega: new Date(data.prazo_entrega),
    prazo_garantia_produto: new Date(data.prazo_garantia_produto),
    subseguinte_comerciais: data.subseguinte_comerciais.map(
      (subseguinte) => subseguinte.id
    ),
    ...(data.validade_assinatura_arp && {
      validade_assinatura_arp: +data.validade_assinatura_arp
    }),
    ...(data.validade_publicacao_arp && {
      validade_publicacao_arp: +data.validade_publicacao_arp
    }),
    validade_proposta: new Date(data.validade_proposta),
    arquivo: null
  }
}

onMounted(() => {
  if (storeProcess.term_reference?.id)
    populateFields(storeProcess.term_reference)
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
</style>
