<template>
  <div class="grid">
    <div class="w-full pl-2">
      <div class="card bg-transparent">
        <h5 class="header-page">
          Publicações
          <Button
            class="action"
            icon="pi pi-plus"
            label="Criar Publicação"
            @click="createPublication"
          />
        </h5>
        <div class="px-4">
          <DataTable
            :value="clientStore.clients"
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
            <template #empty> Nenhum Usuário encontrado. </template>
            <template #loading>
              Carregando dados dos usuários. Por favor aguarde...
            </template>
            <Column
              field="nome_fantasia"
              header="Empresa"
              style="min-width: 12rem"
            >
              <template #body="{ data }: { data: ClientProtocol }">
                <div>{{ data.nome_fantasia }} - {{ data.sigla }}</div>
              </template></Column
            >
            <Column field="email" header="Email" style="min-width: 12rem" />
            <Column field="cnpj" header="CNPJ" style="min-width: 12rem" />
            <Column header="Ações" style="min-width: 70px; max-width: 70px">
              <template #body="{ data }: { data: ClientProtocol }">
                <div class="flex items-center" style="justify-content: center">
                  <Button
                    class="action-table"
                    icon="pi pi-pencil"
                    @click="showClient(data)"
                  />
                  <Button
                    class="action-table"
                    icon="pi pi-trash text-red-500"
                    @click="deleteClient({ message: data.nome_fantasia, data })"
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
import useClientStore from '@/store/clients'
import { ClientProtocol } from '@/@types/client'
import { PublicationProtocol } from '@/@types/publication'

const clientStore = useClientStore()
const loading = ref<boolean>(true)
const confirm = useConfirm()
const toastStore = useToastRef()

const showClient = (data: PublicationProtocol) => {
  router.push({ name: 'publication-show', params: { id: data.id } })
}

const createPublication = () => {
  router.push({ name: 'publication-form' })
}

const deleteClient = ({
  data,
  message
}: {
  message: string
  data: ClientProtocol
}) => {
  confirm.require({
    group: 'delete',
    header: 'Deseja apagar essa Publicação?',
    message: message,
    accept: async () => {
      try {
        await services.Clients.deleteClient(data)
        toastStore.toast?.add({
          severity: 'success',
          summary: 'Apagada com sucesso',
          detail: 'A Publicação foi apagada!',
          life: 3000
        })
      } catch (err) {
        toastStore.toast?.add({
          severity: 'error',
          summary: 'Houve um erro, Publicação não apagada',
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
    await services.Publication.getPublications()
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
