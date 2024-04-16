<template>
  <div class="grid overflow-hidden">
    <div class="w-full relative">
      <span
        class="flex text-sm bg-gray-200 gap-1 border-none p-2 items-center rounded-md absolute right-0 cursor-pointer"
        style="border-radius: 4px"
        @click="visible = true"
      >
        Tipo de processo:
        <span v-if="nameTypeProcess" class="font-semibold">
          {{ nameTypeProcess }}
        </span>
        <span v-else>Nenhuma opção selecionada</span>
        <i class="fa-solid fa-arrows-rotate ml-1 text-blue-600 text-base" />
      </span>
    </div>
    <div class="w-full pl-2 pt-4">
      <div class="card mb-0 bg-transparent">
        <div class="px-4 container-area-form">
          <div class="section-form">
            <div class="content">
              <h4 class="header">Informações da Publicação</h4>
              <p class="description">
                Estas informações são para cadastra dados da publicação, todos
                os dados das publicações cadastradas serão visíveis a partir de
                permissões liberadas para os usuários.
              </p>
            </div>
          </div>
          <form class="container-form-bussiness">
            <div
              v-for="(publication, index) in publicacoes.publicacoes"
              :key="'publication-'.concat(String(index))"
              class="container-inputs"
            >
              <i
                v-if="index > 0"
                v-tooltip.top="'Remover endereço'"
                class="pi pi-times xmark-remove"
                @click="removePublication(index)"
              />
              <FileUploadBase
                v-model:file="publication.file"
                v-model:file-path="publication.file_path"
                label="Arquivo"
                helper="Escolha um arquivo"
                class-base="input-full"
                :error="errorsPublications[index]?.file?.message"
                :invalid="!!errorsPublications[index]?.file"
                :file-props="{
                  multiple: false,
                  mode: 'basic',
                  customUpload: true,
                  chooseLabel: 'Escolher Arquivo'
                }"
              />
              <CalendarBase
                v-model="publication.date"
                label="Data"
                helper="Selecione a data da publicação."
                :invalid="!!errorsPublications[index]?.date"
                :error="errorsPublications[index]?.date?.message"
                :input-props="{ showIcon: true, dateFormat: 'dd/mm/yy' }"
              />
              <DropdownBase
                v-model="publication.cliente_id"
                label="Cliente"
                helper="Selecione um cliente."
                :error="errorsPublications[index]?.cliente_id?.message"
                :invalid="!!errorsPublications[index]?.cliente_id"
                :input-props="{
                  options: optionsStore.clientes,
                  optionLabel: 'text',
                  optionValue: 'value',
                  emptyMessage: 'Sem clientes cadastrados'
                }"
              />
              <DropdownBase
                v-model="publication.meio_publicacao_id"
                class-base="w-full input-full"
                label="Meio de Publicação"
                helper="Selecione um meio de publicação."
                :error="errorsPublications[index]?.meio_publicacao_id?.message"
                :invalid="!!errorsPublications[index]?.meio_publicacao_id"
                :input-props="{
                  options: optionsStore.meios_publicacao,
                  optionLabel: 'text',
                  optionValue: 'value',
                  emptyMessage: 'Sem meios de publicação cadastrados'
                }"
              />
              <hr class="w-full border-gray-300 input-full" />
            </div>
            <Button
              class="input-full btn-add-publication"
              icon="pi pi-plus"
              label="Adicionar Publicação"
              @click="addPublication"
            />
            <div class="input-full flex flex-row-reverse">
              <Button
                :label="publication_id ? 'Atualizar' : 'Criar'"
                @click="onFormSubmit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :closable="true"
    header="Selecione o tipo do Processo"
    :style="{ width: '50rem' }"
  >
    <div class="flex align-items-center gap-3 mb-2">
      <DropdownBase
        v-model="type_process"
        class-base="w-full"
        label="Tipo de Processo"
        helper="Selecione o tipo de processo."
        :error="errors?.processo?.tipo_processo_id?.message"
        :invalid="!!errors?.processo?.tipo_processo_id"
        :input-props="{
          options: optionsStore.tipos_processo,
          optionLabel: 'text',
          optionValue: 'value',
          emptyMessage: 'Sem tipos de processos cadastrados'
        }"
      />
    </div>
    <div class="flex flex-row-reverse">
      <Button
        label="Confirmar"
        autofocus
        @click="confirmSelectType(type_process)"
      />
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { schemaCreatePublication, schemaPublication } from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import router from '@/router'
import { Publications, ErrorsPublication } from '@/@types/publication'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import useProcessStore from '@/store/process'
import { deepClone, validityForm, validitySchemaArray } from '@/utils/helpers'
import { PublicationsInitial } from '@/utils/constants'
import FileUploadBase from '@/components/Forms/components/FileUploadBase.vue'
import CalendarBase from '@/components/Forms/components/CalendarBase.vue'
import DropdownBase from '@/components/Forms/components/DropdownBase.vue'
import useOptionsStore from '@/store/options'
import { Publicacoes } from '@/@types/process'

const processStore = useProcessStore()
const optionsStore = useOptionsStore()

const toast = useToast()
const route = useRoute()
const publication_id = route.params?.id

const visible = ref<boolean>(false)

const errors = ref<{ [key: string]: any }>({})
const errorsPublications = ref<ErrorsPublication[]>([])

const type_process = ref('')

const publicacoes = ref<Publications>(deepClone(PublicationsInitial))

const nameTypeProcess = computed(() => {
  if (!type_process.value) return null

  return optionsStore.tipos_processo.find(
    (element) => element.value === publicacoes.value.processo.tipo_processo_id
  )?.text
})

const confirmSelectType = (value: string) => {
  publicacoes.value.processo.tipo_processo_id = value
  type_process.value = value
  visible.value = false
}

const addPublication = () => {
  publicacoes.value.publicacoes.push(
    deepClone(PublicationsInitial.publicacoes[0])
  )
}

const removePublication = (index: number) => {
  publicacoes.value.publicacoes.splice(index, 1)
}

const onFormSubmit = async () => {
  errors.value = validityForm(schemaCreatePublication, publicacoes.value)

  errorsPublications.value = validitySchemaArray(
    schemaPublication,
    publicacoes.value.publicacoes
  )

  if (Object.keys(errors.value).length || errorsPublications.value.length)
    return

  const formData = new FormData()

  formData.append(
    'processo[tipo_processo_id]',
    publicacoes.value.processo.tipo_processo_id
  )

  publicacoes.value.publicacoes.forEach((item, index: number) => {
    if (item.id) formData.append(`publicacoes[${index}][id]`, item.id)
    formData.append(
      `publicacoes[${index}][date]`,
      new Date(item.date).toDateString()
    )
    if (item.file) {
      formData.append(`publicacoes[${index}][file]`, item.file)
    }
    formData.append(`publicacoes[${index}][cliente_id]`, item.cliente_id)
    formData.append(
      `publicacoes[${index}][meio_publicacao_id]`,
      item.meio_publicacao_id
    )
  })

  try {
    if (!publication_id) await services.Publication.createPublication(formData)
    else
      await services.Publication.updatePublication(
        formData,
        String(publication_id)
      )

    router.push({ name: 'publications' })
    toast.add({
      severity: 'success',
      summary: !publication_id
        ? 'Publicação criado com sucesso!'
        : 'Publicação atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: !publication_id
        ? 'Erro ao criar Publicação'
        : 'Erro ao atualizar Publicação',
      detail: (err as Error).message,
      life: 3000
    })
  }
}

const receiveOptions = async () => {
  await Promise.all([
    services.Option.getClients(),
    services.Option.getPublicationMeans(),
    services.Option.getProcessTypes()
  ])
}

const populateFields = (data: Publicacoes, typeProcess: string) => {
  publicacoes.value.publicacoes = data.map((item) => ({
    id: item.id,
    file: null,
    date: new Date(item.date),
    cliente_id: item.cliente_id,
    file_path: item.file_path,
    meio_publicacao_id: item.meio_publicacao_id
  }))
  publicacoes.value.processo.tipo_processo_id = typeProcess
  type_process.value = typeProcess
}

onMounted(async () => {
  receiveOptions()
  if (!processStore.process.id) visible.value = true
  if (processStore.publications?.length)
    populateFields(
      processStore.publications,
      processStore.process.tipo_processo_id
    )
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
.btn-add-publication {
  @apply py-6 max-h-[15px] !important;
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
  @apply flex flex-col gap-6 py-6 col-start-2 col-end-4 bg-background-light-white dark:bg-background-dark-blue70 rounded-lg shadow-sm p-4 max-h-[70vh] overflow-y-scroll;

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
.card {
  @apply rounded-none;

  .header-page {
    @apply flex justify-between items-center dark:text-dark-white70;
  }
}
.xmark-remove {
  @apply absolute right-0 -top-2 text-red-500 cursor-pointer duration-300 ease-in-out;
}
.xmark-remove:hover {
  transform: scale(1.1);
}
.container-inputs {
  @apply grid grid-cols-2 gap-x-2 gap-y-6 relative;
}
</style>
