<script setup lang="ts">
interface Props {
  open: boolean
  participantName: string
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits(['confirm', 'close'])
</script>

<template>
  <div v-if="open" class="overlay">
    <div class="dialog">
      <h2>
        Проголосовать за
        <br />
        <strong>{{ participantName }}</strong>?
      </h2>

      <div class="actions">
        <button @click="$emit('close')" :disabled="loading">
          Отмена
        </button>

        <button
          class="primary"
          @click="$emit('confirm')"
          :disabled="loading"
        >
          {{ loading ? 'Голосуем...' : 'Подтвердить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

button {
  padding: 8px 14px;
  cursor: pointer;
}

.primary {
  background: #42b883;
  color: white;
  border: none;
}
</style>
