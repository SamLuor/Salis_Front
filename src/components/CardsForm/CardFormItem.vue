<template>
  <Fieldset
    :legend="item.numero_item?.toString()"
    :toggleable="true"
    class="relative"
  >
    <button class="float-btn-delete" @click="emit('deleteItem', index)">
      X
    </button>
    <div style="display: flex; flex-direction: column; gap: 8px">
      <div class="p-field input-full">
        <label for="validadeARP">Nº ITEM</label>
        <InputNumber
          v-model="item.numero_item"
          :use-grouping="false"
          placeholder="Digite o número do item"
          class="w-full"
        />
        <small class="p-error">{{ errors.prazoEntrega }}</small>
      </div>
      <div class="p-field input-full">
        <label for="validadeARP">Descrição Simplificada</label>
        <InputText
          v-model="item.descricao_simplificada"
          placeholder="Digite a descrição simplificada"
          class="w-full"
        />
        <small class="p-error">{{ errors.prazoEntrega }}</small>
      </div>
      <div class="p-field input-full">
        <label for="validadeARP">Descrição completa Termo de Referência</label>
        <InputText
          v-model="item.descricao_completa"
          placeholder="Select Item"
          class="w-full"
        />
        <small class="p-error">{{ errors.prazoEntrega }}</small>
      </div>
      <div class="flex flex-col" style="display: flex; flex-direction: column">
        <label for="validadeARP">Unidade de medida</label>
        <Dropdown
          v-model="item.unidade_medida"
          :options="setoresProduto"
          option-label="nome"
          placeholder="Selecionar Unidade Medida"
          class="w-full"
        />
        <small class="p-error">{{ errors.prazoEntrega }}</small>
      </div>
      <div class="p-field input-full">
        <label for="validadeARP">Quantidade</label>
        <InputNumber
          v-model="item.quantidade"
          placeholder="Digite a quantidade"
          class="w-full"
        />
        <small class="p-error">{{ errors.prazoEntrega }}</small>
      </div>
    </div>
  </Fieldset>
</template>

<script setup lang="ts">
import { BaseItem } from '@/@types/term_reference'

interface Props {
  item: BaseItem
  errors: { [key: string]: any }
}

const props = defineProps<Props>()
const emit = defineEmits(['update:item'])

function updateItem(newItem: BaseItem) {
  emit('update:item', newItem)
}
</script>
