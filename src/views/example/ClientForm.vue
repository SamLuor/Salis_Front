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
            <InputTextBase
              label="Razão Social"
              helper="Digite a razão social do Cliente."
              :required="true"
              :error="errors.razao_social"
              :invalid="!!errors.razao_social"
              :input-props="{ ...razao_social }"
            />
            <InputTextBase
              label="Nome Fantasia"
              helper="Digite o nome fantasia do cliente."
              :required="true"
              :error="errors.nome_fantasia"
              :invalid="!!errors.nome_fantasia"
              :input-props="{ ...nome_fantasia }"
            />
            <InputTextBase
              label="Sigla"
              helper="Digite a sigla do cliente."
              :required="true"
              :error="errors.sigla"
              :invalid="!!errors.sigla"
              :input-props="{ ...sigla }"
            />
            <InputMaskBase
              label="CNPJ"
              helper="Digite o CNPJ do cliente."
              :required="true"
              :error="errors.cnpj"
              :invalid="!!errors.cnpj"
              :input-props="{ ...cnpj, mask: '99.999.999/9999-99' }"
            />
            <InputTextBase
              label="Email"
              helper="Digite o email do cliente."
              class-base="input-full"
              :required="true"
              :error="errors.email"
              :invalid="!!errors.email"
              :input-props="{ ...email }"
            />
            <MultiSelectBase
              label="Empresas"
              helper="Selecione uma ou mais empresas."
              class-base="input-full"
              :required="true"
              :invalid="!!errors.empresas"
              :error="errors.empresas"
              :input-props="{
                ...empresas,
                options: optionsStore.empresa,
                optionLabel: 'text',
                optionValue: 'value',
                emptyMessage: 'Nenhuma opção cadastrada',
                display: 'chip',
                loading: loading,
                placeholder: loading
                  ? 'Carregando empresas...'
                  : 'Selecione uma empresa'
              }"
            />
            <AddressesForm :enderecos="enderecos" :errors="errorsEnderecos" />
            <ContactsForm :contatos="contatos" :errors="errorsContatos" />
            <div class="input-full flex flex-row-reverse">
              <Button
                :label="client_id ? 'Atualizar' : 'Criar'"
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
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'

import type { CompanyProtocol } from '@/@types/company'
import type { Address, ErrorsAddress } from '@/@types/addresses'
import type { Contact, ErrorsContact } from '@/@types/contacts'
import type { ClientProtocol } from '@/@types/client'

import AddressesForm from '@/components/Forms/components/AddressesForm.vue'
import ContactsForm from '@/components/Forms/components/ContactsForm.vue'
import MultiSelectBase from '@/components/Forms/components/MultiSelectBase.vue'
import InputTextBase from '@/components/Forms/components/InputTextBase.vue'
import InputMaskBase from '@/components/Forms/components/InputMaskBase.vue'

import { deepClone, validitySchemaArray } from '@/utils/helpers'
import { AddressInitial, ContactInitial } from '@/utils/constants'
import {
  contactsSchema,
  schemaCreateClient,
  schemaUpdateClient
} from '@/utils/validations'

import router from '@/router'
import services from '@/api/index'
import { toTypedSchema } from '@vee-validate/zod'
import useOptionsStore from '@/store/options'
import { addressesSchema } from '@/utils/validations'

const route = useRoute()
const client_id = route.params?.id

const schema = client_id ? schemaUpdateClient : schemaCreateClient
const { handleSubmit, defineComponentBinds, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema)
})

const optionsStore = useOptionsStore()
const toast = useToast()
const loading = ref(false)

const razao_social = defineComponentBinds('razao_social')
const nome_fantasia = defineComponentBinds('nome_fantasia')
const sigla = defineComponentBinds('sigla')
const cnpj = defineComponentBinds('cnpj')
const email = defineComponentBinds('email')
const empresas = defineComponentBinds('empresas')

const contatos = ref<Contact[]>([deepClone(ContactInitial)])
const errorsContatos = ref<ErrorsContact[]>([])

const enderecos = ref<Address[]>([deepClone(AddressInitial)])
const errorsEnderecos = ref<ErrorsAddress[]>([])

const onFormSubmit = handleSubmit(async (values) => {
  errorsContatos.value = validitySchemaArray(contactsSchema, contatos.value)
  errorsEnderecos.value = validitySchemaArray(addressesSchema, enderecos.value)

  if (errorsContatos.value.length || errorsEnderecos.value.length) return

  const body = {
    ...values,
    enderecos: enderecos.value.map((endereco) => ({
      cep: endereco.cep,
      logradouro: endereco.logradouro + ' - ' + endereco.cidade,
      bairro: endereco.bairro,
      numero: endereco.numero,
      complemento: endereco.complemento
    })),
    telefones: contatos.value
  } as ClientProtocol

  try {
    loading.value = true
    if (!client_id) await services.Clients.createClient(body)
    else await services.Clients.updateClient(body, String(client_id))

    router.push({ name: 'clients' })
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
  } finally {
    loading.value = false
  }
})

const receiveOptions = async () => {
  try {
    loading.value = true
    await services.Option.getCompanies()
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
  await receiveOptions()
  if (client_id) {
    const response = await services.Clients.getClient(client_id as string)

    setFieldValue('id', response.data.id)
    setFieldValue('razao_social', response.data.razao_social)
    setFieldValue('nome_fantasia', response.data.nome_fantasia)
    setFieldValue('sigla', response.data.sigla)
    setFieldValue('cnpj', response.data.cnpj)
    setFieldValue('email', response.data.email)
    setFieldValue(
      'empresas',
      response.data.empresas.map((empresa: CompanyProtocol) => empresa.id)
    )

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

.title-section-form {
  @apply dark:text-dark-white70;
}
</style>
