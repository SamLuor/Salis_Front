<template>
  <form class="formProductItem" @submit.prevent="onFormSubmit(form)">
    <DropdownBase
      v-model="form.produto_id"
      label="Produto"
      helper="Selecione um produto existente ou crie um"
      :required="true"
      :invalid="false"
      :error="errors?.produto_id?.message || errors?.nome?.message"
      :input-props="{
        options: optionsProdutos,
        optionLabel: 'text',
        optionValue: 'value',
        editable: true,
        loading: loadingSearch,
        inputProps: {
          onKeyup(payload) {
            handleInputSearch((payload.target as HTMLInputElement).value)
          }
        }
      }"
    />
    <InputTextBase
      v-model="form.descricao_simplificada"
      label="Descrição Simplificada"
      helper="Descreva de forma simplificada o item do produto"
      :required="true"
      :invalid="false"
      :error="errors?.descricao_simplificada?.message"
    />
    <TextareaBase
      v-model="form.descricao_completa"
      :invalid="false"
      :required="true"
      :error="errors?.descricao_completa?.message"
      helper="Descreva de forma completa o item do produto"
      label="Descrição Completa"
      :input-props="{ style: { resize: 'none' } }"
    />
    <div class="unit-measure">
      <DropdownBase
        v-model="form.unidade_medida_id"
        label="Unidade Medida"
        class="w-full"
        :invalid="false"
        :required="true"
        helper="Selecione a unidade medida correta"
        :error="errors?.unidade_medida_id?.message"
        :input-props="{
          options: storeOptions.unidades_medidas,
          optionLabel: 'text',
          optionValue: 'value',
          loading: false
        }"
      />
      <Button
        v-tooltip.left="'Criar unidade de medida'"
        icon="pi pi-plus"
        @click="() => (visible = true)"
      />
    </div>
    <div class="container-actions">
      <Button label="Voltar" text @click="emit('eventBack', 0)" />
      <Button label="Criar e Selecionar" type="submit" />
    </div>
  </form>
  <Dialog
    v-model:visible="visible"
    header="Criar Unidade Medida"
    modal
    :draggable="false"
    style="min-width: 500px"
    content-style="min-width: 400px"
  >
    <FormUnitMeasure :type="typeMeasure" @close="() => (visible = false)" />
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import useOptionsStore from '@/store/options'

import services from '@/api'
import { ProductItem } from '@/utils/constants'
import { validityForm } from '@/utils/helpers'

import InputTextBase from '@/components/Forms/components/InputTextBase.vue'
import TextareaBase from '@/components/Forms/components/TextareaBase.vue'
import DropdownBase from '@/components/Forms/components/DropdownBase.vue'

import { schemaProductItem } from '@/utils/validations'

import type {
  ProductItemPayload,
  ErrorProductItemPayload
} from '@/@types/products'
import FormUnitMeasure from './FormUnitMeasure.vue'

interface Props {
  typeMeasure: 'servico' | 'material'
}

const props = defineProps<Props>()

const toast = useToast()
const storeOptions = useOptionsStore()
const emit = defineEmits(['eventBack', 'eventCreate', 'eventClose'])

const loadingSearch = ref<boolean>(false)
const loadingCreate = ref<boolean>(false)
const visible = ref<boolean>(false)

const form = ref<ProductItemPayload>({ ...ProductItem })
const errors = ref<ErrorProductItemPayload>({} as ErrorProductItemPayload)

interface Options {
  text: string
  value: string
}

const optionsProdutos = ref<Options[]>([])
const optionsUnidades = ref<Options[]>([])

let searchTimeout: NodeJS.Timeout | null = null // Variável para armazenar o timeout

const handleInputSearch = async (query: string) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
    searchTimeout = null
  }

  searchTimeout = setTimeout(async () => {
    await searchProducts(query)
  }, 500)
}

const searchProducts = async (query: string) => {
  loadingSearch.value = true
  try {
    const response = await services.Products.getProducts({ nome: query })
    optionsProdutos.value = response.data.map((product) => ({
      text: product.nome,
      value: product.id
    }))
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Erro ao procurar produto'
    })
  } finally {
    loadingSearch.value = false
  }
}

const populateOptions = async () => {
  loadingSearch.value = true
  try {
    const response = await services.Option.getUnitMeasure(props.typeMeasure)
    optionsUnidades.value = response.data
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Error receber opções de unidades medidas'
    })
  } finally {
    loadingSearch.value = false
  }
}

const onFormSubmit = async (data: ProductItemPayload) => {
  loadingCreate.value = true

  const body: ProductItemPayload = JSON.parse(JSON.stringify(data))

  const errorsValidity = validityForm(schemaProductItem, body) as unknown
  errors.value = errorsValidity as ErrorProductItemPayload

  if (Object.keys(errors.value).length) return

  const product = optionsProdutos.value?.find(
    (option) => option.text === body.produto_id
  )

  if (!product) {
    body.produto_nome = body.produto_id
    delete body.produto_id
  }

  try {
    const response = await services.Products.createProductItem(body)
    emit('eventCreate', response.data)
    emit('eventClose')
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: (err as Error).message,
      detail: 'Error ao criar item de produto'
    })
  } finally {
    loadingCreate.value = false
  }
}

onMounted(() => {
  populateOptions()
})

onUnmounted(() => {
  form.value = ProductItem
})
</script>

<style>
.formProductItem {
  @apply flex flex-col gap-6 bg-transparent p-0 pr-2 overflow-y-scroll max-h-[400px] relative pb-2 !important;
}
.p-dialog-content {
  @apply rounded-b-lg !important;
}
</style>

<style scoped lang="scss">
.container-actions {
  @apply flex justify-end gap-2 w-full pb-8 pt-4 px-6 bg-background-light-white70 fixed bottom-0 left-0;
}
div.unit-measure {
  @apply flex gap-2 items-center;
}
</style>
