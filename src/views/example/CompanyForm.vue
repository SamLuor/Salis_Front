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
                dados das empresas cadastradas serão visíveis a partir de
                permissões liberadas para os usuários.
              </p>
            </div>
          </div>
          <form class="container-form-bussiness">
            <InputTextBase
              label="Razão Social"
              helper="Digite a razão social da empresa."
              class-base="input-full"
              :required="true"
              :input-props="razao_social"
              :invalid="!!errors?.razao_social"
              :error="errors?.razao_social"
            />
            <InputTextBase
              label="Nome Fantasia"
              helper="Digite o nome fantasia da empresa."
              class-base="input-full"
              :required="true"
              :input-props="nome_fantasia"
              :invalid="!!errors?.nome_fantasia"
              :error="errors?.nome_fantasia"
            />
            <InputMaskBase
              label="CNPJ"
              helper="Digite o CNPJ da empresa."
              :required="true"
              :input-props="{ ...cnpj, mask: '99.999.999/9999-99' }"
              :error="errors?.cnpj"
              :invalid="!!errors?.cnpj"
            />
            <InputTextBase
              label="Email"
              helper="Digite o email da empresa."
              :required="true"
              :error="errors?.email"
              :invalid="!!errors?.email"
              :input-props="{ ...email, type: 'email' }"
            />
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
            <TextareaBase
              label="Frase"
              helper="Digite a frase da empresa"
              class-base="input-full"
              :required="true"
              :invalid="!!errors.frase"
              :error="errors.frase"
              :input-props="{ ...frase, autoResize: true }"
            />
            <AddressesForm :enderecos="enderecos" :errors="errorsAddress" />
            <ContactsForm :contatos="contatos" :errors="errorsContact" />
            <div class="input-full flex flex-row-reverse">
              <Button
                :label="company_id ? 'Atualizar' : 'Criar'"
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
import FileUpload from 'primevue/fileupload'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { schemaCreateCompany, schemaUpdateCompany } from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import router from '@/router'
import AddressesForm from '@/components/Forms/components/AddressesForm.vue'
import { Address, ErrorsAddress } from '@/@types/addresses'
import {
  deepClone,
  validitySchemaArray,
  createStructureAddressFormData,
  createStructureContactFormData
} from '@/utils/helpers'
import { AddressInitial, ContactInitial } from '@/utils/constants'
import { addressesSchema, contactsSchema } from '@/utils/validations'
import ContactsForm from '@/components/Forms/components/ContactsForm.vue'
import { Contact, ErrorsContact } from '@/@types/contacts'
import InputTextBase from '@/components/Forms/components/InputTextBase.vue'
import InputMaskBase from '@/components/Forms/components/InputMaskBase.vue'
import TextareaBase from '@/components/Forms/components/TextareaBase.vue'

const file = ref<any>(null)
const toast = useToast()
const route = useRoute()
const company_id = route.params?.id
const errorsAddress = ref<ErrorsAddress[]>([])
const errorsContact = ref<ErrorsContact[]>([])
const schema = company_id ? schemaUpdateCompany : schemaCreateCompany
const { defineComponentBinds, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema)
})

const razao_social = defineComponentBinds('razao_social')
const nome_fantasia = defineComponentBinds('nome_fantasia')
const cnpj = defineComponentBinds('cnpj')
const email = defineComponentBinds('email')
const logo_img_path = defineComponentBinds('logo_img_path')
const frase = defineComponentBinds('frase')

const enderecos = ref<Address[]>([deepClone(AddressInitial)])
const contatos = ref<Contact[]>([deepClone(ContactInitial)])

const onFormSubmit = handleSubmit(async (values) => {
  errorsAddress.value = []

  errorsAddress.value = validitySchemaArray(
    addressesSchema,
    enderecos.value
  ) as ErrorsAddress[]

  errorsContact.value = validitySchemaArray(contactsSchema, contatos.value)

  if (errorsAddress.value.length || errorsContact.value.length) return

  const formData = new FormData()
  const isCreate = 'id' in values

  // Transforme o objeto JSON em FormData
  for (const key of Object.keys(values)) {
    formData.append(key, values[key as keyof typeof values] as string | Blob)
  }

  createStructureContactFormData(formData, contatos.value)
  createStructureAddressFormData(formData, enderecos.value)

  try {
    if (!company_id) await services.Company.createCompany(formData)
    else await services.Company.updateCompany(formData, String(company_id))

    router.push({ name: 'company' })
    toast.add({
      severity: 'success',
      summary: isCreate
        ? 'Empresa criada com sucesso!'
        : 'Empresa atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: isCreate ? 'Erro ao criar Empresa' : 'Erro ao atualizar Empresa',
      detail: (err as Error).message,
      life: 3000
    })
  }
})

const onSelectedFile = (event: any) => {
  event.files = [event.files[event.files.length - 1]]
  file.value = event.files[event.files.length - 1]
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

    enderecos.value = response.data.enderecos.map((endereco: any) => ({
      ...endereco,
      logradouro: endereco.logradouro?.split(' - ')[0],
      cidade: endereco.logradouro?.split(' - ')[1]
    }))

    contatos.value = response.data.telefones.map((contact: any) => ({
      ...contact,
      ddd: +contact.ddd,
      numero: +contact.numero
    }))
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
