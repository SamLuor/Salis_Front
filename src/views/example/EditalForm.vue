<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <div class="px-4 container-area-form">
          <div class="section-form">
            <div class="content">
              <h4 class="header">Informações da Licitação</h4>
              <p class="description">
                Estas informações são para cadastra dados do edital, todos os
                dados dos editais cadastrados serão visíveis a partir de
                permissões liberadas para os usuários.
              </p>
            </div>
          </div>
          <form>
            <!-- Dados Iniciais -->
            <div class="container-inputs-form">
              <h5>Dados iniciais</h5>
              <div class="p-field input-full">
                <label for="licitationType">Modalidade de Licitação</label>
                <Dropdown
                  id="licitationType"
                  v-model="form.licitationType"
                  :options="options.processModality"
                  option-label="text"
                  option-value="value"
                  placeholder="Selecione uma modalidade"
                  class="w-full"
                  @change="onLicitationTypeChange"
                />
                <small class="p-error">{{
                  errors.modalidade_id?.message
                }}</small>
              </div>
              <div v-if="showContractRegime" class="p-field">
                <label for="contractRegime">Regime da Contratação</label>
                <Dropdown
                  id="contractRegime"
                  v-model="form.contractRegime"
                  :options="options.contractRegimes"
                  option-label="text"
                  option-value="value"
                  placeholder="Selecione um regime"
                  class="w-full"
                />
                <small class="p-error">{{ errors.regime_id?.message }}</small>
              </div>
              <div v-if="showExecutionType" class="p-field">
                <label for="executionType">Tipo de Execução</label>
                <Dropdown
                  id="executionType"
                  v-model="form.executionType"
                  :options="options.executionTypes"
                  option-label="text"
                  option-value="value"
                  placeholder="Selecione um tipo de execução"
                  class="w-full"
                />
                <small class="p-error">{{
                  errors.tipo_execucao_id?.message
                }}</small>
              </div>
              <div v-if="showDisputeMode" class="p-field">
                <label for="disputeMode">Modo de Disputa</label>
                <Dropdown
                  id="disputeMode"
                  v-model="form.disputeMode"
                  :options="options.disputeModes"
                  option-label="text"
                  option-value="value"
                  placeholder="Selecione um modo de disputa"
                  class="w-full"
                />
                <small class="p-error">{{
                  errors.modo_disputa_id?.message
                }}</small>
              </div>
              <div v-if="showJudgmentCriteria" class="p-field">
                <label for="judgmentCriteria">Critério de Julgamento</label>
                <Dropdown
                  id="judgmentCriteria"
                  v-model="form.judgmentCriteria"
                  :options="options.judgmentCriteria"
                  option-label="text"
                  option-value="value"
                  placeholder="Selecione um critério de julgamento"
                  class="w-full"
                />
                <small class="p-error">{{
                  errors.julgamento_id?.message
                }}</small>
              </div>
            </div>
            <!-- Dados Edital -->
            <div class="container-inputs-form">
              <h5>Dados do Edital</h5>
              <InputMaskBase
                v-model="form.editalNumber"
                label="N° Edital"
                helper="Insira o número do edital"
                class-base="input-full"
                :error="errors.numero?.message"
                :invalid="!!errors.numero"
                :input-props="{ mask: '999/9999', placeholder: 'xxx/xxxx' }"
              />
              <DropdownBase
                v-model="form.isPeriodic"
                label="Edital é periódico? (anualmente)"
                helper="Selecione a opção correspondente."
                :error="errors.periodico?.message"
                :invalid="!!errors.periodico"
                :input-props="{
                  options: options.periodicOptions,
                  optionLabel: 'text',
                  optionValue: 'value'
                }"
              />
              <DropdownBase
                v-model="form.purchasingPortal"
                label="Portal de Compras"
                helper="Selecione um portal de compras."
                :error="errors.portal_compra_id?.message"
                :invalid="!!errors.portal_compra_id"
                :input-props="{
                  options: options.purchasingPortals,
                  optionLabel: 'text',
                  optionValue: 'value'
                }"
              />
              <InputNumberBase
                v-model="form.licitationNumber"
                label="Nº da Licitação no Portal de Compras"
                helper="Insira o número da licitação."
                class-base="input-full"
                :invalid="!!errors.numero_portal_compra"
                :error="errors.numero_portal_compra?.message"
                :input-props="{ useGrouping: false }"
              />
              <DropdownBase
                v-model="form.client_gestor.value"
                label="Órgão Gestor"
                helper="Selecione um órgão gestor."
                :error="errors?.cliente_gestor_id?.message"
                :invalid="!!errors?.cliente_gestor_id?.message"
                :input-props="{
                  options: options.clients,
                  optionLabel: 'text',
                  optionValue: 'value'
                }"
                :events="{
                  change() {
                    onChangeGestor()
                  }
                }"
              />
              <InputTextBase
                v-model="form.client_gestor.sigla"
                label="Sigla Órgão Contratante"
                helper="Sigla será preenchida automaticamente."
                :error="''"
                :invalid="false"
                :input-props="{ readonly: true }"
              />
              <InputTextBase
                v-if="comprasnet"
                v-model="form.client_gestor.uasg"
                label="UASG"
                helper="UASG será preenchida automaticamente."
                class-base="input-full"
                :error="''"
                :invalid="false"
                :input-props="{ readonly: true }"
              />
              <template
                v-for="(authority, index) in form.contractingAuthorities"
                :key="index"
              >
                <h5 class="input-full">
                  Dados Contratante/Participante
                  <span :hidden="!multipleContractings">{{ index + 1 }}</span>
                </h5>
                <DropdownBase
                  v-model="authority.value"
                  label="Órgão Contratante/Participante"
                  helper="Selecione um órgão"
                  :error="
                    Array.isArray(errors?.clientes)
                      ? errors?.clientes[index]?.message
                      : ''
                  "
                  :invalid="
                    !!(
                      Array.isArray(errors?.clientes) &&
                      errors?.clientes[index]?.message
                    )
                  "
                  :input-props="{
                    options: options.clients,
                    optionLabel: 'text',
                    optionValue: 'value'
                  }"
                  :events="{
                    change() {
                      onContractingAuthorityChange(index)
                    }
                  }"
                />
                <InputTextBase
                  v-model="authority.sigla"
                  label="Sigla Órgão Contratante"
                  helper="Sigla será preenchida automaticamente."
                  :error="''"
                  :invalid="false"
                  :input-props="{ readonly: true }"
                />
                <!-- Campo UASG -->
                <div v-if="comprasnet" class="p-field input-full">
                  <label :for="`uasg-${index}`">UASG</label>
                  <InputText
                    :id="`uasg-${index}`"
                    v-model="authority.uasg"
                    placeholder="UASG será preenchida automaticamente"
                    class="w-full"
                    readonly
                  />
                </div>
              </template>
              <Button
                v-if="multipleContractings"
                class="input-full"
                label="Adicionar mais contratantes"
                icon="fa-solid fa-plus"
                @click="addContractingAuthority"
              />
              <InputNumberBase
                v-model="form.administrativeProcessNumber"
                label="Nº Processo Administrativo"
                helper="Insira o número do processo administrativo."
                :invalid="!!errors.numero_p_a"
                :error="errors.numero_p_a?.message"
                :input-props="{ useGrouping: false }"
              />
              <InputTextBase
                v-model="form.pregoeiro"
                label="Pregoeiro (A)"
                helper="Digite o(a) pregoeiro."
                :invalid="!!errors.pregoeiro"
                :error="errors.pregoeiro?.message"
              />
              <TextareaBase
                v-model="form.completeObjectDescription"
                label="Descrição Completa do Objeto"
                helper="Insira a descrição completa do objeto."
                class-base="input-full"
                class-input="w-full"
                :invalid="!!errors.descricao_completa_objeto"
                :error="errors.descricao_completa_objeto?.message"
                :input-props="{ autoResize: true }"
              />
              <InputTextBase
                v-model="form.simplifiedObjectDescription"
                label="Descrição Simplificada do Objeto"
                helper="Insira a descrição simplificada do objeto."
                class-base="input-full"
                :invalid="!!errors.descricao_simplificada_objeto"
                :error="errors.descricao_simplificada_objeto?.message"
              />
            </div>
            <div class="container-inputs-form">
              <h5 class="input-full">DESCRIÇÃO SIMPLIFICADA DO OBJETO</h5>
              <FileUploadBase
                v-model:file="form.archive"
                v-model:file-path="form.file_path"
                label="Edital Completo (Edital)"
                :error="errors.arquivo?.message"
                :invalid="!!errors.arquivo?.message"
                :file-props="{
                  mode: 'basic',
                  multiple: false,
                  customUpload: true,
                  chooseLabel: 'Buscar Anexo',
                  cancelLabel: 'Cancelar'
                }"
              />
              <div class="p-field input-full">
                <label for="otherAttachments">Outros Anexos</label>
                <FileUpload
                  name="demo[]"
                  :multiple="true"
                  :max-file-size="1000000"
                  class="w-full"
                  custom-upload
                  :choose-label="'Buscar anexo'"
                  :upload-label="'Upload'"
                  :cancel-label="'Cancelar'"
                  @select="selectFile"
                  @remove="removeFile"
                  @clear="clearFiles"
                >
                  <template #header="{ chooseCallback, clearCallback, files }">
                    <div
                      class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2"
                    >
                      <div class="flex gap-2">
                        <Button
                          class="btn-select-files"
                          icon="pi pi-file"
                          rounded
                          outlined
                          @click="chooseCallback()"
                        ></Button>
                        <Button
                          class="btn-clear-files"
                          icon="pi pi-times"
                          rounded
                          outlined
                          severity="danger"
                          :disabled="!files || files.length === 0"
                          @click="clearCallback()"
                        ></Button>
                      </div>
                    </div>
                  </template>
                  <template #content="{ files, removeFileCallback }">
                    <div v-if="files.length > 0">
                      <h5>A enviar</h5>
                      <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                        <div
                          v-for="(file, index) of files"
                          :key="file.name + file.type + file.size"
                          class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
                        >
                          <div>
                            <img
                              role="presentation"
                              :alt="file.name"
                              :src="file.objectURL"
                              width="100"
                              height="50"
                            />
                          </div>
                          <span
                            style="
                              display: flex;
                              flex-direction: column;
                              align-items: center;
                              gap: 0.5rem;
                            "
                          >
                            <label>Nome do arquivo</label>
                            <InputText
                              v-if="form.otherAttachments.add[index]"
                              v-model="form.otherAttachments.add[index].name"
                              placeholder="Dê um nome para o arquivo."
                            />
                          </span>
                          <Badge value="Pendente" severity="warning" />
                          <Button
                            icon="pi pi-times"
                            outlined
                            rounded
                            severity="danger"
                            @click="removeFileCallback(index)"
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #empty>
                    <p>Arraste e solte arquivos aqui.</p>
                  </template>
                </FileUpload>
                <span
                  v-for="(archive, index) in form.otherAttachments.current"
                  :key="archive.id"
                  class="component-download-archive"
                >
                  <a :href="archive.caminho" target="_blank"
                    >{{ archive.nome }}
                  </a>
                  <i
                    class="fa-solid fa-xmark"
                    @click="deleteFiles(archive.caminho, index)"
                  />
                </span>
                <small class="p-error">{{
                  errors.anexos?.add?.map((error) => error.message + ' ')
                }}</small>
              </div>
            </div>
            <!-- Datas -->
            <div class="container-inputs-form">
              <h5 class="input-full">Datas</h5>
              <CalendarBase
                id="startProposalReception"
                v-model="form.startProposalReception"
                label="Inicio Acolhimento da Proposta"
                helper="Insira a data e hora de início do acolhimento da proposta."
                :invalid="!!errors.inicio_acolhimento_proposta"
                :error="errors.inicio_acolhimento_proposta?.message"
                :input-props="{
                  showIcon: true,
                  dateFormat: 'dd/mm/yy',
                  showTime: true
                }"
              />
              <CalendarBase
                id="limitProposalReception"
                v-model="form.limitProposalReception"
                label="Limite Acolhimento da Proposta"
                helper="Insira a data e hora do limite do acolhimento da proposta."
                :invalid="!!errors.limite_acolhimento_proposta"
                :error="errors.limite_acolhimento_proposta?.message"
                :input-props="{
                  showIcon: true,
                  dateFormat: 'dd/mm/yy',
                  showTime: true
                }"
              />
              <CalendarBase
                v-model="form.openingProposal"
                label="Abertura da Proposta"
                helper="Insira a data e hora da abertura da proposta."
                :invalid="!!errors.abertura_proposta"
                :error="errors.abertura_proposta?.message"
                :input-props="{
                  showIcon: true,
                  dateFormat: 'dd/mm/yy',
                  showTime: true
                }"
              />
              <CalendarBase
                v-model="form.disputeDateTime"
                label="Data e Hora da Disputa"
                helper="Insira a data e hora da disputa."
                :invalid="!!errors.data_disputa"
                :error="errors.data_disputa?.message"
                :input-props="{
                  showIcon: true,
                  dateFormat: 'dd/mm/yy',
                  showTime: true
                }"
              />
            </div>

            <div class="input-full flex flex-row-reverse">
              <Button
                :label="edital_id ? 'Atualizar' : 'Criar'"
                @click="onFormSubmit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { schemaCreateEdital } from '@/utils/validations'
import {
  buildAccessArchives,
  extractNameArchive,
  destroyDomainInPath
} from '@/utils/helpers'
import { ref, computed, onMounted, reactive } from 'vue'
import * as zod from 'zod'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import { EditalProtocol, ErrorsEditalInterface } from '@/@types/edital'
import {
  FileUploadRemoveEvent,
  FileUploadSelectEvent
} from 'primevue/fileupload'
import z from 'zod'
import useProcessStore from '@/store/process'
import CalendarBase from '@/components/Forms/components/CalendarBase.vue'
import InputMaskBase from '@/components/Forms/components/InputMaskBase.vue'
import DropdownBase from '@/components/Forms/components/DropdownBase.vue'
import InputNumberBase from '@/components/Forms/components/InputNumberBase.vue'
import TextareaBase from '@/components/Forms/components/TextareaBase.vue'
import FileUploadBase from '@/components/Forms/components/FileUploadBase.vue'
import InputTextBase from '@/components/Forms/components/InputTextBase.vue'

const toast = useToast()
const storeProcess = useProcessStore()
const edital_id = storeProcess.edital?.id

const errors = ref<ErrorsEditalInterface>({} as ErrorsEditalInterface)

const form = ref<EditalProtocol>({
  licitationType: '',
  contractRegime: '',
  executionType: '',
  disputeMode: '',
  judgmentCriteria: '',
  editalNumber: '',
  isPeriodic: '',
  purchasingPortal: '',
  licitationNumber: null,
  contractingAuthorities: [
    {
      value: '',
      sigla: '',
      uasg: ''
    }
  ],
  administrativeProcessNumber: null,
  pregoeiro: '',
  completeObjectDescription: '',
  simplifiedObjectDescription: '',
  startProposalReception: null,
  limitProposalReception: null,
  openingProposal: null,
  disputeDateTime: null,
  fullEdition: null,
  archive: [],
  otherAttachments: {
    current: [],
    add: [],
    remove: []
  },
  client_gestor: {
    value: '',
    sigla: '',
    uasg: ''
  },
  file_path: null
})

const formState = ref({
  modalidade_id: '',
  regime_id: '',
  tipo_execucao_id: '',
  modo_disputa_id: '',
  julgamento_id: '',
  numero: '',
  periodico: '',
  portal_compra_id: '',
  numero_portal_compra: '',
  numero_p_a: '',
  pregoeiro: '',
  descricao_completa_objeto: '',
  descricao_simplificada_objeto: '',
  inicio_acolhimento_proposta: '',
  limite_acolhimento_proposta: '',
  abertura_proposta: '',
  data_disputa: '',
  clientes: [],
  arquivo: [],
  anexos: {
    add: [],
    remove: []
  }
})

// Handlers
const onFormSubmit = async () => {
  const dataFormatted = copyFormDataToFormState(form.value)

  const schema = schemaCreateEdital.extend({
    ...(showContractRegime.value && {
      regime_id: z
        .string({ required_error: '' })
        .min(1, 'Regime ID é obrigatório')
    }),
    ...(showExecutionType.value && {
      tipo_execucao_id: z
        .string({ required_error: '' })
        .min(1, 'Tipo de Execução ID é obrigatório')
    }),
    ...(showDisputeMode.value && {
      modo_disputa_id: z
        .string({ required_error: '' })
        .min(1, 'Modo de Disputa ID é obrigatório')
    }),
    ...(showJudgmentCriteria.value && {
      julgamento_id: z
        .string({ required_error: '' })
        .min(1, 'Julgamento ID é obrigatório')
    }),
    ...(!form.value.file_path && {
      arquivo: z
        .any()
        .refine((val) => val?.name, { message: 'Anexo é obrigatório' })
    })
  })

  errors.value = {} as ErrorsEditalInterface
  try {
    schema.parse(dataFormatted)
  } catch (err) {
    if (err instanceof zod.ZodError) {
      errors.value = err.issues.reduce((acc: any, current) => {
        const [path, index] = current.path
        if (!isNaN(+index)) {
          acc[String(path)] = acc[String(path)] ?? []
          acc[String(path)][index] = current
        } else acc[String(path)] = current
        return acc
      }, {})
    }
    return
  }
  const formData = onFormData(form.value)

  try {
    await services.Edital.create(formData, storeProcess.process.id)
    if (!form.value?.id) {
      storeProcess.status = 2
    }

    toast.add({
      severity: 'success',
      summary: !edital_id
        ? 'Edital criado com sucesso!'
        : 'Edital atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: !edital_id ? 'Erro ao criar Edital' : 'Erro ao atualizar Edital',
      detail: (err as Error).message,
      life: 3000
    })
  }
}

const onFormData = (form: EditalProtocol) => {
  const formData = new FormData()
  if (form?.id) {
    formData.append('id', form.id)
  }
  formData.append('modalidade_id', form.licitationType)
  if (showContractRegime.value) {
    formData.append('regime_id', form.contractRegime)
  }
  if (showExecutionType.value) {
    formData.append('tipo_execucao_id', form.executionType)
  }
  if (showDisputeMode.value) {
    formData.append('modo_disputa_id', form.disputeMode)
  }
  if (showJudgmentCriteria.value) {
    formData.append('julgamento_id', form.judgmentCriteria)
  }
  formData.append('numero', String(form.editalNumber))
  formData.append('periodico', String(form.isPeriodic))
  formData.append('portal_compra_id', form.purchasingPortal)
  formData.append('numero_portal_compra', String(form.licitationNumber))
  formData.append('numero_p_a', String(form.administrativeProcessNumber))
  formData.append('pregoeiro', form.pregoeiro)
  formData.append('cliente_gestor_id', form.client_gestor.value)
  formData.append('descricao_completa_objeto', form.completeObjectDescription)
  formData.append(
    'descricao_simplificada_objeto',
    form.simplifiedObjectDescription
  )
  formData.append(
    'inicio_acolhimento_proposta',
    form.startProposalReception ? form.startProposalReception.toISOString() : ''
  )
  formData.append(
    'limite_acolhimento_proposta',
    form.limitProposalReception ? form.limitProposalReception.toISOString() : ''
  )
  formData.append(
    'abertura_proposta',
    form.openingProposal ? form.openingProposal.toISOString() : ''
  )
  formData.append(
    'data_disputa',
    form.disputeDateTime ? form.disputeDateTime.toISOString() : ''
  )

  if (typeof form.file_path == 'string') {
    formData.append('caminho_arquivo', form.file_path)
  } else {
    formData.append('arquivo', form.archive)
  }

  for (let index = 0; index < form.contractingAuthorities.length; index++) {
    const client = form.contractingAuthorities[index]
    if (multipleContractings.value) {
      formData.append(`clientes[${index}]`, client.value)
    } else {
      formData.append(`clientes[${index}]`, client.value)
      break
    }
  }
  form.otherAttachments.add.forEach((attachment, index) => {
    formData.append(`anexos[add][${index}][nome]`, attachment.name)
    formData.append(`anexos[add][${index}][file]`, attachment.file)
  })
  form.otherAttachments.remove.forEach((attachment, index) => {
    formData.append(`anexos[remove][${index}]`, attachment)
  })
  return formData
}

function copyFormDataToFormState(form: EditalProtocol) {
  const data: any = {
    anexos: {}
  }
  if (form?.id) data.id = form?.id
  data.modalidade_id = form.licitationType
  data.regime_id = form.contractRegime
  data.tipo_execucao_id = form.executionType
  data.modo_disputa_id = form.disputeMode
  data.julgamento_id = form.judgmentCriteria
  data.numero = form.editalNumber
  data.periodico = form.isPeriodic
  data.portal_compra_id = form.purchasingPortal
  data.numero_portal_compra = form.licitationNumber
  data.numero_p_a = form.administrativeProcessNumber
  data.pregoeiro = form.pregoeiro
  data.descricao_completa_objeto = form.completeObjectDescription
  data.descricao_simplificada_objeto = form.simplifiedObjectDescription
  data.inicio_acolhimento_proposta = form.startProposalReception
  data.limite_acolhimento_proposta = form.limitProposalReception
  data.abertura_proposta = form.openingProposal
  data.data_disputa = form.disputeDateTime
  data.cliente_gestor_id = form.client_gestor.value
  data.clientes = form.contractingAuthorities.map((client) => client.value)
  data.arquivo = typeof form.archive == 'string' ? [form.archive] : form.archive
  data.anexos.add = form.otherAttachments.add
  data.anexos.remove = form.otherAttachments.remove
  return data
}

// Filters Process Options
const showContractRegime = computed(() => {
  const modality = options.processModality.find(
    (element) => form.value.licitationType === element.value
  )
  return modality?.text !== 'Leilão' && form.value.licitationType
})
const showExecutionType = computed(() => {
  const executionSelected = options.contractRegimes.find(
    (element) => element.value === form.value.contractRegime
  )

  return ['Execução de obras', 'Serviços de engenharia'].includes(
    String(executionSelected?.text)
  )
})
const showDisputeMode = computed(() => {
  const modality = options.processModality.find(
    (element) => form.value.licitationType === element.value
  )
  return ['Pregão', 'Pregão SRP', 'Concorrência', 'Concorrência SRP'].includes(
    String(modality?.text)
  )
})
const showJudgmentCriteria = computed(() => {
  const modality = options.processModality.find(
    (element) => form.value.licitationType === element.value
  )

  return ['Pregão', 'Pregão SRP', 'Concorrência', 'Concorrência SRP'].includes(
    String(modality?.text)
  )
})
const comprasnet = computed(() => {
  const purchasingType = options.purchasingPortals.find(
    (element) => form.value.purchasingPortal === element.value
  )
  return ['Comprasnet'].includes(String(purchasingType?.text))
})
const multipleContractings = computed(() => {
  const modality = options.processModality.find(
    (element) => form.value.licitationType === element.value
  )
  return ['Pregão SRP', 'Concorrência'].includes(String(modality?.text))
})

//interfaces
type OptionType = {
  value: string
  text: string
}

interface OptionsObject {
  [key: string]: OptionType[]
}

// Options
const options = reactive<OptionsObject>({
  processModality: [] as OptionType[],
  contractRegimes: [] as OptionType[],
  executionTypes: [] as OptionType[],
  disputeModes: [] as OptionType[],
  judgmentCriteria: [] as OptionType[],
  periodicOptions: [
    { text: 'Sim', value: '1' },
    { text: 'Não', value: '0' }
  ],
  purchasingPortals: [] as OptionType[],
  contractingAuthorities: [] as OptionType[],
  clients: [] as OptionType[]
})
// end options

const onContractingAuthorityChange = (index: number) => {
  const selectedAuthority = options.clients.find(
    (client) => client.value === form.value.contractingAuthorities[index].value
  )

  if (selectedAuthority) {
    form.value.contractingAuthorities[index].sigla =
      selectedAuthority.text.split('- ')[1]
    if (comprasnet.value) {
      form.value.contractingAuthorities[index].uasg = 'Aleatório'
    }
  }
}

const onChangeGestor = () => {
  const selectedGestor = options.clients.find(
    (client) => client.value === form.value.client_gestor.value
  )

  if (selectedGestor) {
    form.value.client_gestor.sigla = selectedGestor.text.split('- ')[1]
    if (comprasnet.value) {
      form.value.client_gestor.uasg = 'Aleatório'
    }
  }
}

const addContractingAuthority = () => {
  form.value.contractingAuthorities.push({
    value: '',
    sigla: '',
    uasg: ''
  })
}

const onLicitationTypeChange = () => {
  // Limpar os contratantes quando a modalidade de licitação mudar
  if (!multipleContractings.value) {
    form.value.contractingAuthorities = [
      {
        value: '',
        sigla: '',
        uasg: ''
      }
    ]
  }
}

//File upload handlers
const selectFile = (event: FileUploadSelectEvent) => {
  const files = event.files
    .filter((file: any) => {
      const valid = form.value.otherAttachments.add.every(
        (fileIN) => fileIN.id !== file.objectURL
      )
      return valid
    })
    .map((file: any) => ({
      name: file.name || '',
      file: file,
      id: file.objectURL
    }))

  form.value.otherAttachments.add = [
    ...form.value.otherAttachments.add,
    ...files
  ]
}

const clearFiles = () => {
  form.value.otherAttachments.add = []
}

const removeFile = (event: any) => {
  const files = form.value.otherAttachments.add.filter(
    (file) => file.id !== event.file.objectURL
  )

  form.value.otherAttachments.add = files
}

const selectArchive = (event: any) => {
  form.value.archive = event.files
}

const removeArchive = () => {
  if (typeof form.value.archive === 'string') {
    form.value.otherAttachments.remove.push(form.value.archive)
  }
  form.value.archive = []
}

const deleteFiles = (path: string, index: number) => {
  const pathWithoutDomain = destroyDomainInPath(path)
  form.value.otherAttachments.remove.push(pathWithoutDomain)
  form.value.otherAttachments.current.splice(index, 1)
}

const handlePopulateOptions = async () => {
  await Promise.allSettled([
    services.Option.getContestModes(),
    services.Option.getProcessModality(),
    services.Option.getHiringRegime(),
    services.Option.getExecutionTypes(),
    services.Option.getContestModes(),
    services.Option.getJudgingCriteria(),
    services.Option.getPurchasingPortal(),
    services.Option.getClients()
  ]).then((results) => {
    results.forEach((option) => {
      if (option.status == 'fulfilled') {
        const key: string = option.value.option
        options[key] = option.value.data
      } else {
        toast.add({
          severity: 'error',
          summary: 'Error ao carregar opções',
          detail: option.reason,
          life: 3000
        })
      }
    })
  })
}

const populateFields = (data: any) => {
  console.log(data)
  if (data?.id) form.value.id = data.id
  form.value.licitationType = data.modalidade_id
  form.value.contractRegime = data.regime_id
  form.value.executionType = data.tipo_execucao_id
  form.value.disputeMode = data.modo_disputa_id
  form.value.judgmentCriteria = data.julgamento_id
  form.value.file_path = data.caminho_arquivo
  form.value.editalNumber = data.numero
  form.value.isPeriodic = +data.periodico ? '1' : '0'
  form.value.purchasingPortal = data.portal_compra_id
  form.value.licitationNumber = +data.numero_portal_compra
  form.value.administrativeProcessNumber = +data.numero_p_a
  form.value.pregoeiro = data.pregoeiro
  form.value.client_gestor.value = data?.gestor
  form.value.completeObjectDescription = data.descricao_completa_objeto
  form.value.simplifiedObjectDescription = data.descricao_simplificada_objeto
  form.value.startProposalReception = new Date(data.inicio_acolhimento_proposta)
  form.value.limitProposalReception = new Date(data.limite_acolhimento_proposta)
  form.value.openingProposal = new Date(data.abertura_proposta)
  form.value.disputeDateTime = new Date(data.data_disputa)
  form.value.contractingAuthorities = data.clientes.map((client: any) => ({
    ...client,
    value: client.id
  }))
  form.value.archive = null
  form.value.otherAttachments.current = data.anexos.map((file: any) => ({
    ...file,
    caminho: buildAccessArchives(services.httpConfig.getUri(), file.caminho)
  }))
  return data
}

onMounted(async () => {
  await handlePopulateOptions()
  if (storeProcess.edital?.id) populateFields(storeProcess.edital)
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
.btn-select-files {
  @apply text-primary-800 hover:bg-gray-200 !important;
}
.btn-clear-files {
  @apply hover:bg-red-200 !important;
}
.p-badge.p-component.p-badge-warning.p-fileupload-file-badge {
  @apply hidden;
}
.p-button.p-button-text.p-fileupload-file-remove {
  @apply hover:bg-gray-200 !important;
}
</style>

<style scoped lang="scss">
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
  @apply grid grid-cols-2 gap-4 gap-y-6 pb-4;

  h5 {
    @apply text-light-black70 dark:text-dark-white70 text-lg mb-1 font-semibold;
  }

  label {
    @apply text-light-black70 dark:text-dark-white70;
  }
  small {
    @apply text-light-gray dark:text-dark-gray;
  }
}

.component-download-archive {
  @apply w-full flex justify-between items-center px-2 h-8 pt-2;

  a {
    @apply hover:underline;
  }

  i {
    @apply hover:text-lg cursor-pointer transition-all duration-200 hover:text-danger-light;
  }
}

.card {
  @apply rounded-none;

  .header-page {
    @apply flex justify-between items-center dark:text-dark-white70;
  }
}
</style>
