<script setup lang="ts">
interface Props {
  open: boolean
  error: string
}

defineProps<Props>()

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="open" class="overlay">
    <div class="dialog error-dialog">
      <h2>Ошибка при голосовании</h2>

      <p class="error-message">{{ error }}</p>

      <div class="actions">
        <button @click="$emit('close')">
          Закрыть
        </button>

        <button
          class="primary"
          @click="$emit('close'); navigateTo('/results')"
        >
          Перейти к результатам
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideInScale {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
  z-index: 100;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dialog {
  background: var(--background-white);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  margin: 1.6rem;
  text-align: center;
  animation: slideInScale 0.3s ease-out;
  max-width: 400px;
}

h2 {
  color: var(--accent);
  margin-bottom: 15px;
}

.error-message {
  padding: 15px;
  background: rgba(255, 20, 147, 0.1);
  border-radius: 8px;
  color: var(--accent);
  font-size: 14px;
  word-break: break-word;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
}

button {
  padding: 8px 14px;
  cursor: pointer;
  background-color: var(--hostel-900);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
}

.primary {
  background: var(--accent);
  color: white;
}
</style>
