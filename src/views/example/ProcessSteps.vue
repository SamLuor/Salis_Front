<script setup lang="ts">
import { shallowRef, ref, onMounted, onUnmounted, watch } from 'vue'
import PublicationForm from './PublicationForm.vue'
import EditalForm from './EditalForm.vue'
import TabsSteps from '@/components/TabsSteps/TabsSteps.vue'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import TermReferenceForm from './TermReferenceForm.vue'
import useProcessStore from '@/store/process'
import { useToast } from 'primevue/usetoast'
import ListProducts from './ListProducts.vue'
import useOptionsStore from '@/store/options'
import { useStepProcessStore } from '@/store/steps_process'

const route = useRoute()
const toast = useToast()

const publication_id = route.params?.id
const storeStepsProcess = useStepProcessStore()
const active = shallowRef(PublicationForm)
const processStore = useProcessStore()
const optionsStore = useOptionsStore()
const loading = ref<boolean>(false)

interface ComponentsMap {
  [key: string]: any
}

const componentsOptions: ComponentsMap = {
  '0': PublicationForm,
  '1': EditalForm,
  '2': TermReferenceForm,
  '3': ListProducts
}

const selectStatus = (status: number) => {
  active.value = componentsOptions[status]
}

watch(
  () => storeStepsProcess.currentAccess,
  (newValue) => {
    selectStatus(newValue ?? 0)
  }
)

onMounted(async () => {
  if (publication_id) {
    loading.value = true
    try {
      await services.Publication.getPublication(publication_id as string)
      selectStatus(processStore.status)
      storeStepsProcess.changeAccessGranted(processStore.status + 1)
      storeStepsProcess.changeCurrentAccess(processStore.status)
    } catch (err) {
      toast.add({ severity: 'error', detail: (err as Error).message })
    } finally {
      loading.value = false
    }
  }
})

onUnmounted(() => {
  processStore.clearStore()
  optionsStore.clearOptions()
})
</script>

<template>
  <div class="grid overflow-hidden">
    <div class="w-full pl-2">
      <div class="card mb-0 bg-transparent">
        <h5 class="header-page">Processos</h5>
        <TabsSteps
          v-if="publication_id"
          v-model:status="storeStepsProcess.currentAccess"
          :status-process="storeStepsProcess.accessGranted"
          :current="storeStepsProcess.currentAccess"
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
