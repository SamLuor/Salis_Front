<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <div class="px-4 container-area-form">
          <div class="section-form">
            <div class="content">
              <h4 class="header">Termo de Referência</h4>
              <p class="description">
                Estas informações são para cadastrar dados do termo de
                referência, todos os dados dos termos cadastrados serão visíveis
                a partir de permissões liberadas para os usuários.
              </p>
            </div>
          </div>
          <form>
            <!-- Dados Iniciais -->
            <div class="container-inputs-form">
              <h5 class="input-full">Seg. Comercial</h5>
              <div class="p-field">
                <label for="setorProduto">Setor do Produto</label>
                <MultiSelect
                  v-model="setorProduto"
                  :options="setoresProduto"
                  option-label="nome"
                  placeholder="Selecionar Setor do Produto"
                  class="w-full md:w-20rem"
                  :max-selected-labels="3"
                />
              </div>
              <div class="p-field">
                <label for="subseguinteComercial">Subseguinte Comercial</label>
                <MultiSelect
                  v-model="subseguinteComercial"
                  :options="subseguintesComerciais"
                  option-label="nome"
                  placeholder="Selecionar Subseguinte Comercial"
                  class="w-full md:w-20rem"
                  :max-selected-labels="3"
                />
              </div>
              <div class="p-field input-full">
                <label for="validadeProposta">Validade da Proposta</label>
                <Textarea
                  id="validadeProposta"
                  v-model="validadeProposta"
                  placeholder="Insira a descrição completa do objeto"
                  class="w-full"
                />
                <small class="p-error">{{
                  errors.completeObjectDescription
                }}</small>
              </div>
              <div class="p-field">
                <label for="prazoEntrega">Prazo de Entrega</label>
                <InputText
                  id="prazoEntrega"
                  v-model="prazoEntrega"
                  placeholder="Insira a descrição completa do objeto"
                  class="w-full"
                />
                <small class="p-error">{{ errors.prazoEntrega }}</small>
              </div>
              <div class="p-field">
                <label for="prazoEntrega">Prazo de Garantia do Produto</label>
                <InputText
                  id="prazoEntrega"
                  v-model="prazoEntrega"
                  placeholder="Insira a descrição completa do objeto"
                  class="w-full"
                />
                <small class="p-error">{{ errors.prazoEntrega }}</small>
              </div>
              <div
                v-if="
                  modalidade === 'PREGÃO' || modalidade === 'CONCORRÊNCIA SRP'
                "
                class="p-field input-full"
              >
                <label for="validadeARP">Validade da ARP</label>
                <Dropdown
                  v-model="selectedItem"
                  :options="items"
                  option-label="label"
                  option-value="value"
                  :virtual-scroller-options="{ itemSize: 38 }"
                  placeholder="Select Item"
                  class="w-full"
                />
                <small class="p-error">{{ errors.prazoEntrega }}</small>
              </div>
            </div>
            <div class="input-full flex flex-row-reverse">
              <Button
                :label="
                  publication_id ? 'Avançar para Próxima Tarefa' : 'Criar'
                "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const publication_id = route.params?.id

const errors = ref<{ [key: string]: any }>({})

const form = ref({})

const setorProduto = ref([])
const subseguinteComercial = ref([])
const validadeProposta = ref('')
const prazoEntrega = ref('')
const prazoGarantiaProduto = ref('')
const validadeARP = ref('')

// Opções para Setor do Produto e Subseguinte Comercial
const setoresProduto = ref([
  { nome: 'Setor 1', id: 1 },
  { nome: 'Setor 2', id: 2 }
  // Adicione mais opções conforme necessário
])
const subseguintesComerciais = ref([
  { nome: 'Subseguinte 1', id: 1 },
  { nome: 'Subseguinte 2', id: 2 }
  // Adicione mais opções conforme necessário
])

// Modalidade (assumindo que seja uma variável reativa)
const modalidade = ref('PREGÃO') // Defina o valor conforme necessário

const selectedItem = ref()
const items = ref(
  Array.from({ length: 500 }, (_, i) => ({ label: `${i} - Meses`, value: i }))
)
</script>

<style>
.p-fileupload .p-fileupload-buttonbar {
  @apply bg-background-light-white70 dark:bg-background-dark-blue70;
}
.p-fileupload .p-fileupload-content {
  @apply bg-background-light-white dark:bg-background-dark-blue;
}
.p-fileupload .p-fileupload-content .name-file {
  @apply text-light-gray dark:text-dark-gray;
}
.p-fileupload .p-fileupload-empty .icon-upload {
  @apply text-light-black70 dark:text-dark-white70;
}
.p-fileupload .p-fileupload-empty .description {
  @apply text-light-gray dark:text-dark-gray;
}
.p-error {
  @apply text-red-400 !important;
}
</style>

<style scoped lang="scss">
.container-area-form {
  @apply grid grid-cols-3 relative;

  .section-form {
    .content {
      @apply sticky top-0;
    }

    .header {
      @apply text-light-black70 dark:text-dark-white70 text-lg mb-1 font-semibold;
    }
    .description {
      @apply text-light-gray dark:text-dark-gray pr-4;
    }
  }
}
.container-form-bussiness {
  @apply grid grid-cols-2 gap-6 py-6 col-start-2 col-end-4 bg-background-light-white dark:bg-background-dark-blue70 rounded-lg shadow-sm p-4 max-h-[70vh] overflow-y-scroll;

  label {
    @apply text-light-black70 dark:text-dark-white70;
  }
  small {
    @apply text-light-gray dark:text-dark-gray;
  }

  .input-full {
    @apply col-start-1 col-end-3;
  }
}
h5 {
  @apply m-0 text-xl font-semibold;
}
form {
  @apply col-start-2 col-end-4 bg-background-light-white dark:bg-background-dark-blue70 rounded-lg shadow-sm p-4 max-h-[60vh] overflow-y-scroll;

  .input-full {
    @apply col-start-1 col-end-3;
  }
}
.container-inputs-form {
  @apply grid grid-cols-2 gap-4 pb-4;
}

.card {
  @apply rounded-none;

  .header-page {
    @apply flex justify-between items-center dark:text-dark-white70;
  }
}
</style>
