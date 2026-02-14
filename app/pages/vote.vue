<script setup lang="ts">

const { data: participants, pending } = await useFetch('/api/participants')

const selectedId = ref<number | null>(null)
const showDialog = ref(false)
const showErrorDialog = ref(false)
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
    const status = e?.status || e?.data?.statusCode
    
    if (status === 403) {
      error.value = 'Вы уже проголосовали'
    } else {
      error.value = e?.data?.statusMessage || e?.message || 'Ошибка при голосовании'
    }
    
    showDialog.value = false
    showErrorDialog.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="page-container">
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

    <VoteErrorDialog
      :open="showErrorDialog"
      :error="error"
      @close="showErrorDialog = false"
    />
  </main>
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
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 20, 147, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(255, 20, 147, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 20, 147, 0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.page-container {
  position: relative;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  font-size: 3.2rem;
  animation: slideDownFade 0.8s ease-out;
  margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.grid > * {
  animation: scaleInUp 0.5s ease-out backwards;
}

.grid > :nth-child(1) { animation-delay: 0.1s; }
.grid > :nth-child(2) { animation-delay: 0.2s; }
.grid > :nth-child(3) { animation-delay: 0.3s; }
.grid > :nth-child(4) { animation-delay: 0.4s; }
.grid > :nth-child(5) { animation-delay: 0.5s; }
.grid > :nth-child(6) { animation-delay: 0.6s; }
.grid > :nth-child(n+7) { animation-delay: 0.7s; }
</style>
