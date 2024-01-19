<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <h5 class="header-page">
          {{
            means_id
              ? 'Atualizar Meio de Publicação'
              : 'Cadastrar Meio de Publicação'
          }}
        </h5>
        <div class="px-4 container-area-form">
          <div class="section-form">
            <div class="content">
              <h4 class="header">Informações do Meio de Publicação</h4>
              <p class="description">
                Estas informações são para cadastra dados do meio de publicação,
                todos os dados dos meios de publicação cadastradas serão
                visíveis a partir de permissões liberadas para os usuários.
              </p>
            </div>
          </div>
          <form class="container-form-bussiness">
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="meio-publicacao">Nome do meio de publicação</label>
              <InputText
                id="meio-publicacao"
                v-bind="nome"
                aria-describedby="meio-publicacao-help"
              />
              <small v-if="!errors.nome" id="meio-publicacao-help"
                >Digite o nome do meio de publicação.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.nome || '&nbsp;'
              }}</small>
            </div>
            <div class="input-full flex flex-column gap-2 w-full">
              <MultiSelect
                v-bind="empresas"
                :placeholder="
                  loading ? 'Carregando empresas...' : 'Selecione uma empresa'
                "
                option-label="text"
                option-value="value"
                :options="options_company"
                empty-message="Nenhuma opção cadastrada"
                :loading="loading"
                class="w-full"
                display="chip"
                :class="['w-full', { 'p-invalid': errors.empresas }]"
              />
              <small v-if="!errors.empresas" id="meio-publicacao-help"
                >Selecione as empresas.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.empresas || '&nbsp;'
              }}</small>
            </div>
            <div class="input-full flex flex-row-reverse">
              <Button
                :label="means_id ? 'Atualizar' : 'Criar'"
                :loading="loading"
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
  schemaCreateMeansPublication,
  schemaUpdateMeansPublication
} from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import router from '@/router'
import { MeansPublicationProtocol } from '@/@types/means_publication'
import InputText from 'primevue/inputtext'
import { CompanyProtocol } from '@/@types/company'
import MultiSelect from 'primevue/multiselect'

const loading = ref<boolean>(false)
const toast = useToast()
const route = useRoute()
const means_id = route.params?.id
const schema = means_id
  ? schemaCreateMeansPublication
  : schemaUpdateMeansPublication
const { defineComponentBinds, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema)
})

const nome = defineComponentBinds('nome')
const empresas = defineComponentBinds('empresas')

const options_company = ref([])

const onFormSubmit = handleSubmit(async (values) => {
  try {
    if (!means_id)
      await services.MeansPublication.createMeansPublication(
        values as MeansPublicationProtocol
      )
    else
      await services.MeansPublication.updateMeansPublication(
        values as MeansPublicationProtocol,
        String(means_id)
      )

    router.push({ name: 'means-publication' })
    toast.add({
      severity: 'success',
      summary: means_id
        ? 'Meio de Publicação criado com sucesso!'
        : 'Meio de Publicação atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: means_id
        ? 'Erro ao criar Meio de Publicação'
        : 'Erro ao atualizar Meio de Publicação',
      detail: (err as Error).message,
      life: 3000
    })
  }
})

const receiveOptions = async () => {
  try {
    loading.value = true
    const response = await services.Option.getCompanies()
    options_company.value = response.data
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error carregar opções de empresas',
      detail: (err as Error).message,
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  receiveOptions()

  if (means_id) {
    const response = await services.MeansPublication.getMeanPublication(
      means_id as string
    )

    setFieldValue('nome', response.data.nome)
    setFieldValue(
      'empresas',
      response.data.empresas.map((empresa: CompanyProtocol) => empresa.id)
    )
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
