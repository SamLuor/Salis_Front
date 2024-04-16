<template>
  <div class="modal-options-itens">
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      "
    >
      <span class="p-text-secondary block"
        >Escolha o que corresponder sua busca.</span
      >
      <div class="container-options">
        <div
          v-for="productItem in productsItems"
          :key="productItem.id"
          :class="[
            'card-selection-item',
            { active: selectedProduct.id === productItem.id }
          ]"
          @click="selectedProduct = productItem"
        >
          {{ productItem.descricao_simplificada.toUpperCase() }}
          <p class="text-gray-500 text-sm">
            {{ productItem.descricao_completa.toLowerCase() }}
          </p>
        </div>
        <div class="card-selection-item" @click="registerProduto">
          Cadastrar Produto
        </div>
      </div>
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Confirmar"
          :disabled="!selectedProduct.id"
          @click="
            () => {
              selectProductItem(selectedProduct)
            }
          "
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductItemProtocol } from '@/@types/products'
import { ref } from 'vue'

interface Props {
  productsItems: ProductItemProtocol[]
  registerProduto(): void
  selectProductItem(productItem: ProductItemProtocol): void
}

const selectedProduct = ref<ProductItemProtocol>({} as ProductItemProtocol)

defineProps<Props>()
</script>

<style setup lang="scss">
.modal-options-itens {
  @apply flex flex-col justify-between h-full;

  .container-options {
    @apply flex flex-col gap-2 max-h-[250px] overflow-x-hidden overflow-y-auto py-6 px-2;
  }
}
.card-selection-item {
  @apply border-[1px] border-solid border-gray-300 p-4 bg-zinc-100 rounded-md shadow-md transition-all duration-300 ease-in-out cursor-pointer;

  &:hover {
    transform: scale(1.02);
    @apply shadow-md bg-primary-800/90 text-white border-transparent;
  }
}
.card-selection-item.active {
  transform: scale(1.02);
  @apply bg-primary-800 text-white font-bold shadow-none border-transparent;
}
</style>
