<template>
  <div class="input-full container-addresses">
    <Title title="Endereços" title-class="text-gray-700 font-normal" />
    <div
      v-for="(endereco, index) in enderecos"
      :key="'endereço'.concat(String(index))"
      class="w-full container-input-address"
    >
      <i
        v-if="index > 0"
        v-tooltip.top="'Remover endereço'"
        class="pi pi-times xmark-remove"
        @click="removeAddress(index)"
      />
      <InputMaskBase
        v-model="endereco.cep"
        label="CEP"
        helper="Digite o cep do endereço a cadastrar."
        :required="true"
        :invalid="!!errors[index]?.cep"
        :error="errors[index]?.cep?.message"
        :input-props="{
          mask: '99999-999',
          unmask: true,
          onBlur(payload) {
            searchCep((payload.target as HTMLInputElement).value, index)
          },
          disabled: loading === index
        }"
      />
      <InputTextBase
        v-model="endereco.logradouro"
        label="Endereço"
        helper="Digite o endereço (Rua)."
        :required="true"
        :error="errors[index]?.logradouro?.message"
        :invalid="!!errors[index]?.logradouro"
        :input-props="{
          disabled: loading === index || !endereco.cep
        }"
      />
      <InputNumberBase
        v-model="endereco.numero"
        label="Número"
        helper="Digite o numero do endereço."
        :required="true"
        :error="errors[index]?.numero?.message"
        :invalid="!!errors[index]?.numero"
      />
      <InputTextBase
        v-model="endereco.bairro"
        label="Bairro"
        helper="Digite o bairro do endereço."
        :required="true"
        :error="errors[index]?.bairro?.message"
        :invalid="!!errors[index]?.bairro"
        :input-props="{
          disabled: loading === index || !endereco.cep
        }"
      />
      <InputTextBase
        v-model="endereco.cidade"
        label="Cidade"
        helper="Digite a cidade do endereço."
        :required="true"
        :error="errors[index]?.cidade?.message"
        :invalid="!!errors[index]?.cidade"
        :input-props="{
          disabled: loading === index || !endereco.cep
        }"
      />
      <InputTextBase
        v-model="endereco.complemento"
        label="Complemento"
        helper="Digite o complemento do endereço."
        :error="errors[index]?.complemento?.message"
        :invalid="!!errors[index]?.complemento"
        :input-props="{
          disabled: loading === index || !endereco.cep
        }"
      />
      <hr class="w-full border-gray-300 span-input" />
    </div>
    <Button
      label="Adicionar Endereço"
      icon="pi pi-plus"
      class="w-full"
      @click="addAddress"
    />
  </div>
</template>

<script setup lang="ts">
import InputTextBase from './InputTextBase.vue'
import InputNumberBase from './InputTextBase.vue'
import InputMaskBase from './InputMaskBase.vue'

import type { Address, ErrorsAddress } from '@/@types/addresses'
import type { ViaCepProtocol } from '@/@types/thirdParty'

import services from '@/api'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import Title from '@/components/Title.vue'
import { deepClone } from '@/utils/helpers'
import { AddressInitial } from '@/utils/constants'

interface Props {
  errors: ErrorsAddress[]
}
defineProps<Props>()

const toast = useToast()

const loading = ref<null | number>()
const enderecos = defineModel<Address[]>('enderecos', { required: true })

const addAddress = () => {
  enderecos.value.push(deepClone(AddressInitial))
}

const removeAddress = (index: number) => {
  enderecos.value.splice(index, 1)
}

const populateInputsCEP = (data: ViaCepProtocol, index: number) => {
  enderecos.value[index] = {
    ...enderecos.value[index],
    bairro: data.bairro,
    cep: data.cep,
    cidade: data.localidade,
    complemento: data.complemento,
    logradouro: data.logradouro
  }
}

const searchCep = async (cep: string, index: number) => {
  if (cep.length < 9) return

  try {
    loading.value = index
    const response = await services.ThirdParty.viaCep(cep)
    populateInputsCEP(response, index)
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Erro ao buscar CEP',
      detail: (err as Error).message
    })
  } finally {
    loading.value = null
  }
}
</script>

<style scoped>
.container-input-address {
  @apply grid grid-cols-2 gap-y-6 gap-x-2 relative mb-6;
}
.container-addresses {
  @apply border-[1px] border-solid border-gray-300 rounded-md p-3 pb-6;
}
.span-input {
  @apply col-span-full;
}
.xmark-remove {
  @apply absolute right-0 -top-2 text-red-500 cursor-pointer duration-300 ease-in-out;
}
.xmark-remove:hover {
  transform: scale(1.1);
}
</style>
