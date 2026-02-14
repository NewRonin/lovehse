<script setup lang="ts">
const number = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/check-ticket', {
      method: 'POST',
      body: { number: number.value }
    })
    navigateTo('/vote')

  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка авторизации'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth">
    <h1>Авторизация по билету</h1>

    <form @submit.prevent="login">
      <input
        v-model="number"
        placeholder="Введите номер билета"
        required
      />

      <button :disabled="loading">
        {{ loading ? 'Проверка...' : 'Продолжить' }}
      </button>
    </form>

    <p :style="[error ? { 'visibility' : 'visible'} : {'visibility' : 'hidden'}]">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  min-height: 100vh;
  margin: 0 1.6rem;
  text-align: center;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 12px;
}
button {
  width: 100%;
  padding: 10px;
  border-radius: 12px;
}

p {
  margin-top: 2rem;
  color: var(--accent);
  min-height: 2.4em;
}
</style>
