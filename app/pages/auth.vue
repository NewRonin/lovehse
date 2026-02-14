<script setup lang="ts">
const number = ref('')
const error = ref('')
const loading = ref(false)
const isNavigating = ref(false)
const videoLoaded = ref(false)

async function login() {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/check-ticket', {
      method: 'POST',
      body: { number: number.value }
    })
    isNavigating.value = true
    setTimeout(() => {
      navigateTo('/vote')
    }, 300)

  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка авторизации'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth" :class="{ navigating: isNavigating }">
  <video autoplay muted loop  :class="{ 'background-video' : true, 'videoLoaded': videoLoaded}" @canplay="videoLoaded = true">
    <source src="/background.webm" type="video/webm"> 
  </video> 

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

    <div class="logo-container">
      <img src="/logo-white-hostel.svg">
      <!-- <img src="/logo-white-collab.svg"> -->
    </div>
  </div>
</template>

<style scoped>
@keyframes slideDownFade {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleInUp {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
}

@keyframes slideOutFade {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
}

@keyframes fadeOut {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0;
  }
}

@keyframes shine {
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
}

.auth {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  padding: 0 1.6rem;
  text-align: center;
  background: ;
  transition: all 0.3s ease-out;
}

.auth.navigating {
  animation: slideOutFade 0.5s ease-out forwards;
}

.auth.navigating .background-video {
  animation: fadeOut 0.5s ease-out forwards;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 12px;
  animation: scaleInUp 0.6s ease-out 0.2s backwards;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(255, 20, 147, 0.3);
  transform: scale(1.02);
}

button {
  width: 100%;
  padding: 10px;
  animation: scaleInUp 0.6s ease-out 0.3s backwards;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(255, 20, 147, 0.3);
}

button:active:not(:disabled) {
  transform: scale(0.98);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

p {
  margin-top: 2rem;
  color: var(--accent);
  min-height: 2.4em;
  animation: slideDownFade 0.4s ease-out;
}

h1 {
  font-size: 3.2rem;
  animation: slideDownFade 0.8s ease-out;
  margin-bottom: 2rem;
}

.logo-container {
  position: absolute;
  bottom: 4rem;
  display: flex;
  width: 100%;
  max-height: 10%;
  flex-flow: row wrap;
  gap: 2rem;
  justify-content: center;
}

.logo-container img {
  width: auto;
  height: 4rem;
  animation: slideUpFade 0.8s ease-out 0.5s backwards;
  transition: transform 0.3s ease;
}

.logo-container img:hover {
  transform: scale(1.1);
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.8s ease-out;
}

.videoLoaded {
  opacity: 0.2;
}
</style>
