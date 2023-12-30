<template>
  <ConfirmDialog :group="props.group">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div
        class="flex flex-column align-items-center p-5 surface-overlay border-round"
        :class="props.class"
      >
        <div
          class="border-circle inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8"
          :class="props.colorClasses"
        >
          <i class="text-5xl" :class="props.icon"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-4">{{
          message.header
        }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="flex align-items-center gap-2 mt-4">
          <Button
            class="reject-button"
            label="Cancelar"
            outlined
            @click="rejectCallback"
          ></Button>
          <Button
            class="accept-button"
            label="Confirmar"
            @click="acceptCallback"
          ></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup lang="ts">
const props = defineProps(['class', 'group', 'icon', 'colorClasses'])
</script>
