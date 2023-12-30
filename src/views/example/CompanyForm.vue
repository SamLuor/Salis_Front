<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <h5 class="header-page">
          {{ company_id ? 'Atualizar Empresa' : 'Cadastrar Empresa' }}
        </h5>
        <div class="px-4 container-area-form">
          <div class="section-form">
            <div class="content">
              <h4 class="header">Informações da Empresa</h4>
              <p class="description">
                Estas informações são para cadastra dados da empresa, todos os
                dados das empresas cadastradas serão visiveis a partir de
                permissões liberadas para os usuários.
              </p>
            </div>
          </div>
          <form class="container-form-bussiness">
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Razão Social</label>
              <InputText
                id="razao_social"
                v-bind="razao_social"
                aria-describedby="razao_social-help"
              />
              <small v-if="!errors.razao_social" id="razao_social-help"
                >Digite a razão social da empresa.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.razao_social || '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Nome Fantasia</label>
              <InputText
                id="nome_fantasia"
                v-bind="nome_fantasia"
                aria-describedby="nome_fantasia-help"
              />
              <small v-if="!errors.nome_fantasia" id="nome_fantasia-help"
                >Digite o nome fantasia da empresa.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.nome_fantasia || '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 w-full">
              <label for="username">Sigla</label>
              <InputText
                id="sigla"
                v-bind="sigla"
                aria-describedby="sigla-help"
              />
              <small v-if="!errors.sigla" id="sigla-help"
                >Digite a sigla da empresa.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.sigla || '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 w-full">
              <label for="username">CNPJ</label>
              <InputMask
                id="CNPJ"
                v-bind="cnpj"
                mask="99.999.999/9999-99"
                aria-describedby="CNPJ-help"
              />
              <small v-if="!errors.cnpj" id="CNPJ-help"
                >Digite o CNPJ da empresa.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.cnpj || '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Email</label>
              <InputText
                id="Email"
                v-bind="email"
                aria-describedby="Email-help"
              />
              <small v-if="!errors.email" id="Email-help"
                >Digite o email da empresa.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.email || '&nbsp;'
              }}</small>
            </div>
            <div class="input-full file-upload">
              <FileUpload
                name="demo[]"
                url="/api/upload"
                accept="image/*"
                :multiple="false"
                class="input-full"
                :max-file-size="1000000"
                @select="onSelectedFile"
              >
                <template #header="{ chooseCallback }">
                  <div
                    class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2 header-file-upload"
                  >
                    <div class="flex gap-2">
                      <Button icon="pi pi-images" @click="chooseCallback" />
                    </div>
                  </div>
                </template>
                <template #content>
                  <div
                    v-if="file"
                    class="content-file-upload flex flex-wrap p-0 sm:p-5 gap-5 w-full"
                  >
                    <div
                      class="m-0 px-6 py-6 flex flex-column border-1 surface-border align-items-center gap-3 w-full"
                    >
                      <div>
                        <img
                          role="presentation"
                          :alt="file?.name"
                          :src="file?.objectURL"
                          width="150"
                          height="70"
                          class="shadow-2"
                        />
                      </div>
                      <span class="font-semibold name-file">{{
                        file?.name
                      }}</span>
                      <Badge
                        value="Completed"
                        class="mt-3"
                        severity="success"
                      />
                      <Button
                        icon="pi pi-times"
                        outlined
                        rounded
                        severity="danger"
                        @click="file = null"
                      />
                    </div>
                  </div>
                </template>
                <template #empty>
                  <div
                    class="flex align-items-center justify-content-center flex-column content"
                  >
                    <i
                      class="pi pi-cloud-upload icon-upload border-2 border-circle p-5 text-8xl text-400 border-400"
                    />
                    <p class="mt-4 mb-0 description">
                      Arraste e solte aqui ou Selecione um arquivo.
                    </p>
                  </div>
                </template>
              </FileUpload>
              <small id="text-error" class="p-error">{{
                errors.logo_img_path || '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Frase</label>
              <Textarea
                id="Frase"
                v-bind="frase"
                style="resize: vertical; min-height: 100px"
                aria-describedby="Frase-help"
              />
              <small v-if="!errors.frase" id="Frase-help"
                >Digite a frase da empresa.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.frase || '&nbsp;'
              }}</small>
            </div>
            <div class="input-full flex flex-row-reverse">
              <Button label="Criar" @click="onFormSubmit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FileUpload from 'primevue/fileupload'
import InputMask from 'primevue/inputmask'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { schemaCreateCompany, schemaUpdateCompany } from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import { CompanyProtocol } from '@/@types/company'

const file = ref<any>(null)
const toast = useToast()
const route = useRoute()
const company_id = route.params?.id
const schema = company_id ? schemaUpdateCompany : schemaCreateCompany
const { defineComponentBinds, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema)
})

const razao_social = defineComponentBinds('razao_social')
const nome_fantasia = defineComponentBinds('nome_fantasia')
const sigla = defineComponentBinds('sigla')
const cnpj = defineComponentBinds('cnpj')
const email = defineComponentBinds('email')
const logo_img_path = defineComponentBinds('logo_img_path')
const frase = defineComponentBinds('frase')

const onFormSubmit = handleSubmit(async (values) => {
  const formData = new FormData()
  console.log('caiu')
  // Transforme o objeto JSON em FormData
  for (const key of Object.keys(values) as (keyof CompanyProtocol)[]) {
    formData.append(key, values[key] as string | Blob)
  }

  try {
    if (!company_id) await services.Company.createCompany(formData)
    else await services.Company.updateCompany(formData, String(company_id))

    toast.add({
      severity: 'success',
      summary: !values?.id
        ? 'Empresa criada com sucesso!'
        : 'Empresa atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: !values?.id
        ? 'Erro ao criar Empresa'
        : 'Erro ao atualizar Empresa',
      detail: (err as Error).message,
      life: 3000
    })
  }
})

const onSelectedFile = (event: any) => {
  console.log(event.files)
  event.files = [event.files[event.files.length - 1]]
  file.value = event.files[event.files.length - 1]
  console.log(file.value)
}

onMounted(async () => {
  if (company_id) {
    const response = await services.Company.getCompany(company_id as string)

    setFieldValue('id', response.data.id)
    setFieldValue('razao_social', response.data.razao_social)
    setFieldValue('nome_fantasia', response.data.nome_fantasia)
    setFieldValue('sigla', response.data.sigla)
    setFieldValue('cnpj', response.data.cnpj)
    setFieldValue('email', response.data.email)
    setFieldValue('logo_img_path', response.data.logo_img_path)
    setFieldValue('frase', response.data.frase)
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
