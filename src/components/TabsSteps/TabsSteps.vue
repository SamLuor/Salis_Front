<script setup lang="ts">
import CardStep from './components/CardStep.vue'
const props = defineProps(['statusProcess', 'current'])
const emit = defineEmits(['changeStatus'])
const statuses = [
  {
    status: 0,
    header: 'Publicação',
    description: 'Publicações e tatatatatatat',
    icon: 'fa-solid fa-file-import'
  },
  {
    status: 1,
    header: 'Edital',
    description: 'Edital e tatatatatatat',
    icon: 'fa-solid fa-eye'
  },
  {
    status: 2,
    header: 'Termo de Referência',
    description: 'Termo de Referência e tatatatatatat',
    icon: 'fa-solid fa-trash'
  },
  {
    status: 3,
    header: 'Lista de Produtos',
    description: 'Lista de Produtos e tatatatatatat',
    icon: 'fa-solid fa-square'
  }
]

const changeStatus = (status: number) => {
  emit('changeStatus', status)
}
</script>

<template>
  <div class="container-tabs-steps">
    <CardStep
      v-for="status in statuses"
      :key="'status'.concat(String(status))"
      :is-completed="statusProcess >= status.status"
      :is-current="status.status === props.current"
      :status="status.status"
      :description="status.description"
      :header="status.header"
      :icon="status.icon"
      @change-status="changeStatus"
    />
  </div>
</template>
<style>
.container-tabs-steps {
  @apply flex justify-between mb-5;
}
</style>
