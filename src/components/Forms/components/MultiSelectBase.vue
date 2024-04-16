<script setup lang="ts">
import MultiSelect, { MultiSelectProps } from 'primevue/multiselect'

interface Props {
  label: string
  name?: string
  classBase?: string
  classInput?: string
  classLabel?: string
  classError?: string
  error: string | undefined
  helper?: string
  invalid: boolean
  required?: boolean
  inputProps?: MultiSelectProps
}

const model = defineModel<string[]>()
defineProps<Props>()
</script>

<template>
  <div :class="`base-input ${classBase || ''}`">
    <label
      :class="['label', { classLabel: classLabel }, { invalid: invalid }]"
      :for="name"
      >{{ label }}
      <span v-if="required" class="text-red-400 font-bold">*</span>
    </label>
    <MultiSelect
      v-model="model"
      v-bind="{
        ...inputProps,
        inputProps: { ...inputProps?.inputProps, name: name }
      }"
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
