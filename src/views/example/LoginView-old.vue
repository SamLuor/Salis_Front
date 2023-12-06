<template>
  <div class="container min-h-screen min-w-screen">
    <div class="flex flex-row-reverse" style="height: 55px; padding: 10px">
      <Button
        v-tooltip.left="tooltipConfig"
        class="button-toggle-dark"
        @click="themeStore.toggleThemeColor"
      >
        <i
          :class="[
            'text-lg pi',
            { 'text-700 pi-sun': !themeStore.isDarkTheme },
            { 'text-100 pi-moon': themeStore.isDarkTheme }
          ]"
        />
      </Button>
    </div>

    <div
      class="flex justify-content-center items-center"
      style="height: calc(100vh - 55px)"
    >
      <div
        class="grid justify-content-center p-2 lg:p-0"
        style="min-width: 80%"
      >
        <div class="col-12 mt-5 xl:mt-0 text-center"></div>
        <div
          class="col-12 md:col-9 xl:col-6"
          style="
            border-radius: 56px;
            padding: 0.3rem;
            background: linear-gradient(
              180deg,
              var(--primary-color),
              rgba(33, 150, 243, 0) 30%
            );
          "
        >
          <div
            class="h-full w-full border-1 m-0 py-7 px-4 sub-container border-setted"
            style="border-radius: 53px; max-height: 600px"
          >
            <div class="text-center mb-5">
              <img
                src="@/assets/logo.png"
                alt="Image"
                width="100"
                class="mb-3 img-logo"
              />
              <div class="text-3xl font-medium mb-3 text-color-setted">
                Bem vindo!
              </div>
              <span class="font-medium sub-text-color-setted"
                >Faça login para continuar</span
              >
            </div>

            <div class="w-full md:w-10 mx-auto">
              <label
                for="email1"
                class="block text-md font-semibold mb-2 text-color-setted"
                >Email</label
              >
              <InputText
                id="email1"
                v-model="email"
                type="text"
                class="w-full mb-3"
                placeholder="Email"
                style="padding: 0.7rem"
              />

              <label
                for="password1"
                class="block font-semibold text-md mb-2 text-color-setted"
                >Password</label
              >
              <Password
                id="password1"
                v-model="password"
                placeholder="Password"
                :toggle-mask="true"
                class="w-full mb-3"
                input-class="w-full"
                :input-style="{ padding: '.7rem' }"
                prompt-label="Digite sua senha"
                weak-label="Fraca"
                medium-label="Médio"
                strong-label="Forte"
              ></Password>

              <div class="flex align-items-center justify-content-between mb-5">
                <div class="flex align-items-center">
                  <Checkbox
                    id="rememberme1"
                    v-model="checked"
                    :binary="true"
                    class="mr-2"
                  ></Checkbox>
                  <label for="rememberme1" class="sub-text-color-setted"
                    >Lembre-me</label
                  >
                </div>
                <a
                  class="font-medium no-underline ml-2 text-right cursor-pointer forget-password"
                  style="color: var(--primary-color)"
                  >Esqueceu sua senha?</a
                >
              </div>
              <Button label="Entrar" class="w-full p-2 text-xl"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@/store/theme'
import Button from 'primevue/button'

const email = ref<string>('')
const password = ref<string>('')
const checked = ref<boolean>(false)

const themeStore = useThemeStore()

const tooltipConfig = computed(() => ({
  value: themeStore.isDarkTheme ? 'Dark Mode' : 'Light Mode',
  pt: {
    arrow: {
      style: {
        borderBottomColor: 'var(--primary-color)'
      }
    },
    text: 'bg-primary font-medium'
  }
}))
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
