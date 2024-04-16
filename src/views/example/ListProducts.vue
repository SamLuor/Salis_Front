<template>
  <div class="view-content">
    <DataTable
      v-model:filters="filters"
      :value="listProductsItem"
      row-group-mode="subheader"
      group-rows-by="grupo"
      sort-mode="single"
      :sort-order="1"
      scrollable
      scroll-height="48.4vh"
      :global-filter-fields="['numero', 'grupo']"
    >
      <template #header>
        <div class="flex justify-content-between">
          <div>
            <h5 class="font-semibold text-lg mb-2">
              <i class="pi pi-list" />
              Lista de produtos cadastrados
            </h5>
            <p class="font-normal text-gray-700" style="max-width: 480px">
              Gerenciador de produtos cadastrados, aqui pode ser feito
              atualização do valor de cada item e a exclusão dos itens.
            </p>
          </div>
          <span class="input-icon">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Procurar"
            />
          </span>
        </div>
      </template>
      <Column field="numero" header="Número" body-class="text-center" />
      <Column
        field="descricao"
        header="Descrição Simplificada"
        body-class="text-center"
      />
      <Column
        field="unidade_medida"
        header="Unidade Medida"
        body-class="text-center"
      />
      <Column field="quantidade" header="Quantidade" body-class="text-center" />
      <Column
        field=""
        header="Ações"
        body-class="text-center"
        style="width: 300px; max-width: 300px !important"
      >
        <template #body="{ data }: { data: BaseItemProtocol }">
          <span
            class="flex justify-around gap-1"
            style="justify-content: center"
          >
            <InputNumber
              v-model="data.valor"
              :input-style="{ width: '130px' }"
              placeholder="Valor"
              mode="currency"
              currency="BRL"
              locale="pt-BR"
            />
            <Button
              v-tooltip.top="'Salvar valor'"
              icon="pi pi-check"
              severity="success"
              @click="submitValue(data.id, data.valor)"
            />
            <Button
              v-tooltip.top="'Apagar item'"
              icon="pi pi-trash"
              severity="danger"
              @click="deleteItem({ message: data.numero, data: data })"
            />
          </span>
        </template>
      </Column>
      <Column
        header="fix error colspan subheader group"
        body-class="text-center"
        style="display: none"
      />
      <template #groupheader="slotProps">
        <div class="flex align-items-center gap-1">
          <span v-if="!isNaN(slotProps.data.grupo)" class="font-semibold"
            >Grupo: N°
            <span class="font-normal">{{ slotProps.data.grupo }}</span>
          </span>
          <span v-else class="font-semibold">{{ slotProps.data.grupo }}</span>
        </div>
      </template>
      <template #empty>
        <div
          style="height: 53.5vh; display: grid; place-items: center"
          class="font-semibold text-gray-800"
        >
          Nenhum item cadastrado!
        </div>
      </template>
    </DataTable>
  </div>
  <ConfirmDialogBase
    class="confirm-delete"
    group="delete"
    icon="pi pi-trash"
    color-classes="bg-red-500 text-white"
  />
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

import useProcessStore from '@/store/process'
import services from '@/api'

import type { BaseItemProtocol } from '@/@types/process'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialogBase from '@/components/ConfirmDialogBase.vue'
import { FilterMatchMode } from 'primevue/api'
import { TermReferenceProtocol } from '@/@types/term_reference'

const storeProcess = useProcessStore()
const toast = useToast()
const confirm = useConfirm()

const listProductsItem = ref<any[]>([])
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const submitValue = async (id: string, value: number) => {
  if (!id) return
  if (isNaN(value)) return
  try {
    await services.Products.updateValueProductItem(id, value)
    toast.add({
      severity: 'success',
      summary: 'Valor do item atualizado com sucesso!',
      detail: 'O valor do item que foi alterado foi salvo.'
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao atualizar valor do item',
      detail: (err as Error).message
    })
  }
}

const deleteItem = ({
  data,
  message
}: {
  message: string
  data: BaseItemProtocol
}) => {
  confirm.require({
    group: 'delete',
    header: 'Deseja apagar esse item?',
    message: message,
    accept: async () => {
      try {
        await services.Products.deleteProductItemListed(data.id)
        listProductsItem.value = listProductsItem.value.filter(
          (item) => item.id !== data.id
        )
        toast.add({
          severity: 'success',
          summary: 'Apagado com sucesso',
          detail: 'O item foi apagado!',
          life: 3000
        })
      } catch (err) {
        toast.add({
          severity: 'error',
          summary: 'Houve um erro, item não apagado',
          detail: (err as Error).message,
          life: 3000
        })
      }
    },
    reject: () => {
      // Sem lógica por enquanto
    }
  })
}

const separateGroupItens = (data: TermReferenceProtocol) => {
  data.grupos.forEach((group) => {
    group.itens.forEach((item) => {
      listProductsItem.value.push({
        id: item.id,
        grupo: group.numero,
        numero: item.numero,
        descricao: item.produto_item.descricao_simplificada.toUpperCase(),
        descricao_completa: item.produto_item.descricao_completa.toUpperCase(),
        unidade_medida: item.produto_item.unidade_medida.nome.toUpperCase(),
        quantidade: item.quantidade,
        valor: item.valor
      })
    })
  })
  data.itens.forEach((item) => {
    listProductsItem.value.push({
      id: item.id,
      grupo: 'Itens',
      numero: item.numero,
      descricao: item.produto_item.descricao_simplificada.toUpperCase(),
      descricao_completa: item.produto_item.descricao_completa.toUpperCase(),
      unidade_medida: item.produto_item.unidade_medida.nome.toUpperCase(),
      quantidade: item.quantidade,
      valor: item.valor
    })
  })
}

onMounted(async () => {
  if (storeProcess.term_reference?.id) {
    const response = await services.Products.getListProductsItens(
      storeProcess.term_reference.id
    )
    separateGroupItens(response.data)
  } else
    toast.add({
      severity: 'error',
      summary: 'Termo de referencia não foi criado',
      detail: 'Sem o termo de referencia não é possível criar/visualizar itens.'
    })
})
</script>

<style scoped>
.view-content {
  @apply h-[60vh] border-[1px] border-solid rounded-md border-gray-300 overflow-hidden;
}
.input-icon {
  @apply flex items-center relative;
}
.input-icon input.p-inputtext {
  @apply pl-10 !important;
}
.input-icon i {
  @apply absolute left-4;
}
</style>
