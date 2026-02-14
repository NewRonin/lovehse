<script setup lang="ts">
interface Props {
  participant: {
    id: string
    name: string
    imageUrl?: string
  }
  selected: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['select'])

function select() {
  emit('select', props.participant.id)
}
</script>

<template>
  <div
    class="card"
    :class="{ selected }"
    @click="select"
  >
    <img
      :src="participant.imageUrl || '/placeholder.jpg'"
      :alt="participant.name"
    />

    <div class="name">
      {{ participant.name }}
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  transition: 0.2s;
  aspect-ratio: 960 / 1280;
  max-height: 600px;
}

.card:hover {
  transform: scale(1.02);
}

.card.selected {
  border-color: var(--accent)
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--hostel-50);
}

.name {
  padding: 10px;
  text-align: center;
  font-weight: 600;
}
</style>
