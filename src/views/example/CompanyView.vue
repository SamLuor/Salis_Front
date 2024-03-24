<template>
  <div class="grid">
    <div class="w-full pl-2">
      <div class="card bg-transparent">
        <h5 class="header-page">
          Empresas
          <Button
            class="action"
            icon="pi pi-plus"
            label="Criar Usuário"
            @click="createCompany"
          />
        </h5>
        <div class="px-4">
          <DataTable
            :value="companyStore.companies"
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
              <template #body="{ data }: { data: CompanyProtocol }">
                <div>{{ data?.nome_fantasia }} - {{ data?.sigla }}</div>
              </template></Column
            >
            <Column field="email" header="Email" style="min-width: 12rem" />
            <Column field="cnpj" header="CNPJ" style="min-width: 12rem" />
            <Column header="Ações" style="min-width: 70px; max-width: 70px">
              <template #body="{ data }: { data: CompanyProtocol }">
                <div class="flex items-center" style="justify-content: center">
                  <Button
                    class="action-table"
                    icon="pi pi-pencil"
                    @click="showCompany(data)"
                  />
                  <Button
                    class="action-table"
                    icon="pi pi-trash text-red-500"
                    @click="deleteUser({ message: data.nome_fantasia, data })"
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
import useCompanyStore from '@/store/company'
import { CompanyProtocol } from '@/@types/company'
import router from '@/router'

const companyStore = useCompanyStore()
const loading = ref<boolean>(true)
const confirm = useConfirm()
const toastStore = useToastRef()

const showCompany = (data: CompanyProtocol) => {
  router.push({ name: 'company-show', params: { id: data.id } })
}

const createCompany = () => {
  router.push({ name: 'company-form' })
}

const deleteUser = ({
  data,
  message
}: {
  message: string
  data: CompanyProtocol
}) => {
  confirm.require({
    group: 'delete',
    header: 'Deseja apagar essa empresa?',
    message: message,
    accept: async () => {
      try {
        await services.Company.deleteCompany(data)
        toastStore.toast?.add({
          severity: 'success',
          summary: 'Apagada com sucesso',
          detail: 'A Empresa foi apagada!',
          life: 3000
        })
      } catch (err) {
        toastStore.toast?.add({
          severity: 'error',
          summary: 'Houve um erro, empresa não apagada',
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
    await services.Company.getCompanies()
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
