<script lang="ts" setup>
import whiteLogo from '@/assets/img/logo-white.svg'
import darkLogo from '@/assets/img/logo-dark.svg'
import logoSalis from '@/assets/logo.png'
import { computed, defineProps } from 'vue'
import { useThemeStore } from '@/store/theme'
const store = useThemeStore()
const logo = computed(() => {
  return store.darkTheme ? whiteLogo : darkLogo
})

interface MyComponentProps {
  widthImage?: number
}

const props = defineProps<MyComponentProps>()
</script>

<template>
  <Image :src="logoSalis" alt="Logo Image" :width="props.widthImage" />
</template>

<style></style>
