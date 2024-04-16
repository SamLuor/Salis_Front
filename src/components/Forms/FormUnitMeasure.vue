<script setup lang="ts">
import services from '@/api'
import type { UnitMeasure, ErrorsUnitMeasure } from '@/@types/unit_measure'
import { onMounted, ref } from 'vue'
import InputTextBase from './components/InputTextBase.vue'
import DropdownBase from './components/DropdownBase.vue'
import MultiSelectBase from './components/MultiSelectBase.vue'
import { useToast } from 'primevue/usetoast'
import useOptionsStore from '@/store/options'
import { validityForm } from '@/utils/helpers'
import { schemaUnitMeasure } from '@/utils/validations'

interface Props {
  unit_measure?: UnitMeasure
  type?: 'servico' | 'material'
}

const props = defineProps<Props>()
const toast = useToast()
const storeOptions = useOptionsStore()
const optionsTypes = [
  { text: 'Serviço', value: 'servico' },
  { text: 'Material', value: 'material' }
]

const form = ref<UnitMeasure>({} as UnitMeasure)

const errors = ref<ErrorsUnitMeasure>({} as ErrorsUnitMeasure)
const loadingCreate = ref<boolean>(false)

const onFormSubmit = async (values: UnitMeasure) => {
  errors.value = validityForm(schemaUnitMeasure, values)
  if (Object.keys(errors.value).length) return

  try {
    loadingCreate.value = true
    await services.UnitMeasure.createUnitMeasure(values)
    toast.add({
      severity: 'success',
      summary: 'Cadastrado com sucesso',
      detail: 'Unidade medida cadastrada com sucesso'
    })
    closeAction()
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao criar unidade de medida',
      detail: (err as Error).message
    })
  } finally {
    loadingCreate.value = false
  }
}

const emit = defineEmits(['close'])

const closeAction = () => {
  emit('close')
  form.value = {} as UnitMeasure
}

onMounted(async () => {
  await services.Option.getCompanies()
  if (props.type) form.value = { ...form.value, tipo: props.type }
  if (props?.unit_measure?.id) form.value = props?.unit_measure
})
</script>

<template>
  <form class="form">
    <InputTextBase
      v-model="form.nome"
      name="nome"
      label="Nome"
      helper="Digite o nome da unidade."
      :required="true"
      :invalid="!!errors?.nome"
      :error="errors?.nome?.message"
    />
    <DropdownBase
      v-model="form.tipo"
      name="tipo"
      label="Tipo"
      helper="Selecione o tipo da unidade."
      :required="true"
      :invalid="!!errors?.tipo"
      :error="errors?.tipo?.message"
      :input-props="{
        options: optionsTypes,
        optionLabel: 'text',
        optionValue: 'value',
        disabled: !!type
      }"
    />
    <MultiSelectBase
      v-model="form.empresas"
      name="empresas"
      label="Empresas"
      helper="Selecione a ou as empresas que terão acesso a essa unidade de medida."
      :required="true"
      :invalid="!!errors?.empresas"
      :error="errors?.empresas?.message"
      :input-props="{
        options: storeOptions.empresa,
        optionLabel: 'text',
        optionValue: 'value'
      }"
    />
    <div class="flex gap-2 actions-form">
      <Button text label="Cancelar" type="button" @click="closeAction" />
      <Button label="Confirmar" type="button" @click="onFormSubmit(form)" />
    </div>
  </form>
</template>

<style scoped>
.form {
  @apply flex flex-col gap-6;
}
.actions-form {
  @apply flex justify-end;
}
</style>
