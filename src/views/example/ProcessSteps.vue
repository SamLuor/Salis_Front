<script setup lang="ts">
import { shallowRef, ref } from 'vue'
import PublicationForm from './PublicationForm.vue'
import TabsSteps from '@/components/TabsSteps/TabsSteps.vue'

const active = shallowRef(PublicationForm)
const step = ref(2)
const currentProcess = ref(0)

const selectStatus = (status: number) => {
  currentProcess.value = status
}
</script>

<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <h5 class="header-page">Processos</h5>
        <TabsSteps
          :status-process="step"
          :current="currentProcess"
          @change-status="selectStatus"
        />
        <component :is="active" />
      </div>
    </div>
  </div>
</template>

<style>
.header-page {
  @apply flex justify-between items-center dark:text-dark-white70;
}
</style>
