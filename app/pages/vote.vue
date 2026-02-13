<script setup lang="ts">

const { data: participants, pending } = await useFetch('/api/participants')

const selectedId = ref<number | null>(null)
const showDialog = ref(false)
const loading = ref(false)
const error = ref('')

const selectedParticipant = computed(() =>
  participants.value?.find(p => p.id === selectedId.value)
)

function selectParticipant(id: number) {
  selectedId.value = id
  showDialog.value = true
}

async function confirmVote() {
  if (!selectedId.value) return

  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/vote', {
      method: 'POST',
      body: { participantId: selectedId.value }
    })

    navigateTo('/results')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка голосования'
  } finally {
    loading.value = false
    showDialog.value = false
  }
}
</script>

<template>
  <div class="page">
    <h1>Выберите пару</h1>

    <div v-if="pending">Загрузка...</div>

    <div v-else class="grid">
      <ParticipantCard
        v-for="p in participants"
        :key="p.id"
        :participant="p"
        :selected="p.id === selectedId"
        @select="selectParticipant"
      />
    </div>

    <VoteConfirmDialog
      :open="showDialog"
      :participantName="selectedParticipant?.name || ''"
      :loading="loading"
      @confirm="confirmVote"
      @close="showDialog = false"
    />

    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.page {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.error {
  margin-top: 20px;
  color: red;
}
</style>
