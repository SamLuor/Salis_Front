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
            <Dropdown :options="status" />
          </div>
          <DataTable
            v-model:filters="filters1"
            :value="customer1"
            :paginator="true"
            :rows="10"
            data-key="id"
            :row-hover="true"
            :loading="loading1"
            :filters="filters1"
            scrollable
            responsive-layout="scroll"
            scroll-height="550px"
            :global-filter-fields="[
              'name',
              'country.name',
              'representative.name',
              'balance',
              'status'
            ]"
          >
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column field="name" header="Usuário" style="min-width: 12rem">
              <template #body="{ data }">
                {{ data.name }}
              </template>
              <template #filter="{ filterModel }">
                <InputText
                  v-model="filterModel.value"
                  type="text"
                  class="p-column-filter"
                  placeholder="Search by name"
                />
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
              <template #filter="{ filterModel }">
                <div class="mb-3 text-bold">Agent Picker</div>
                <MultiSelect
                  v-model="filterModel.value"
                  :options="representatives"
                  option-label="name"
                  placeholder="Any"
                  class="p-column-filter"
                >
                  <template #option="slotProps">
                    <div class="p-multiselect-representative-option">
                      <img
                        :alt="slotProps.option.name"
                        :src="'images/avatar/' + slotProps.option.image"
                        width="32"
                        style="vertical-align: middle"
                      />
                      <span
                        style="margin-left: 0.5em; vertical-align: middle"
                        class="image-text"
                        >{{ slotProps.option.name }}</span
                      >
                    </div>
                  </template>
                </MultiSelect>
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
              <template #filter="{ filterModel }">
                <Calendar
                  v-model="filterModel.value"
                  date-format="mm/dd/yy"
                  placeholder="mm/dd/yyyy"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import CustomerService from '@/service/CustomerService'
import ProductService from '@/service/ProductService'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const customer1 = ref(null)
const filters1 = ref(null)
const loading1 = ref(true)
const status = ref([
  'unqualified',
  'qualified',
  'new',
  'negotiation',
  'renewal',
  'proposal'
])

export default {
  data() {
    return {
      statuses: [
        'unqualified',
        'qualified',
        'new',
        'negotiation',
        'renewal',
        'proposal'
      ],
      representatives: [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
      ]
    }
  },
  customerService: null,
  productService: null,
  created() {
    this.customerService = new CustomerService()
    this.productService = new ProductService()
    this.initFilters1()
  },
  mounted() {
    this.productService
      .getProductsWithOrdersSmall()
      .then((data: any) => (this.products = data))
    this.customerService.getCustomersLarge().then((data: any) => {
      this.customer1 = data
      this.loading1 = false
      this.customer1.forEach(
        (customer: { date: string | number | Date }) =>
          (customer.date = new Date(customer.date))
      )
    })
    this.customerService
      .getCustomersLarge()
      .then((data: any) => (this.customer2 = data))
    this.customerService
      .getCustomersMedium()
      .then((data: any) => (this.customer3 = data))
    this.loading2 = false
  },
  methods: {
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        'country.name': {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
        },
        balance: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
      }
    },
    clearFilter1() {
      this.initFilters1()
    },
    expandAll() {
      this.expandedRows = this.products.filter((p: { id: any }) => p.id)
    },
    collapseAll() {
      this.expandedRows = null
    },
    formatCurrency(value: {
      toLocaleString: (
        arg0: string,
        arg1: { style: string; currency: string }
      ) => any
    }) {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    formatDate(value: {
      toLocaleDateString: (
        arg0: string,
        arg1: { day: string; month: string; year: string }
      ) => any
    }) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },
    calculateCustomerTotal(name: any) {
      let total = 0
      if (this.customer3) {
        for (const customer of this.customer3) {
          if (customer.representative.name === name) {
            total++
          }
        }
      }

      return total
    }
  }
}
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
