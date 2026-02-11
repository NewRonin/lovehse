<script setup>
const { data } = await useFetch('/api/results')
</script>

<template>
  <div>
    <h1>Результаты</h1>
    <div v-for="p in data" :key="p.id">
      {{ p.name }} — {{ p._count.votes }}
    </div>
  </div>
</template>
