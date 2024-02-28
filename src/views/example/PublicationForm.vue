<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
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
            <template
              v-for="index in publicacoes?.length"
              :key="'publication-'.concat(String(index))"
            >
              <div class="flex flex-column gap-2 w-full">
                <label for="ddd">Data</label>
                <Calendar
                  v-model="publicacoes[index - 1].date"
                  show-icon
                  date-format="dd/mm/yy"
                />
                <small
                  v-if="!errors[`publicacoes-${index - 1}-date`]"
                  id="ddd-help"
                  >Selecione a data da publicação.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors[`publicacoes-${index - 1}-date`].message || '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label for="numero">Arquivo</label>
                <FileUpload
                  v-if="!publication_id || !publicacoes[index - 1].file_path"
                  v-model="publicacoes[index - 1].file"
                  mode="basic"
                  name="demo[]"
                  class="w-full"
                  :choose-label="'Selecione um arquivo'"
                  :max-file-size="1000000"
                  @select="(event) => selectFile(event, index - 1)"
                />
                <span v-else class="flex gap-2">
                  <Button
                    icon="pi pi-eye"
                    class="w-full"
                    :label="
                      publicacoes[index - 1].file_path
                        ?.split('arquivos/')
                        .join('')
                    "
                    @click="
                      () =>
                        openDocument(String(publicacoes[index - 1].file_path))
                    "
                  />
                  <Button
                    v-tooltip.top="'Retirar arquivo'"
                    icon="fa-solid fa-trash"
                    class="bg-red-300"
                    @click="() => removeFile(index - 1)"
                  />
                </span>
                <small
                  v-if="!errors[`publicacoes-${index - 1}-file`]"
                  id="numero-help"
                  >Escolha um arquivo.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors[`publicacoes-${index - 1}-file`].message || '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 input-full w-full">
                <label for="pessoa">Cliente</label>
                <Dropdown
                  v-model="publicacoes[index - 1].cliente_id"
                  :options="clients_options"
                  option-label="name"
                  option-value="value"
                  empty-message="Sem clientes cadastrados"
                  placeholder="Selecione um cliente"
                  class="w-full"
                />
                <small
                  v-if="!errors[`publicacoes-${index - 1}-cliente_id`]"
                  id="pessoa-help"
                  >Selecione um cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors[`publicacoes-${index - 1}-cliente_id`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 input-full w-full">
                <label for="pessoa">Meio de Publicação</label>
                <Dropdown
                  v-model="publicacoes[index - 1].meio_publicacao_id"
                  :options="means_options"
                  option-label="name"
                  option-value="value"
                  empty-message="Sem meios de publicação cadastrados"
                  placeholder="Selecione um meio de publicação"
                  class="w-full"
                />
                <small
                  v-if="!errors[`publicacoes-${index - 1}-meio_publicacao_id`]"
                  id="pessoa-help"
                  >Selecione um meio de publicação.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors[`publicacoes-${index - 1}-meio_publicacao_id`]
                    .message || '&nbsp;'
                }}</small>
              </div>
              <span
                v-if="publicacoes.length > index"
                class="input-full relative flex items-center"
                style="border: 1px solid #e2e2e2"
              >
                <Badge
                  value="X"
                  class="absolute bg-red-400"
                  style="top: -0.7rem; right: -5px"
                  @click="removePublication(index - 1)"
                />
              </span>
            </template>
            <Button
              class="input-full py-[10px]"
              icon="pi pi-plus"
              label="Adicionar Publicação"
              @click="
                () =>
                  publicacoes.push({
                    cliente_id: '',
                    date: '',
                    file: '',
                    meio_publicacao_id: ''
                  })
              "
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
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  schemaCreatePublication,
  schemaUpdatePublication
} from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import router from '@/router'
import { PublicationProtocol } from '@/@types/publication'
import Calendar from 'primevue/calendar'
import { FileUploadSelectEvent } from 'primevue/fileupload'
import * as zod from 'zod'

const props = defineProps<{ data: PublicationProtocol[] }>()

const toast = useToast()
const route = useRoute()
const publication_id = route.params?.id
const schema = publication_id
  ? schemaUpdatePublication
  : schemaCreatePublication

const errors = ref<{ [key: string]: any }>({})

const clients_options = ref([])
const means_options = ref([])

const publicacoes = ref<PublicationProtocol[]>(
  Array.isArray(props.data)
    ? props.data
    : [{ cliente_id: '', date: '', file: '', meio_publicacao_id: '' }]
)

const selectFile = (event: any, index: number) => {
  const eventFileSelected = event as FileUploadSelectEvent
  publicacoes.value[index].file = eventFileSelected.files[0]
}

const removeFile = (index: number) => {
  publicacoes.value[index].file_path = ''
}

const removePublication = (index: number) => {
  publicacoes.value.splice(index, 1)
}

const openDocument = (path: string) => {
  const api = services.httpConfig
    .getUri()
    .split('/api')
    .join('/' + path)

  const link = document.createElement('a')
  link.href = api
  link.download = path.split('arquivos/').join('')
  link.target = '_blank'
  link.click()
}

const onFormSubmit = async () => {
  errors.value = {}
  try {
    schema.parse({
      publicacoes: publicacoes.value
    })
  } catch (err) {
    if (err instanceof zod.ZodError) {
      console.log(err.issues)
      errors.value = err.issues.reduce((acc: any, current) => {
        const key = current.path.join('-')
        acc[key] = current
        return acc
      }, {})
    }
    return
  }

  const formData = new FormData()

  publicacoes.value.forEach((item: PublicationProtocol, index: number) => {
    if (item.id) formData.append(`publicacoes[${index}][id]`, item.id)
    formData.append(
      `publicacoes[${index}][date]`,
      new Date(item.date).toDateString()
    )
    formData.append(`publicacoes[${index}][file]`, item.file)
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
  await Promise.allSettled([
    services.Clients.getClients(),
    services.MeansPublication.getMeansPublications()
  ]).then((results) => {
    results.forEach((option, index) => {
      if (option.status == 'fulfilled') {
        if (index == 0) {
          clients_options.value = option.value.data.map((client: any) => ({
            name: client.razao_social,
            value: client.id
          }))
        } else if (index == 1) {
          means_options.value = option.value.data.map((mean: any) => ({
            name: mean.nome,
            value: mean.id
          }))
        }
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

onMounted(async () => {
  receiveOptions()
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
.card {
  @apply rounded-none;

  .header-page {
    @apply flex justify-between items-center dark:text-dark-white70;
  }
}
</style>
