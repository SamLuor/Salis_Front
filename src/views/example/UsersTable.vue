<template>
  <div class="grid">
    <div class="w-full pl-2">
      <div class="card bg-transparent">
        <h5 class="header-page">
          Usuários
          <Button
            class="action"
            icon="pi pi-plus"
            label="Criar Usuário"
            @click="visible = true"
          />
        </h5>
        <div class="px-4">
          <div class="container-filter" style="justify-content: flex-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Digite uma empresa"
              />
            </span>
          </div>
          <DataTable
            :value="userStore.users"
            :paginator="true"
            :rows="10"
            data-key="id"
            :loading="loading"
            scrollable
            show-gridlines
            responsive-layout="scroll"
            scroll-height="550px"
            :global-filter-fields="['name', 'email', 'status']"
          >
            <template #empty> Nenhum Usuário encontrado. </template>
            <template #loading>
              Carregando dados dos usuários. Por favor aguarde...
            </template>
            <Column field="name" header="Usuário" style="min-width: 12rem" />
            <Column field="email" header="Email" style="min-width: 12rem" />
            <Column field="empresas" header="Empresas" style="min-width: 12rem">
              <template #body="{ data }">
                {{
                  data.empresas
                    .map((item: CompanyProtocol) => {
                      return `${item.razao_social} - ${item.sigla}`
                    })
                    .join(', ')
                }}
              </template></Column
            >
            <Column header="Ações" style="min-width: 100px; max-width: 100px">
              <template #body="{ data }: { data: User }">
                <div class="flex items-center" style="justify-content: center">
                  <Button
                    class="action-table"
                    icon="pi pi-pencil"
                    @click="showUser(data)"
                  />
                  <Button
                    class="action-table"
                    icon="pi pi-trash text-red-500"
                    @click="deleteUser({ message: data.name, data })"
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
        user = {} as User
      }
    "
  >
    <template #header>
      <h4 v-if="user.id">Editar Usuário</h4>
      <h4 v-else>Criar Usuário</h4>
    </template>
    <FormUser :user="user" @close="visible = false" />
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
import useUserStore from '@/store/users'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialogBase from '@/components/ConfirmDialogBase.vue'
import { useToastRef } from '@/store/features'
import Dialog from 'primevue/dialog'
import FormUser from './FormUser.vue'
import { useAuthStore } from '@/store/auth'
import { CompanyProtocol } from '@/@types/company'

const userStore = useUserStore()
const loading = ref<boolean>(true)
const status = ['Ativo', 'Desativado']
const filters = ref({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
})
const confirm = useConfirm()
const visible = ref<boolean>(false)
const toastStore = useToastRef()
const user = ref<User>({} as User)

const showUser = (data: User) => {
  user.value = data
  visible.value = true
}

console.log(useAuthStore().user)

const deleteUser = ({ data, message }: { message: string; data: User }) => {
  confirm.require({
    group: 'delete',
    header: 'Deseja apagar esse usuário?',
    message: message,
    accept: async () => {
      try {
        await services.User.deleteUser(data)
        toastStore.toast?.add({
          severity: 'success',
          summary: 'Apagado com sucesso',
          detail: 'Usuário foi apagado!',
          life: 3000
        })
      } catch (err) {
        toastStore.toast?.add({
          severity: 'error',
          summary: 'Houve um erro, usuário não apagado',
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
    await services.User.getUsers()
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
