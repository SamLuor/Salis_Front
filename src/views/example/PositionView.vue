<template>
  <div class="grid">
    <div class="w-full pl-2">
      <div class="card bg-transparent">
        <h5 class="header-page">
          <div class="flex gap-3" style="align-items: center">
            <i class="fa-solid fa-briefcase icon-header" />
            Cargos
          </div>
          <Button
            class="action"
            icon="pi pi-plus"
            label="Criar Cargo"
            @click="createPosition"
          />
        </h5>
        <div class="px-4">
          <DataTable
            :value="positions"
            :paginator="true"
            :rows="10"
            data-key="id"
            :loading="loading"
            scrollable
            show-gridlines
            class="no-filter"
            responsive-layout="scroll"
            scroll-height="550px"
            :global-filter-fields="['name', 'email', 'status']"
          >
            <template #empty> Nenhum Cargo encontrado. </template>
            <template #loading>
              Carregando dados dos cargps. Por favor aguarde...
            </template>
            <Column field="nome" header="Cargo" style="min-width: 12rem" />
            <Column
              header="Ações"
              style="min-width: 50px; width: 200px; max-width: 200px"
            >
              <template #body="{ data }">
                <div class="flex items-center" style="justify-content: center">
                  <Button
                    class="action-table"
                    icon="pi pi-pencil"
                    @click="showPosition(data)"
                  />
                  <Button
                    class="action-table"
                    icon="pi pi-trash text-red-500"
                    @click="deletePosition({ message: data.nome, data })"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <ConfirmDialogBase
    class="confirm-delete"
    group="delete"
    icon="pi pi-trash"
    color-classes="bg-red-500 text-white"
  />
</template>

<script setup lang="ts">
import services from '@/api'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialogBase from '@/components/ConfirmDialogBase.vue'
import { useToastRef } from '@/store/features'
import router from '@/router'

const positions = ref([])
const loading = ref<boolean>(true)
const confirm = useConfirm()
const toastStore = useToastRef()

const showPosition = (data) => {
  router.push({ name: 'position-show', params: { id: data.id } })
}

const createPosition = () => {
  router.push({ name: 'position-form' })
}

const home = ref({
  icon: 'pi pi-home'
})

const items = ref([
  { label: 'Electronics' },
  { label: 'Computer' },
  { label: 'Accessories' },
  { label: 'Keyboard' },
  { label: 'Wireless' }
])

const deletePosition = ({ data, message }: { message: string; data: any }) => {
  confirm.require({
    group: 'delete',
    header: 'Deseja apagar esse cargo?',
    message: message.toUpperCase(),
    accept: async () => {
      try {
        await services.Position.deletePosition(data)
        toastStore.toast?.add({
          severity: 'success',
          summary: 'Apagado com sucesso',
          detail: 'O Cargo foi apagado!',
          life: 3000
        })
      } catch (err) {
        toastStore.toast?.add({
          severity: 'error',
          summary: 'Houve um erro, cargo não apagado',
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

async function receivePositions() {
  try {
    loading.value = true
    const response = await services.Position.getPositions()
    positions.value = response.data
  } catch (err) {
    toastStore.toast?.add({
      severity: 'error',
      summary: 'Houve um erro, cargos não listados',
      detail: (err as Error).message,
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await receivePositions()
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
    @apply flex justify-between items-center dark:text-secondary-500;
  }
  .icon-header {
    @apply dark:text-secondary-500;
  }
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
