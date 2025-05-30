<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@/store/theme'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import Button from 'primevue/button'
import Banner from '@/assets/img/background-form.png'
import { schemaLogin } from '@/utils/validations'
import { useAuthStore } from '@/store/auth'
import { useToast } from 'primevue/usetoast'

const themeStore = useThemeStore()
const authStore = useAuthStore()
const toast = useToast()

const { handleSubmit, errors, defineComponentBinds, setFieldError } = useForm({
  validationSchema: toTypedSchema(schemaLogin)
})

//const isLoading = ref<boolean>(false)

const email = defineComponentBinds('email')
const password = defineComponentBinds('password')
const checked = ref<boolean>(false)

const onFormSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values)
  } catch (err) {
    toast?.add({
      severity: 'error',
      summary: 'Error',
      detail: (err as Error).message,
      life: 3150
    })
  }
})

const tooltipConfig = computed(() => ({
  value: themeStore.isDarkTheme ? 'Dark Mode' : 'Light Mode',
  pt: {
    text: 'font-medium bg-primary'
  }
}))
</script>

<template>
  <Toast position="bottom-right" />
  <div
    class="bg-no-repeat bg-cover container-background"
    :style="{
      backgroundImage: `url(${Banner})`
    }"
  >
    <div class="container-login">
      <div class="container-img bg-transparent">
        <img src="@/assets/logo.png" alt="logo" />
      </div>
      <div class="container container-form">
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
          class="area-form"
          style="
            border-radius: 53px;
            max-height: 600px;
            align-self: center;
            transform: translateY(-55px);
          "
        >
          <div class="text-center mb-5">
            <div class="text-3xl font-medium mb-3 text-color-setted">
              Bem vindo!
            </div>
            <span class="font-medium sub-text-color-setted"
              >Faça login para continuar</span
            >
          </div>

          <form class="w-full md:w-10 mx-auto" @submit.prevent>
            <div class="mb-3">
              <label
                for="email"
                class="block text-md font-semibold mb-2 text-color-setted"
                >Email</label
              >
              <InputText
                id="email"
                v-bind="email"
                type="text"
                :class="['w-full', { 'p-invalid': errors.password }]"
                placeholder="Email"
                style="padding: 0.7rem"
              />
              <small id="text-error" class="p-error">{{
                errors.email || '&nbsp;'
              }}</small>
            </div>

            <div class="mb-3">
              <label
                for="password"
                class="block font-semibold text-md mb-2 text-color-setted"
                >Password</label
              >
              <Password
                id="password"
                v-bind="password"
                placeholder="Password"
                :class="[{ 'p-invalid': errors.password }]"
                :toggle-mask="true"
                class="w-full"
                input-class="w-full"
                :input-style="{ padding: '.7rem' }"
                :feedback="false"
              />
              <small id="text-error" class="p-error">{{
                errors.password || '&nbsp;'
              }}</small>
            </div>

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
                >Esqueceu sua senha?</a
              >
            </div>
            <Button
              label="Entrar"
              class="w-full p-2 text-xl"
              @click="onFormSubmit"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-background {
  @apply bg-cover bg-center;

  .container-login {
    @apply flex h-screen w-screen bg-secondary-500/40 dark:bg-primary-principal/40;

    .container-img {
      background-size: cover;
      background-position: center;
      height: 100vh;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      @apply w-[60vw] overflow-hidden;

      &.layer {
        @apply h-full w-full bg-secondary-500/50 grid place-items-center;
      }
    }
    .container-form {
      grid-template-rows: 55px 1fr;
      @apply w-[40vw] px-10 grid rounded-l-3xl shadow-2xl overflow-hidden;

      .area-form {
        @apply p-4 py-12;

        .forget-password {
          @apply text-primary-principal dark:text-secondary-500;
        }
      }
    }
  }
}

.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.container-img {
  @apply bg-black;
}
</style>
