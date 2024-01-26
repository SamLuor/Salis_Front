<template>
  <div class="container-no-access">
    <div class="content">Sem permissão de acesso</div>
  </div>
</template>

<script></script>

<style>
.container-no-access {
  @apply grid place-items-center  w-screen h-screen bg-background-light-white70 dark:bg-background-dark-blue !important;
}
.container-no-access .content {
  @apply flex flex-col dark:bg-background-dark-blue70 !important;
}
</style>

<script setup lang="ts"></script>
