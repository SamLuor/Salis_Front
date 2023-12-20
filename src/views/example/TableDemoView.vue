<template>
  <div class="grid">
    <div class="w-full pl-2">
      <div class="card">
        <h5 class="header-page">
          Usuários
          <Button class="action" icon="pi pi-plus" label="Criar Usuário" />
        </h5>
        <div class="px-4">
          <div class="container-filter">
            <InputText placeholder="Digite um Usuário" />
            <InputText placeholder="Digite uma empresa" />
            <Dropdown
              v-model="filters['status']"
              style="width: 150px"
              :options="status"
            />
          </div>
          <DataTable
            :value="customer1"
            :paginator="true"
            :rows="10"
            data-key="id"
            :row-hover="true"
            :loading="loading1"
            scrollable
            responsive-layout="scroll"
            scroll-height="550px"
            :global-filter-fields="[
              'name',
              'country.name',
              'representative.name',
              'status'
            ]"
          >
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column field="name" header="Usuário" style="min-width: 12rem">
              <template #body="{ data }">
                {{ data.name }}
              </template>
            </Column>
            <Column
              header="Country"
              filter-field="country.name"
              style="min-width: 12rem"
            >
              <template #body="{ data }">
                <span style="vertical-align: middle" class="image-text">{{
                  data.country.name
                }}</span>
              </template>
            </Column>
            <Column
              header="Agent"
              filter-field="representative"
              :show-filter-match-modes="false"
              :filter-menu-style="{ width: '14rem' }"
              style="min-width: 14rem"
            >
              <template #body="{ data }">
                <img
                  :alt="data.representative.name"
                  :src="'images/avatar/' + data.representative.image"
                  width="32"
                  style="vertical-align: middle"
                />
                <span
                  style="margin-left: 0.5em; vertical-align: middle"
                  class="image-text"
                  >{{ data.representative.name }}</span
                >
              </template>
            </Column>
            <Column
              header="Date"
              filter-field="date"
              data-type="date"
              style="min-width: 10rem"
            >
              <template #body="{ data }">
                {{ formatDate(data.date) }}
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api'
import CustomerService from '@/service/CustomerService'
import ProductService from '@/service/ProductService'
import InputText from 'primevue/inputtext'
import { onMounted, ref } from 'vue'

const products = ref<any>(null)
const customer1 = ref<any>(null)
const loading1 = ref(true)
const status = ['Ativo', 'Desativado']
const customerService = new CustomerService()
const productService = new ProductService()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const formatDate = (value: {
  toLocaleDateString: (
    arg0: string,
    arg1: { day: string; month: string; year: string }
  ) => any
}) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

onMounted(() => {
  productService
    .getProductsWithOrdersSmall()
    .then((data: any) => (products.value = data))
  customerService.getCustomersLarge().then((data: any) => {
    customer1.value = data
    loading1.value = false
    customer1.value.forEach(
      (customer: { date: string | number | Date }) =>
        (customer.date = new Date(customer.date))
    )
  })
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
    @apply flex justify-between items-center;
  }
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
