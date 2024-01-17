<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <h5 class="header-page">
          {{ client_id ? 'Atualizar Cliente' : 'Cadastrar Cliente' }}
        </h5>
        <div class="px-4 container-area-form">
          <div class="section-form">
            <div class="content">
              <h4 class="header">Informações do Cliente</h4>
              <p class="description">
                Estas informações são para cadastra dados do cliente, todos os
                dados dos clientes cadastradas serão visíveis a partir de
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
                >Digite a razão social do Cliente.</small
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
                >Digite o nome fantasia do cliente.</small
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
                >Digite a sigla do cliente.</small
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
                >Digite o CNPJ do cliente.</small
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
                >Digite o email da cliente.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.email || '&nbsp;'
              }}</small>
            </div>
            <h5 class="font-semibold input-full">Endereços</h5>
            <template
              v-for="index in enderecos?.length"
              :key="'endereco-'.concat(String(index))"
            >
              <div class="flex flex-column gap-2 w-full">
                <label for="cep">CEP</label>
                <InputMask id="cep" mask="99999-999" placeholder="99999-999" />
                <small v-if="!errors.email" id="cep-help"
                  >Digite o CEP do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors.enderecos || '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label for="logradouro">Logradouro</label>
                <InputText id="logradouro" aria-describedby="logradouro-help" />
                <small v-if="!errors.email" id="logradouro-help"
                  >Digite o logradouro do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors.email || '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label for="numero">Número</label>
                <InputText id="numero" aria-describedby="numero-help" />
                <small v-if="!errors.email" id="numero-help"
                  >Digite o número do endereço do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors.email || '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label for="bairro">Bairro</label>
                <InputText id="bairro" aria-describedby="bairro-help" />
                <small v-if="!errors.email" id="bairro-help"
                  >Digite o Bairro do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors.email || '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 input-full w-full">
                <label for="complemento">Complemento</label>
                <InputText
                  id="complemento"
                  aria-describedby="complemento-help"
                />
                <small v-if="!errors.email" id="complemento-help"
                  >Digite o Complemento do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errors.enderecos || '&nbsp;'
                }}</small>
              </div>
              <span
                v-if="enderecos.length > index"
                class="input-full relative flex items-center"
                style="border: 1px solid #e2e2e2"
              >
                <Badge
                  value="x"
                  size=""
                  class="absolute bg-red-400"
                  style="top: -0.7rem; right: -5px"
                />
              </span>
            </template>
            <Button
              class="input-full py-4"
              icon="pi pi-plus"
              label="Adicionar Endereço"
              @click="
                () =>
                  enderecos.push({
                    cep: '',
                    logradouro: '',
                    bairro: '',
                    numero: null,
                    complemento: ''
                  })
              "
            />
            <div class="input-full flex flex-row-reverse">
              <Button
                :label="client_id ? 'Atualizar' : 'Criar'"
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
import InputMask from 'primevue/inputmask'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { schemaCreateClient, schemaUpdateClient } from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import router from '@/router'
import { ClientProtocol, Endereco } from '@/@types/client'

const file = ref<any>(null)
const toast = useToast()
const route = useRoute()
const client_id = route.params?.id
const schema = client_id ? schemaUpdateClient : schemaCreateClient
const { defineComponentBinds, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema)
})

const razao_social = defineComponentBinds('razao_social')
const nome_fantasia = defineComponentBinds('nome_fantasia')
const sigla = defineComponentBinds('sigla')
const cnpj = defineComponentBinds('cnpj')
const email = defineComponentBinds('email')

const enderecos = ref<Endereco[]>([
  { cep: '', logradouro: '', bairro: '', numero: null, complemento: '' }
])

const onFormSubmit = handleSubmit(async (values) => {
  const formData = new FormData()

  // Transforme o objeto JSON em FormData
  for (const key of Object.keys(values) as (keyof ClientProtocol)[]) {
    formData.append(key, values[key] as string | Blob)
  }

  try {
    if (!client_id) await services.Company.createCompany(formData)
    else await services.Company.updateCompany(formData, String(client_id))

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
  }
})

const onSelectedFile = (event: any) => {
  event.files = [event.files[event.files.length - 1]]
  file.value = event.files[event.files.length - 1]
}

onMounted(async () => {
  if (client_id) {
    const response = await services.Clients.getClient(client_id as string)

    setFieldValue('id', response.data.id)
    setFieldValue('razao_social', response.data.razao_social)
    setFieldValue('nome_fantasia', response.data.nome_fantasia)
    setFieldValue('sigla', response.data.sigla)
    setFieldValue('cnpj', response.data.cnpj)
    setFieldValue('email', response.data.email)
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
