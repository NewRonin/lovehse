<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>


</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
