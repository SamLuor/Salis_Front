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
              <small
                v-if="!errors.razao_social && !errorsPreSave['razao_social']"
                id="razao_social-help"
                >Digite a razão social do Cliente.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.razao_social ||
                errorsPreSave['razao_social'].message ||
                '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Nome Fantasia</label>
              <InputText
                id="nome_fantasia"
                v-bind="nome_fantasia"
                aria-describedby="nome_fantasia-help"
              />
              <small
                v-if="!errors.nome_fantasia && !errorsPreSave['nome_fantasia']"
                id="nome_fantasia-help"
                >Digite o nome fantasia do cliente.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.nome_fantasia ||
                errorsPreSave['nome_fantasia'].message ||
                '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 w-full">
              <label for="username">Sigla</label>
              <InputText
                id="sigla"
                v-bind="sigla"
                aria-describedby="sigla-help"
              />
              <small
                v-if="!errors.sigla && !errorsPreSave['sigla']"
                id="sigla-help"
                >Digite a sigla do cliente.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.sigla || errorsPreSave['sigla'].message || '&nbsp;'
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
              <small
                v-if="!errors.cnpj && !errorsPreSave['cnpj']"
                id="CNPJ-help"
                >Digite o CNPJ do cliente.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.cnpj || errorsPreSave['cnpj'].message || '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Email</label>
              <InputText
                id="Email"
                v-bind="email"
                aria-describedby="Email-help"
              />
              <small
                v-if="!errors.email && !errorsPreSave['email']"
                id="Email-help"
                >Digite o email da cliente.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.email || errorsPreSave['email'].message || '&nbsp;'
              }}</small>
            </div>
            <div class="flex flex-column gap-2 input-full w-full">
              <label for="username">Empresas</label>
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
              <small
                v-if="!errors.empresas && !errorsPreSave['empresas']"
                id="Email-help"
                >Selecione uma ou mais empresas.</small
              >
              <small v-else id="text-error" class="p-error">{{
                errors.empresas || errorsPreSave['empresas'].message || '&nbsp;'
              }}</small>
            </div>
            <h5 class="font-semibold input-full title-section-form">
              Endereços
            </h5>
            <template
              v-for="index in enderecos?.length"
              :key="'endereco-'.concat(String(index))"
            >
              <div class="flex flex-column gap-2 w-full">
                <label for="cep">CEP</label>
                <InputMask
                  id="cep"
                  v-model="enderecos[index - 1].cep"
                  mask="99999-999"
                  placeholder="99999-999"
                />
                <small
                  v-if="!errorsPreSave[`enderecos-${index - 1}-cep`]"
                  id="cep-help"
                  >Digite o CEP do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errorsPreSave[`enderecos-${index - 1}-cep`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label for="logradouro">Logradouro</label>
                <InputText
                  id="logradouro"
                  v-model="enderecos[index - 1].logradouro"
                  aria-describedby="logradouro-help"
                />
                <small
                  v-if="!errorsPreSave[`enderecos-${index - 1}-logradouro`]"
                  id="logradouro-help"
                  >Digite o logradouro do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errorsPreSave[`enderecos-${index - 1}-logradouro`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label for="numero">Número</label>
                <InputNumber
                  id="numero"
                  v-model="enderecos[index - 1].numero"
                  aria-describedby="numero-help"
                  :use-grouping="false"
                />
                <small
                  v-if="!errorsPreSave[`enderecos-${index - 1}-numero`]"
                  id="numero-help"
                  >Digite o número do endereço do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errorsPreSave[`enderecos-${index - 1}-numero`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label for="bairro">Bairro</label>
                <InputText
                  id="bairro"
                  v-model="enderecos[index - 1].bairro"
                  aria-describedby="bairro-help"
                />
                <small
                  v-if="!errorsPreSave[`enderecos-${index - 1}-bairro`]"
                  id="bairro-help"
                  >Digite o Bairro do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errorsPreSave[`enderecos-${index - 1}-bairro`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 input-full w-full">
                <label for="complemento">Complemento</label>
                <InputText
                  id="complemento"
                  aria-describedby="complemento-help"
                />
                <small
                  v-if="!errorsPreSave[`enderecos-${index - 1}-complemento`]"
                  id="complemento-help"
                  >Digite o Complemento do cliente.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errorsPreSave[`enderecos-${index - 1}-complemento`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <span
                v-if="enderecos.length > index"
                class="input-full relative flex items-center"
                style="border: 1px solid #e2e2e2"
              >
                <Badge
                  value="X"
                  class="absolute bg-red-400"
                  style="top: -0.7rem; right: -5px; cursor: pointer"
                  @click="enderecos.splice(index, 1)"
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
            <h5 class="font-semibold input-full title-section-form">
              Telefones
            </h5>
            <template
              v-for="index in telefones?.length"
              :key="'telefone-'.concat(String(index))"
            >
              <div class="flex flex-column gap-2 w-full">
                <label for="ddd">DDD</label>
                <InputNumber
                  v-model="telefones[index - 1].ddd"
                  input-id="ddd"
                  :use-grouping="false"
                />
                <small
                  v-if="!errorsPreSave[`telefones-${index - 1}-ddd`]"
                  id="ddd-help"
                  >Digite o DDD do Telefone.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errorsPreSave[`telefones-${index - 1}-ddd`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 w-full">
                <label for="numero">Número de telefone</label>
                <InputMask
                  id="numero"
                  v-model="telefones[index - 1].numero"
                  mask="99999-9999"
                  placeholder="99999-9999"
                />
                <small
                  v-if="!errorsPreSave[`telefones-${index - 1}-numero`]"
                  id="numero-help"
                  >Digite o número de telefone.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errorsPreSave[`telefones-${index - 1}-numero`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <div class="flex flex-column gap-2 input-full w-full">
                <label for="pessoa">Pessoa</label>
                <InputText
                  id="pessoa"
                  v-model="telefones[index - 1].pessoa"
                  aria-describedby="pessoa-help"
                />
                <small
                  v-if="!errorsPreSave[`telefones-${index - 1}-pessoa`]"
                  id="pessoa-help"
                  >Digite a pessoa do telefone.</small
                >
                <small v-else id="text-error" class="p-error">{{
                  errorsPreSave[`telefones-${index - 1}-pessoa`].message ||
                  '&nbsp;'
                }}</small>
              </div>
              <span
                v-if="telefones.length > index"
                class="input-full relative flex items-center"
                style="border: 1px solid #e2e2e2"
              >
                <Badge
                  value="X"
                  class="absolute bg-red-400"
                  style="top: -0.7rem; right: -5px; cursor: pointer"
                  @click="telefones.splice(index, 1)"
                />
              </span>
            </template>
            <Button
              class="input-full py-4"
              icon="pi pi-plus"
              label="Adicionar Endereço"
              @click="
                () => telefones.push({ ddd: null, numero: null, pessoa: '' })
              "
            />
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
import InputMask from 'primevue/inputmask'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { schemaCreateClient, schemaUpdateClient } from '@/utils/validations'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { useToast } from 'primevue/usetoast'
import { Endereco, Telefone } from '@/@types/client'
import InputNumber from 'primevue/inputnumber'
import * as zod from 'zod'
import router from '@/router'
import { CompanyProtocol } from '@/@types/company'

const loading = ref(false)
const toast = useToast()
const options_company = ref([])
const route = useRoute()
const client_id = route.params?.id
const schema = client_id ? schemaUpdateClient : schemaCreateClient
const { defineComponentBinds, errors, setFieldValue, values } = useForm({
  validationSchema: toTypedSchema(schema)
})

const errorsPreSave = ref<{ [key: string]: any }>({})

const razao_social = defineComponentBinds('razao_social')
const nome_fantasia = defineComponentBinds('nome_fantasia')
const sigla = defineComponentBinds('sigla')
const cnpj = defineComponentBinds('cnpj')
const email = defineComponentBinds('email')
const empresas = defineComponentBinds('empresas')
const enderecos = ref<Endereco[]>([
  { cep: '', logradouro: '', bairro: '', numero: null, complemento: '' }
])
const telefones = ref<Telefone[]>([{ ddd: null, numero: '', pessoa: '' }])

const onFormSubmit = async () => {
  errorsPreSave.value = {}

  try {
    schemaCreateClient.parse({
      ...values,
      enderecos: enderecos.value,
      telefones: telefones.value
    })
  } catch (err) {
    if (err instanceof zod.ZodError) {
      errorsPreSave.value = err.issues.reduce((acc: any, current) => {
        const key = current.path.join('-')
        acc[key] = current
        return acc
      }, {})
    }
    return
  }

  try {
    loading.value = true
    if (!client_id)
      await services.Clients.createClient({
        ...values,
        enderecos: enderecos.value,
        telefones: telefones.value
      })
    else
      await services.Clients.updateClient(
        {
          ...values,
          enderecos: enderecos.value,
          telefones: telefones.value
        },
        String(client_id)
      )

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
}

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

    if (response.data.enderecos.length > 0) {
      enderecos.value = response.data.enderecos.map((endereco: Endereco) => {
        return { ...endereco, numero: +endereco.numero!, complemento: '' }
      })
    }

    if (response.data.telefones.length > 0) {
      telefones.value = response.data.telefones.map((telefone: Telefone) => {
        return { ...telefone, ddd: +telefone.ddd! }
      })
    }
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
