<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue'
import PublicationForm from './PublicationForm.vue'
import InDevelopment from './InDevelopment.vue'
import EditalForm from './EditalForm.vue'
import TabsSteps from '@/components/TabsSteps/TabsSteps.vue'
import { useRoute } from 'vue-router'
import services from '@/api/index'
import { PublicationProtocol } from '@/@types/publication'
import TermReferenceForm from './TermReferenceForm.vue'

const route = useRoute()

const publication_id = route.params?.id
const active = shallowRef(PublicationForm)
const processData = ref<{ [key: string]: any }>({})
const keyCurrent = ref<string>('publicacoes')
const step = ref(2)
const currentProcess = ref(0)

interface ComponentsMap {
  [key: string]: any
}

const keysData = ['publicacoes', 'desenvolvimento']

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
    const response = await services.Publication.getPublication(
      publication_id as string
    )

    processData.value = {
      ...response.data,
      desenvolvimento: 'hello',
      publicacoes: response.data.publicacoes.map(
        (publication: PublicationProtocol) => ({
          ...publication,
          date: new Date(publication.date)
        })
      )
    }
  }
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
        <component
          :is="active"
          v-if="processData[keyCurrent]"
          :data="processData[keyCurrent]"
        />
      </div>
    </div>
  </div>
</template>

<style>
.header-page {
  @apply flex justify-between items-center dark:text-dark-white70;
}
</style>
