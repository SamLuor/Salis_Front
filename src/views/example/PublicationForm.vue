<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <h5 class="header-page">
          {{ publication_id ? 'Atualizar Publicação' : 'Cadastrar Publicação' }}
        </h5>
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
                <Calendar v-model="publicacoes[index - 1].date" show-icon />
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
                  v-model="publicacoes[index - 1].file"
                  mode="basic"
                  name="demo[]"
                  class="w-full"
                  :choose-label="'Selecione um arquivo'"
                  :max-file-size="1000000"
                  @select="(event) => selectFile(event, index - 1)"
                />
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
                  v-model="publicacoes[index - 1].cliente_id"
                  :options="means_options"
                  option-label="name"
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
import { onMounted, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  schemaCreatePublication,
  schemaUpdatePublication
} from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import router from '@/router'
import { ClientProtocol, Endereco, Telefone } from '@/@types/client'
import InputNumber from 'primevue/inputnumber'
import { PublicationProtocol } from '@/@types/publication'
import Calendar from 'primevue/calendar'
import { FileUploadSelectEvent } from 'primevue/fileupload'
import * as zod from 'zod'

const toast = useToast()
const route = useRoute()
const publication_id = route.params?.id
const schema = publication_id
  ? schemaUpdatePublication
  : schemaCreatePublication
const { setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema)
})

const errors = ref<{ [key: string]: any }>({})

const clients_options = ref([])
const means_options = ref([])

const publicacoes = ref<PublicationProtocol[]>([
  { cliente_id: '', date: '', file: '', meio_publicacao_id: '' }
])

const selectFile = (event: FileUploadSelectEvent, index: number) =>
  (publicacoes.value[index].file = event.files[0])

const onFormSubmit = async () => {
  try {
    schema.parse({
      publicacoes: publicacoes.value
    })
  } catch (err) {
    if (err instanceof zod.ZodError) {
      errors.value = err.issues.reduce((acc: any, current) => {
        const key = current.path.join('-')
        acc[key] = current
        return acc
      }, {})
    }
    return
  }

  const formData = new FormData()

  publicacoes.value.forEach((item: any, index: number) => {
    formData.append(`publicacoes[${index}]`, item)
  })

  console.log(formData.get('publicacoes'))

  /*  try {
    if (!publication_id) await services.Publication.createPublication(formData)
    else await services.Company.updateCompany(formData, String(publication_id))

    router.push({ name: 'company' })
    toast.add({
      severity: 'success',
      summary: !values?.id
        ? 'Cliente criado com sucesso!'
        : 'Cliente atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: !values?.id
        ? 'Erro ao criar Cliente'
        : 'Erro ao atualizar Cliente',
      detail: (err as Error).message,
      life: 3000
    })
  } */
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

  if (publication_id) {
    const response = await services.Publication.getPublication(
      publication_id as string
    )

    publicacoes.value = response.data.publicacoes
  }
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
