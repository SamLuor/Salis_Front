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
                  :options="licitationTypes"
                  option-label="name"
                  option-value="value"
                  placeholder="Selecione uma modalidade"
                  class="w-full"
                  @change="onLicitationTypeChange"
                />
                <small class="p-error">{{ errors.licitationType }}</small>
              </div>
              <div v-if="showContractRegime" class="p-field">
                <label for="contractRegime">Regime da Contratação</label>
                <Dropdown
                  id="contractRegime"
                  v-model="form.contractRegime"
                  :options="contractRegimes"
                  option-label="name"
                  option-value="value"
                  placeholder="Selecione um regime"
                  class="w-full"
                />
                <small class="p-error">{{ errors.contractRegime }}</small>
              </div>
              <div v-if="showExecutionType" class="p-field">
                <label for="executionType">Tipo de Execução</label>
                <Dropdown
                  id="executionType"
                  v-model="form.executionType"
                  :options="executionTypes"
                  option-label="name"
                  option-value="value"
                  placeholder="Selecione um tipo de execução"
                  class="w-full"
                />
                <small class="p-error">{{ errors.executionType }}</small>
              </div>
              <div v-if="showDisputeMode" class="p-field">
                <label for="disputeMode">Modo de Disputa</label>
                <Dropdown
                  id="disputeMode"
                  v-model="form.disputeMode"
                  :options="disputeModes"
                  option-label="name"
                  option-value="value"
                  placeholder="Selecione um modo de disputa"
                  class="w-full"
                />
                <small class="p-error">{{ errors.disputeMode }}</small>
              </div>
              <div v-if="showJudgmentCriteria" class="p-field">
                <label for="judgmentCriteria">Critério de Julgamento</label>
                <Dropdown
                  id="judgmentCriteria"
                  v-model="form.judgmentCriteria"
                  :options="judgmentCriteria"
                  option-label="name"
                  option-value="value"
                  placeholder="Selecione um critério de julgamento"
                  class="w-full"
                />
                <small class="p-error">{{ errors.judgmentCriteria }}</small>
              </div>
            </div>
            <!-- Dados Edital -->
            <div class="container-inputs-form">
              <h5>Dados do Edital</h5>
              <div class="p-field input-full">
                <label for="editalNumber">Nº Edital</label>
                <InputText
                  id="editalNumber"
                  v-model="form.editalNumber"
                  placeholder="Insira o número do edital"
                  class="w-full"
                />
                <small class="p-error">{{ errors.editalNumber }}</small>
              </div>
              <div class="p-field">
                <label for="isPeriodic">Edital é periódico? (anualmente)</label>
                <Dropdown
                  id="isPeriodic"
                  v-model="form.isPeriodic"
                  :options="periodicOptions"
                  option-label="name"
                  option-value="value"
                  placeholder="Selecione"
                  class="w-full"
                />
                <small class="p-error">{{ errors.isPeriodic }}</small>
              </div>
              <div class="p-field">
                <label for="purchasingPortal">Portal de Compras</label>
                <Dropdown
                  id="purchasingPortal"
                  v-model="form.purchasingPortal"
                  :options="purchasingPortals"
                  option-label="name"
                  option-value="value"
                  placeholder="Selecione um portal de compras"
                  class="w-full"
                />
                <small class="p-error">{{ errors.purchasingPortal }}</small>
              </div>
              <div class="p-field input-full">
                <label for="licitationNumber"
                  >Nº da Licicação no Portal de Compras</label
                >
                <InputText
                  id="licitationNumber"
                  v-model="form.licitationNumber"
                  placeholder="Insira o número da licitação"
                  class="w-full"
                />
                <small class="p-error">{{ errors.licitationNumber }}</small>
              </div>
              <template
                v-for="(authority, index) in form.contractingAuthorities"
                :key="index"
              >
                <h5 class="input-full">
                  Dados Contratante/Participante
                  <span :hidden="!multipleContractings">{{ index + 1 }}</span>
                </h5>
                <div class="p-field">
                  <label :for="`contractingAuthority-${index}`"
                    >Órgão Contratante/Participante</label
                  >
                  <Dropdown
                    :id="`contractingAuthority-${index}`"
                    v-model="authority.value"
                    :options="contractingAuthorities"
                    option-label="name"
                    option-value="value"
                    placeholder="Selecione um órgão"
                    class="w-full"
                    @change="onContractingAuthorityChange(index)"
                  />
                </div>
                <div class="p-field">
                  <label :for="`contractingAuthoritySigla-${index}`"
                    >Sigla Órgão Contratante</label
                  >
                  <InputText
                    :id="`contractingAuthoritySigla-${index}`"
                    v-model="authority.sigla"
                    placeholder="Sigla será preenchida automaticamente"
                    class="w-full"
                    readonly
                  />
                </div>

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
              <div class="p-field">
                <label for="administrativeProcessNumber"
                  >Nº Processo Administrativo</label
                >
                <InputNumber
                  id="administrativeProcessNumber"
                  v-model="form.administrativeProcessNumber"
                  :use-grouping="false"
                  placeholder="Insira o número do processo administrativo"
                  class="w-full"
                />
                <small class="p-error">{{
                  errors.administrativeProcessNumber
                }}</small>
              </div>
              <div class="p-field">
                <label for="pregoeiro">Pregoeiro (A)</label>
                <InputText
                  id="pregoeiro"
                  v-model="form.pregoeiro"
                  placeholder="Insira o pregoeiro"
                  class="w-full"
                />
                <small class="p-error">{{ errors.pregoeiro }}</small>
              </div>
              <div class="p-field input-full">
                <label for="completeObjectDescription">
                  Descrição Completa do Objeto
                </label>
                <Textarea
                  id="completeObjectDescription"
                  v-model="form.completeObjectDescription"
                  placeholder="Insira a descrição completa do objeto"
                  class="w-full"
                />
                <small class="p-error">{{
                  errors.completeObjectDescription
                }}</small>
              </div>
              <div class="p-field input-full">
                <label for="simplifiedObjectDescription">
                  Descrição Simplificada do Objeto
                </label>
                <InputText
                  id="simplifiedObjectDescription"
                  v-model="form.simplifiedObjectDescription"
                  placeholder="Insira a descrição simplificada do objeto"
                  class="w-full"
                />
                <small class="p-error">{{
                  errors.simplifiedObjectDescription
                }}</small>
              </div>
            </div>
            <div class="container-inputs-form">
              <h5 class="input-full">DESCRIÇÃO SIMPLIFICADA DO OBJETO</h5>
              <div class="p-field">
                <label for="fullEdition">Edital Completo (Edital)</label>
                <FileUpload
                  id="fullEdition"
                  v-model="form.fullEdition"
                  mode="basic"
                  name="fullEdition"
                  :auto="true"
                  :choose-label="'Buscar anexo'"
                  :upload-label="'Upload'"
                  :cancel-label="'Cancelar'"
                />
                <small class="p-error">{{ errors.fullEdition }}</small>
              </div>
              <div class="p-field">
                <label for="otherAttachments">Outros Anexos</label>
                <FileUpload
                  id="otherAttachments"
                  v-model="form.otherAttachments"
                  mode="basic"
                  name="otherAttachments"
                  :auto="true"
                  :choose-label="'Buscar anexo'"
                  :upload-label="'Upload'"
                  :cancel-label="'Cancelar'"
                />
                <small class="p-error">{{ errors.otherAttachments }}</small>
              </div>
            </div>
            <!-- Datas -->
            <div class="container-inputs-form">
              <h5 class="input-full">Datas</h5>
              <div class="p-field">
                <label for="startProposalReception"
                  >Inicio Acolhimento da Proposta</label
                >
                <Calendar
                  id="startProposalReception"
                  v-model="form.startProposalReception"
                  placeholder="Insira a data e hora de início do acolhimento da proposta"
                  class="w-full"
                  :show-time="true"
                />
                <small class="p-error">{{
                  errors.startProposalReception
                }}</small>
              </div>
              <div class="p-field">
                <label for="limitProposalReception"
                  >Limite Acolhimento da Proposta</label
                >
                <Calendar
                  id="limitProposalReception"
                  v-model="form.limitProposalReception"
                  placeholder="Insira a data e hora do limite do acolhimento da proposta"
                  class="w-full"
                  :show-time="true"
                />
                <small class="p-error">{{
                  errors.limitProposalReception
                }}</small>
              </div>
              <div class="p-field">
                <label for="openingProposal">Abertura da Proposta</label>
                <Calendar
                  id="openingProposal"
                  v-model="form.openingProposal"
                  placeholder="Insira a data e hora da abertura da proposta"
                  class="w-full"
                  :show-time="true"
                />
                <small class="p-error">{{ errors.openingProposal }}</small>
              </div>
              <div class="p-field">
                <label for="disputeDateTime">Data e Hora da Disputa</label>
                <Calendar
                  id="disputeDateTime"
                  v-model="form.disputeDateTime"
                  placeholder="Insira a data e hora da disputa"
                  class="w-full"
                  :show-time="true"
                />
                <small class="p-error">{{ errors.disputeDateTime }}</small>
              </div>
            </div>

            <div class="input-full flex flex-row-reverse">
              <Button
                :label="
                  publication_id ? 'Avançar para Próxima Tarefa' : 'Criar'
                "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const publication_id = route.params?.id

const errors = ref<{ [key: string]: any }>({})

const form = ref({
  licitationType: null,
  contractRegime: null,
  executionType: null,
  disputeMode: null,
  judgmentCriteria: null,
  editalNumber: null,
  isPeriodic: null,
  purchasingPortal: null,
  licitationNumber: null,
  contractingAuthorities: [
    {
      value: null,
      sigla: null,
      uasg: null
    }
  ],
  administrativeProcessNumber: null,
  pregoeiro: null,
  completeObjectDescription: '',
  simplifiedObjectDescription: null,
  startProposalReception: null,
  limitProposalReception: null,
  openingProposal: null,
  disputeDateTime: null,
  fullEdition: null,
  otherAttachments: null
})

// Filters Process Options
const showContractRegime = computed(
  () =>
    form.value.licitationType !== 'Leilão' && form.value.licitationType !== null
)
const showExecutionType = computed(() =>
  ['Execução de obras', 'Serviços de engenharia'].includes(
    String(form.value.contractRegime)
  )
)
const showDisputeMode = computed(() =>
  ['Pregão', 'Concorrência'].includes(String(form.value.licitationType))
)
const showJudgmentCriteria = computed(() =>
  ['Pregão', 'Concorrência'].includes(String(form.value.licitationType))
)
const comprasnet = computed(() => form.value.purchasingPortal === 'Comprasnet')
const multipleContractings = computed(() =>
  ['Pregão SRP', 'Concorrência'].includes(String(form.value.licitationType))
)

// Options
const licitationTypes = ref([
  { name: 'Pregão SRP', value: 'Pregão SRP' },
  { name: 'Pregão', value: 'Pregão' },
  { name: 'Concorrência', value: 'Concorrência' },
  { name: 'Concorrência SRP', value: 'Concorrência SRP' },
  { name: 'Diálogo competitivo', value: 'Diálogo competitivo' },
  { name: 'Credenciamento', value: 'Credenciamento' },
  { name: 'Leilão', value: 'Leilão' }
])

const contractRegimes = ref([
  { name: 'Fornecimento', value: 'Fornecimento' },
  { name: 'Serviço', value: 'Serviço' },
  { name: 'Fornecimento e serviço', value: 'Fornecimento e serviço' },
  { name: 'Execução de obras', value: 'Execução de obras' },
  { name: 'Serviços de engenharia', value: 'Serviços de engenharia' }
])

const executionTypes = ref([
  { name: 'Preço unitário', value: 'Preço unitário' },
  { name: 'Preço global', value: 'Preço global' }
])

const disputeModes = ref([
  { name: 'Aberto', value: 'Aberto' },
  { name: 'Fechado', value: 'Fechado' },
  { name: 'Randômico', value: 'Randômico' }
])

const judgmentCriteria = ref([
  { name: 'Menor preço por item', value: 'Menor preço por item' },
  { name: 'Menor preço por grupo', value: 'Menor preço por grupo' },
  {
    name: 'Menor preço por item e por grupo',
    value: 'Menor preço por item e por grupo'
  },
  { name: 'Maior desconto', value: 'Maior desconto' }
])

const periodicOptions = ref([
  { name: 'Sim', value: 'true' },
  { name: 'Não', value: 'false' }
])

const purchasingPortals = ref([
  { name: 'Comprasnet', value: 'Comprasnet' },
  { name: 'e-licititações (BB)', value: 'e-licititações (BB)' },
  { name: 'SIGA', value: 'SIGA' }
])

const contractingAuthorities = ref<[{ value: any; sigla: any; uasg: any }]>([
  { value: '', sigla: '', uasg: '' }
])
// end options

const onContractingAuthorityChange = (index: number) => {
  const selectedAuthority = contractingAuthorities.value.find(
    (authority) =>
      authority.value === form.value.contractingAuthorities[index].value
  )

  if (selectedAuthority) {
    form.value.contractingAuthorities[index].sigla = selectedAuthority.sigla
    if (comprasnet.value) {
      form.value.contractingAuthorities[index].uasg = selectedAuthority.uasg
    }
  }
}

const addContractingAuthority = () => {
  form.value.contractingAuthorities.push({
    value: null,
    sigla: null,
    uasg: null
  })
}

const onLicitationTypeChange = () => {
  // Limpar os contratantes quando a modalidade de licitação mudar
  if (!multipleContractings.value) {
    form.value.contractingAuthorities = [
      {
        value: null,
        sigla: null,
        uasg: null
      }
    ]
  }
}
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
  @apply grid grid-cols-2 gap-4 pb-4;

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

.card {
  @apply rounded-none;

  .header-page {
    @apply flex justify-between items-center dark:text-dark-white70;
  }
}
</style>
