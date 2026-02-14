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
  background: var(--background-white);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  margin: 1.6rem;
  text-align: center;
}

.actions {
  margin-top: 20px;
  display: flex;
  flex-flow: column wrap;
  gap: .8rem;
  justify-content: center;
}

button {
  padding: 8px 14px;
  cursor: pointer;
  background-color: var(--hostel-900);
}

.primary {
  background: var(--accent);
  color: var(--hostel-50);
  border: none;
}

</style>
