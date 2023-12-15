<template>
  <div class="background-select">
    <div class="bar-header">
      <img :src="LogoSalis" width="60" />
    </div>
    <div class="content-buttons-card">
      <div
        v-for="option in authStore.options_company"
        :key="option.value"
        class="card-btn"
        @click="selectCompany(option.value)"
      >
        <img :src="LogoSalis" width="100" />
        <h5 class="font-semibold text-primary-principal">{{ option.text }}</h5>
      </div>
    </div>
    <div class="bar-footer">
      <p>Menu de seleção de empresa</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoSalis from '@/assets/logo-fit.png'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const selectCompany = async (id: string) => {
  try {
    const response = await authStore.selectCompany(id)

    console.log(response)
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped lang="scss">
.background-select {
  @apply bg-background-light-white70 dark:bg-background-dark-blue70 w-screen h-screen flex flex-col justify-between;

  .bar-header {
    @apply border-b border-transparent border-solid border-b-gray-300 dark:border-b-background-dark-blue;
  }

  .bar-footer {
    @apply bg-background-light-white dark:bg-background-dark-blue flex justify-center items-center text-gray-500 border py-3 border-transparent border-solid border-t-gray-300 dark:border-t-dark-gray dark:text-dark-gray text-lg font-semibold;
  }

  .content-buttons-card {
    @apply flex items-center gap-4 justify-center;

    .card-btn {
      @apply bg-background-light-white dark:bg-background-dark-blue border-2 border-primary-400 dark:border-secondary-200 border-solid rounded-md flex flex-col justify-center items-center w-[200px] h-[200px] text-dark-gray shadow-md duration-200 cursor-pointer;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
