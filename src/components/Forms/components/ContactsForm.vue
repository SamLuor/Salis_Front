<template>
  <div class="input-full container-contacts">
    <Title title="Contatos" title-class="text-gray-700 font-normal" />
    <div
      v-for="(contato, index) in contatos"
      :key="'contato'.concat(String(index))"
      class="w-full container-input-contact"
    >
      <i
        v-if="index > 0"
        v-tooltip.top="'Remover contato'"
        class="pi pi-times xmark-remove"
        @click="removeContact(index)"
      />
      <InputNumberBase
        v-model="contato.ddd"
        label="DDD"
        helper="Digite o ddd do contato."
        :required="true"
        :error="errors[index]?.ddd?.message"
        :invalid="!!errors[index]?.ddd"
        :input-props="{
          allowEmpty: true,
          useGrouping: false,
          max: 99
        }"
      />
      <InputNumberBase
        v-model="contato.numero"
        label="Número"
        helper="Digite o número do contato."
        :required="true"
        :error="errors[index]?.numero?.message"
        :invalid="!!errors[index]?.numero"
        :input-props="{
          allowEmpty: true,
          useGrouping: false,
          max: 999999999
        }"
      />
      <InputTextBase
        v-model="contato.pessoa"
        label="Pessoa"
        helper="Digite nome da pessoa do contato."
        class-base="span-input"
        :required="true"
        :error="errors[index]?.pessoa?.message"
        :invalid="!!errors[index]?.pessoa"
      />
      <hr class="w-full border-gray-300 span-input" />
    </div>
    <Button
      label="Adicionar Contato"
      icon="pi pi-plus"
      class="w-full"
      @click="addContact"
    />
  </div>
</template>

<script setup lang="ts">
import InputTextBase from './InputTextBase.vue'
import InputNumberBase from './InputNumberBase.vue'

import type { Contact, ErrorsContact } from '@/@types/contacts'

import Title from '@/components/Title.vue'
import { deepClone } from '@/utils/helpers'
import { ContactInitial } from '@/utils/constants'

interface Props {
  errors: ErrorsContact[]
}
defineProps<Props>()

const contatos = defineModel<Contact[]>('contatos', { required: true })

const addContact = () => {
  contatos.value.push(deepClone(ContactInitial))
}

const removeContact = (index: number) => {
  contatos.value.splice(index, 1)
}
</script>

<style scoped>
.container-input-contact {
  @apply grid grid-cols-2 gap-y-6 gap-x-2 relative mb-6;
}
.container-contacts {
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
