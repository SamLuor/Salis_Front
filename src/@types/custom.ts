import type { InputMaskProps } from 'primevue/inputmask'
import type {
  InputTextPassThroughOptions,
  InputTextProps
} from 'primevue/inputtext'
import { PassThrough } from 'primevue/ts-helpers'

interface CustomModelValue {
  modelValue?: string | undefined
}

interface CustomPt {
  pt?: PassThrough<InputTextPassThroughOptions>
}

interface CustomReadonly {
  readonly?: boolean
}

export interface InputMaskMerged
  extends Omit<InputMaskProps, 'modelValue' | 'pt' | 'readonly'>,
    Omit<InputTextProps, 'modelValue' | 'pt' | 'readonly'>,
    CustomModelValue,
    CustomPt,
    CustomReadonly {}
