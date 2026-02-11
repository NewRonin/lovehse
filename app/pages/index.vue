<script setup>
const number = ref('')
const error = ref(null)

async function submit() {
  try {
    await $fetch('/api/auth/check-ticket', {
      method: 'POST',
      body: { number: number.value }
    })

    navigateTo('/vote')
  } catch (e) {
    error.value = e.data?.statusMessage
  }
}
</script>

<template>
  <div>
    <h1>Введите номер билета</h1>
    <input v-model="number" />
    <button @click="submit">Продолжить</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
