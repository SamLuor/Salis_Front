<template>
  <div class="grid">
    <div class="w-full pl-2">
      <div class="card bg-transparent">
        <h5 class="header-page">
          Setores Produto
          <Button
            class="action"
            icon="pi pi-plus"
            label="Criar Setor"
            @click="visible = true"
          />
        </h5>
        <div class="px-4">
          <div class="container-filter" style="justify-content: flex-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Digite um setor"
              />
            </span>
          </div>
          <DataTable
            v-model:filters="filters"
            :value="setorStore.setorProdutos"
            :paginator="true"
            :rows="10"
            data-key="id"
            :loading="loading"
            scrollable
            show-gridlines
            responsive-layout="scroll"
            scroll-height="550px"
            :global-filter-fields="['name', 'email', 'empresas']"
          >
            <template #empty> Nenhum Usuário encontrado. </template>
            <template #loading>
              Carregando dados dos usuários. Por favor aguarde...
            </template>
            <Column field="nome" header="Setor" style="min-width: 12rem" />
            <Column field="empresas" header="Empresas" style="min-width: 12rem">
              <template #body="{ data }">
                {{
                  data?.empresas
                    .map((item: CompanyProtocol) => {
                      return `${item.razao_social} - ${item.sigla}`
                    })
                    .join(', ')
                }}
              </template></Column
            >
            <Column header="Ações" style="min-width: 100px; max-width: 100px">
              <template #body="{ data }: { data: SetorProduto }">
                <div class="flex items-center" style="justify-content: center">
                  <Button
                    class="action-table"
                    icon="pi pi-pencil"
                    @click="showUser(data)"
                  />
                  <Button
                    class="action-table"
                    icon="pi pi-trash text-red-500"
                    @click="deleteUser({ message: data.nome, data })"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    header="Header"
    class="dialog-base"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="
      () => {
        setor = {} as SetorProduto
      }
    "
  >
    <template #header>
      <h4 v-if="setor.id">Editar Setor</h4>
      <h4 v-else>Criar Setor</h4>
    </template>
    <FormSetorProduto :setor="setor" @close="visible = false" />
  </Dialog>
  <ConfirmDialogBase
    class="confirm-delete"
    group="delete"
    icon="pi pi-trash"
    color-classes="bg-red-500 text-white"
  />
</template>

<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api'
import type { User } from '@/@types/user'
import services from '@/api'
import InputText from 'primevue/inputtext'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialogBase from '@/components/ConfirmDialogBase.vue'
import { useToastRef } from '@/store/features'
import Dialog from 'primevue/dialog'
import FormSetorProduto from './FormSetorProduto.vue'
import { CompanyProtocol } from '@/@types/company'
import useSetorProdutoStore from '@/store/setor_produto'
import { SetorProduto } from '@/@types/setor_produto'

const setorStore = useSetorProdutoStore()
const loading = ref<boolean>(true)
const filters = ref({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  empresas: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const confirm = useConfirm()
const visible = ref<boolean>(false)
const toastStore = useToastRef()
const setor = ref<SetorProduto>({} as SetorProduto)

const showUser = (data: SetorProduto) => {
  setor.value = data
  visible.value = true
}

const deleteUser = ({
  data,
  message
}: {
  message: string
  data: SetorProduto
}) => {
  confirm.require({
    group: 'delete',
    header: 'Deseja apagar esse setor?',
    message: message,
    accept: async () => {
      try {
        await services.SetorProduct.deleteSetorProduto(data)
        toastStore.toast?.add({
          severity: 'success',
          summary: 'Apagado com sucesso',
          detail: 'Setor foi apagado!',
          life: 3000
        })
      } catch (err) {
        toastStore.toast?.add({
          severity: 'error',
          summary: 'Houve um erro, setor não apagado',
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

onMounted(async () => {
  try {
    loading.value = true
    await services.SetorProduct.getSetorProdutos()
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/demo/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

.card {
  @apply rounded-none;

  .header-page {
    @apply flex justify-between items-center dark:text-dark-white70;
  }
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
