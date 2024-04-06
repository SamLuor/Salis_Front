<template>
  <form class="user" @submit.prevent>
    <div
      v-if="errors.id && props.setor.id"
      class="bg-red-400 text-dark-white70 text-center p-3 font-semibold"
      style="border-radius: 10px"
    >
      {{ errors.id }}
    </div>
    <div class="container-input">
      <span class="p-input-icon-left">
        <i class="pi pi-user" />
        <InputText
          v-bind="nome"
          placeholder="Nome do Setor"
          :class="['w-full', { 'p-invalid': errors.nome }]"
        />
      </span>
      <small id="text-error" class="p-error">{{
        errors.nome || '&nbsp;'
      }}</small>
    </div>
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
    <Button
      :disabled="loading == 'setor'"
      icon-pos="right"
      :icon="loading === 'setor' ? 'fa-solid fa-spinner fa-spin' : ''"
      :label="props.setor.id ? 'Atualizar' : 'Criar'"
      @click="onFormSubmit"
    />
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { schemaSetorProduto } from '@/utils/validations'
import services from '@/api/index'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import MultiSelect from 'primevue/multiselect'
import { useToast } from 'primevue/usetoast'
import { CompanyProtocol } from '@/@types/company'

const props = defineProps(['setor'])
const emits = defineEmits(['Close'])
const schema = schemaSetorProduto

const { defineComponentBinds, handleSubmit, errors, setFieldValue, resetForm } =
  useForm({
    validationSchema: toTypedSchema(schema)
  })

const toast = useToast()

const loading = ref<string | null>(null)
const options_company = ref<any>(null)

const nome = defineComponentBinds('nome')
const empresas = defineComponentBinds('empresas')

const onFormSubmit = handleSubmit(async (values) => {
  try {
    if (!props.setor.id) {
      loading.value = 'setor'
      await services.SetorProduct.createSetorProduto(values)
    } else {
      await services.SetorProduct.updateSetorProduto(values, props.setor.id)
    }

    toast.add({
      severity: 'success',
      summary: !props.setor.id
        ? 'setor criado com sucesso!'
        : 'setor atualizado com sucesso!',
      detail: 'Dados salvos com sucesso.',
      life: 3000
    })
    emits('Close')
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: !props.setor.id
        ? 'Erro ao criar setor'
        : 'Erro ao atualizar setor',
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
  if (props.setor.id) {
    setFieldValue('id', props.setor.id)
    setFieldValue('nome', props.setor.nome)
    setFieldValue(
      'empresas',
      props.setor.empresas.map((empresa: CompanyProtocol) => empresa.id)
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
