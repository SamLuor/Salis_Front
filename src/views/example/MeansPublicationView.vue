<template>
  <div class="grid">
    <div class="w-full pl-2">
      <div class="card bg-transparent">
        <h5 class="header-page">
          Meios de Publicação
          <Button
            class="action"
            icon="pi pi-plus"
            label="Criar Meio de Publicação"
            @click="createMeanPublication"
          />
        </h5>
        <div class="px-4">
          <DataTable
            :value="meansStore.means"
            :paginator="true"
            :rows="10"
            data-key="id"
            :loading="loading"
            scrollable
            show-gridlines
            responsive-layout="scroll"
            class="no-filter"
            scroll-height="550px"
            :global-filter-fields="['name', 'email', 'status']"
          >
            <template #empty> Nenhum Meio de publicação encontrado. </template>
            <template #loading>
              Carregando dados dos meios de publicação. Por favor aguarde...
            </template>
            <Column field="nome" header="Nome" style="min-width: 12rem" />
            <Column field="empresas" header="Empresas" style="min-width: 12rem">
              <template #body="{ data }: { data: MeansPublicationData }">
                {{
                  data?.empresas
                    ?.map((company) => company.razao_social)
                    ?.join('-')
                }}
              </template>
            </Column>
            <Column header="Ações" style="min-width: 70px; max-width: 70px">
              <template #body="{ data }: { data: MeansPublicationProtocol }">
                <div class="flex items-center" style="justify-content: center">
                  <Button
                    class="action-table"
                    icon="pi pi-pencil"
                    @click="showMeanPublication(data)"
                  />
                  <Button
                    class="action-table"
                    icon="pi pi-trash text-red-500"
                    @click="deleteClient({ message: data.nome, data })"
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
import useMeansPublicationStore from '@/store/means_publication'
import type {
  MeansPublicationProtocol,
  MeansPublicationData
} from '@/@types/means_publication'

const meansStore = useMeansPublicationStore()
const loading = ref<boolean>(true)
const confirm = useConfirm()
const toastStore = useToastRef()

const showMeanPublication = (data: MeansPublicationProtocol) => {
  router.push({ name: 'means-publication-show', params: { id: data.id } })
}

const createMeanPublication = () => {
  router.push({ name: 'means-publication-form' })
}

const deleteClient = ({
  data,
  message
}: {
  message: string
  data: MeansPublicationProtocol
}) => {
  confirm.require({
    group: 'delete',
    header: 'Deseja apagar esse meio de publicação?',
    message: message,
    accept: async () => {
      try {
        await services.MeansPublication.deleteMeansPublication(data)
        toastStore.toast?.add({
          severity: 'success',
          summary: 'Apagada com sucesso',
          detail: 'O Meio de publicação foi apagado!',
          life: 3000
        })
      } catch (err) {
        toastStore.toast?.add({
          severity: 'error',
          summary: 'Houve um erro, meio de publicação não apagado',
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
    await services.MeansPublication.getMeansPublications()
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
