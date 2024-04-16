<script setup lang="ts">
import { buildAccessArchives } from '@/utils/helpers'
import FileUpload, {
  FileUploadSelectEvent,
  type FileUploadProps
} from 'primevue/fileupload'
import services from '@/api'

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
  fileProps?: FileUploadProps
}

const file = defineModel<any>('file', { required: true })
const filePath = defineModel<string | null>('filePath', { required: true })
const props = defineProps<Props>()

const selectFile = (event: FileUploadSelectEvent) => {
  if (!props.fileProps?.multiple) {
    file.value = event.files[0]
    return
  }
  file.value = event.files
}
const removeFile = () => {
  file.value = null
}
</script>

<template>
  <div :class="`base-input ${classBase || ''}`">
    <label
      :class="['label', { classLabel: classLabel }, { invalid: invalid }]"
      :for="name"
      >{{ label }}
      <span v-if="required" class="text-red-400 font-bold">*</span>
    </label>
    <FileUpload
      v-if="!filePath"
      v-bind="fileProps"
      :class="['input', { classInput: classInput }, { invalid: invalid }]"
      @select="selectFile"
      @clear="removeFile"
    />
    <span v-else class="component-download-archive">
      <a
        target="_blank"
        :href="buildAccessArchives(services.httpConfig.getUri(), filePath)"
        >Visualizar Arquivo</a
      >
      <i
        v-tooltip.top="'Apagar Arquivo'"
        class="fa-solid fa-xmark"
        @click="filePath = null"
      />
    </span>
    <small v-if="!error && helper" class="helper">{{
      !filePath ? helper : 'Para visualizar o arquivo clique no link acima'
    }}</small>
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

<style scoped lang="scss">
.component-download-archive {
  @apply flex gap-10 items-center pl-2 mb-2;

  a {
    @apply hover:underline;
  }

  i {
    @apply cursor-pointer text-red-400 duration-300 ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
