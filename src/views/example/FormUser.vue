<template>
  <form class="user" @submit.prevent>
    <div
      v-if="errors.id"
      class="bg-red-400 text-dark-white70 text-center p-3 font-semibold"
      style="border-radius: 10px"
    >
      {{ errors.id }}
    </div>
    <div class="container-input">
      <span class="p-input-icon-left">
        <i class="pi pi-user" />
        <InputText
          v-bind="name"
          placeholder="Nome do usuário"
          :class="['w-full', { 'p-invalid': errors.name }]"
        />
      </span>
      <small id="text-error" class="p-error">{{
        errors.name || '&nbsp;'
      }}</small>
    </div>
    <div class="container-input">
      <span class="p-input-icon-left">
        <i class="pi pi-envelope" />
        <InputText
          v-bind="email"
          placeholder="Email do usuário"
          :class="['w-full', { 'p-invalid': errors.email }]"
        />
      </span>
      <small id="text-error" class="p-error">{{
        errors.email || '&nbsp;'
      }}</small>
    </div>
    <template v-if="!props.user.id">
      <div class="container-input">
        <span class="p-input-icon-left">
          <i class="pi pi-key" />
          <Password
            v-bind="password"
            placeholder="Senha"
            input-class="w-full"
            :input-style="{ paddingLeft: '2.5rem' }"
            :feedback="false"
            toggle-mask
            :class="['w-full', { 'p-invalid': errors.password }]"
          />
        </span>
        <small id="text-error" class="p-error">{{
          errors.password || '&nbsp;'
        }}</small>
      </div>
      <div class="container-input">
        <span class="p-input-icon-left">
          <i class="pi pi-key" />
          <Password
            v-bind="password_confirmation"
            placeholder="Confirmação de senha"
            input-class="w-full"
            :input-style="{ paddingLeft: '2.5rem' }"
            :feedback="false"
            toggle-mask
            :class="['w-full', { 'p-invalid': errors.password_confirmation }]"
          />
        </span>
        <small id="text-error" class="p-error">{{
          errors.password_confirmation || '&nbsp;'
        }}</small>
      </div>
    </template>
    <div class="container-input">
      <MultiSelect
        v-bind="empresas"
        :placeholder="
          loading == 'option'
            ? 'Carregando empresas...'
            : 'Selecione uma empresa'
        "
        option-label="text"
        option-value="value"
        :options="options_company"
        empty-message="Nenhuma opção cadastrada"
        :loading="loading == 'option'"
        class="w-full"
        :class="['w-full', { 'p-invalid': errors.empresas }]"
      />
      <small id="text-error" class="p-error">{{
        errors.empresas || '&nbsp;'
      }}</small>
    </div>
    <div class="container-input">
      <MultiSelect
        v-bind="positions"
        :placeholder="
          loading == 'option' ? 'Carregando Cargos...' : 'Selecione uma Cargos'
        "
        option-label="text"
        option-value="value"
        :options="options_position"
        empty-message="Nenhuma opção cadastrada"
        :loading="loading == 'option'"
        class="w-full"
        :class="['w-full', { 'p-invalid': errors.cargos }]"
      />
      <small id="text-error" class="p-error">{{
        errors.cargos || '&nbsp;'
      }}</small>
    </div>
    <Button
      :disabled="loading == 'user'"
      icon-pos="right"
      :icon="loading === 'user' ? 'fa-solid fa-spinner fa-spin' : ''"
      :label="props.user.id ? 'Atualizar' : 'Criar'"
      @click="onFormSubmit"
    />
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { schemaCreateUser, schemaUpdateUser } from '@/utils/validations'
import services from '@/api/index'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import MultiSelect from 'primevue/multiselect'
import { User } from '@/@types/user'
import { useToast } from 'primevue/usetoast'
import { CompanyProtocol } from '@/@types/company'

const props = defineProps(['user'])
const emits = defineEmits(['Close'])
const schema = !props.user.id ? schemaCreateUser : schemaUpdateUser

const { defineComponentBinds, handleSubmit, errors, setFieldValue, resetForm } =
  useForm({
    validationSchema: toTypedSchema(schema)
  })

const toast = useToast()

const loading = ref<string | null>(null)
const options_company = ref<any>(null)
const options_position = ref<any>(null)

const name = defineComponentBinds('name')
const email = defineComponentBinds('email')
const password = defineComponentBinds('password')
const password_confirmation = defineComponentBinds('password_confirmation')
const empresas = defineComponentBinds('empresas')
const positions = defineComponentBinds('cargos')

const onFormSubmit = handleSubmit(async (values) => {
  try {
    if (!props.user.id) {
      loading.value = 'user'
      await services.User.createUser(values as unknown as User)
    } else {
      await services.User.updateUser(values as Partial<User>)
    }

    await Promise.all(
      values.cargos?.map(async (cargo_id) => {
        await services.Position.vincularPositionInUser(
          {
            users: [props.user.id]
          },
          cargo_id
        )
      }) ?? []
    )

    toast.add({
      severity: 'success',
      summary: !props.user.id
        ? 'Usuário criado com sucesso!'
        : 'Usuário atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
    emits('Close')
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: !props.user.id
        ? 'Erro ao criar usuário'
        : 'Erro ao atualizar usuário',
      detail: (err as Error).message,
      life: 3000
    })
  } finally {
    loading.value = null
  }
})

const receiveOptions = async () => {
  try {
    loading.value = 'option'
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
    loading.value = null
  }
}

onBeforeUnmount(() => {
  resetForm()
})

onMounted(() => {
  receiveOptions()
  if (props.user.id) {
    setFieldValue('id', props.user.id)
    setFieldValue('name', props.user.name)
    setFieldValue('email', props.user.email)
    setFieldValue(
      'empresas',
      props.user.empresas.map((empresa: CompanyProtocol) => empresa.id)
    )
    setFieldValue(
      'cargos',
      props.user.cargos.map((cargo: any) => cargo.id)
    )
  }
})
</script>
<style scoped>
form.user {
  @apply flex flex-col gap-4 mt-1;
}
form.user .container-input {
  @apply flex flex-col w-full;
}
</style>
