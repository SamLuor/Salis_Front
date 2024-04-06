<script setup lang="ts">
import { shallowRef, ref, onMounted, onUnmounted } from 'vue'
import PublicationForm from './PublicationForm.vue'
import InDevelopment from './InDevelopment.vue'
import EditalForm from './EditalForm.vue'
import TabsSteps from '@/components/TabsSteps/TabsSteps.vue'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import TermReferenceForm from './TermReferenceForm.vue'
import useProcessStore from '@/store/process'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const toast = useToast()

const publication_id = route.params?.id
const active = shallowRef(PublicationForm)
const processStore = useProcessStore()
const keyCurrent = ref<string>('publicacoes')
const step = ref(2)
const currentProcess = ref(2)
const loading = ref<boolean>(false)

interface ComponentsMap {
  [key: string]: any
}

const keysData = ['publicacoes', 'edital']

const componentsOptions: ComponentsMap = {
  '0': PublicationForm,
  '1': EditalForm,
  '2': TermReferenceForm,
  '3': InDevelopment
}

const selectStatus = (status: number) => {
  currentProcess.value = status
  active.value = componentsOptions[status]
  keyCurrent.value = keysData[status]
}

onMounted(async () => {
  if (publication_id) {
    loading.value = true
    try {
      await services.Publication.getPublication(publication_id as string)
    } catch (err) {
      toast.add({ severity: 'error', detail: (err as Error).message })
    } finally {
      loading.value = false
    }
  }
})

onUnmounted(() => {
  processStore.clearStore()
})
</script>

<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <h5 class="header-page">Processos</h5>
        <TabsSteps
          v-if="publication_id"
          :status-process="step"
          :current="currentProcess"
          @change-status="selectStatus"
        />
        <component :is="active" v-if="!loading" />
        <div v-else class="w-full h-full flex items-center justify-center">
          <i class="pi pi-spinner pi-spin" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.header-page {
  @apply flex justify-between items-center dark:text-dark-white70;
}
</style>
