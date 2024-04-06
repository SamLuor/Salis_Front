<script setup lang="ts">
import { Nullable } from 'primevue/ts-helpers'
import InputText, { InputTextProps } from 'primevue/inputtext'

interface Props {
  label: string
  name?: string
  classInput?: string
  classLabel?: string
  classError?: string
  error: string | undefined
  helper?: string
  invalid: boolean
  inputProps?: InputTextProps
}

const model = defineModel<Nullable<string>>()
defineProps<Props>()
</script>

<template>
  <div class="base-input">
    <label
      :class="['label', { classLabel: classLabel }, { invalid: invalid }]"
      :for="name"
      >{{ label }}</label
    >
    <InputText
      v-model="model"
      v-bind="inputProps"
      :class="['input', { classInput: classInput }, { invalid: invalid }]"
    />
    <small v-if="!error && helper" class="helper">{{ helper }}</small>
    <small v-else :class="['error', { classError: classError }]">{{
      error
    }}</small>
  </div>
</template>

<style lang="scss">
.base-input {
  @apply flex flex-col;

  .label {
    @apply text-gray-600 mb-2;

    &.invalid {
      @apply text-red-400;
    }
  }

  .input {
    &.invalid {
      .p-inputtext {
        @apply border-red-400 shadow-none;
      }
    }
  }

  .helper {
    @apply text-gray-500 pl-1 mt-1;
  }

  .error {
    @apply text-red-400 mt-1 pl-2;
  }
}
</style>
