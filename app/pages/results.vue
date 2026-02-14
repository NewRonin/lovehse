<script setup lang="ts">
type ParticipantResult = {
  id: number
  name: string
  imageUrl?: string | null
  _count: {
    votes: number
  }
}

const { data, pending, refresh } = await useFetch<ParticipantResult[]>('/api/results')
const lastUpdated = ref<Date>(new Date())
const isRefreshing = ref(false)

const totalVotes = computed(() =>
  data.value?.reduce((sum, p) => sum + p._count.votes, 0) ?? 0
)

const sorted = computed(() =>
  [...(data.value ?? [])].sort((a, b) => b._count.votes - a._count.votes)
)

function percent(votes: number) {
  if (!totalVotes.value) return 0
  return Math.round((votes / totalVotes.value) * 100)
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

async function handleRefresh() {
  isRefreshing.value = true
  await refresh()
  lastUpdated.value = new Date()
  isRefreshing.value = false
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1 class="title">Результаты голосования</h1>
      <div class="refresh-section">
        <span class="last-updated">Обновлено: {{ formatTime(lastUpdated) }}</span>
        <button class="refresh-btn" @click="handleRefresh" :disabled="isRefreshing">
          <span v-if="!isRefreshing">Обновить</span>
          <span v-else>⏳ Загрузка...</span>
        </button>
      </div>
    </div>

    <div v-if="pending" class="loading">
      Загрузка результатов...
    </div>

    <div v-else-if="!sorted.length" class="empty">
      Пока нет голосов
    </div>

    <div v-else class="results">
      <div
        v-for="(p, index) in sorted"
        :key="p.id"
        class="card"
        :class="{ winner: index === 0 }"
      >
        <div class="rank">
          <span>#{{ index + 1 }}</span>
        </div>

        <div class="info">
          <img
            v-if="p.imageUrl"
            :src="p.imageUrl"
            class="avatar"
          />

          <div class="text">
            <div class="name">{{ p.name }}</div>
            <div class="votes">
              {{ p._count.votes }} голосов ({{ percent(p._count.votes) }}%)
            </div>
          </div>
        </div>

        <div class="progress">
          <div
            class="bar"
            :style="{ width: percent(p._count.votes) + '%' }"
          />
        </div>
      </div>
    </div>

    <div v-if="totalVotes" class="total">
      Всего голосов: {{ totalVotes }}
    </div>
  </div>
</template>

<style scoped>
@keyframes slideDownFade {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleInUp {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fillBar {
  from {
    width: 0 !important;
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.page {
  max-width: 900px;
  margin: 3rem auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.title {
  text-align: center;
  font-size: 3.2rem;
  margin-bottom: 0;
  animation: slideDownFade 0.8s ease-out;
  flex: 1;
  min-width: 250px;
}

.refresh-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  animation: slideDownFade 0.8s ease-out;
}

.loading,
.empty {
  text-align: center;
  font-size: 18px;
  opacity: 0.7;
  animation: slideDownFade 0.5s ease-out;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: var(--background-white);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: scaleInUp 0.6s ease-out backwards;
  cursor: pointer;
  position: relative;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card.winner {
  animation: scaleInUp 0.6s ease-out backwards, glow 2s ease-in-out infinite;
  border: 2px solid rgba(255, 215, 0, 0.3);
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }
.card:nth-child(5) { animation-delay: 0.5s; }
.card:nth-child(n+6) { animation-delay: 0.6s; }

.rank {
  font-size: 22px;
  margin-bottom: 10px;
  display: inline-block;
  animation: bounce 1s ease-in-out infinite;
}

.card.winner .rank {
  animation: bounce 0.8s ease-in-out infinite;
  font-size: 28px;
}

.info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 12px;
  animation: slideInLeft 0.5s ease-out 0.3s backwards;
  transition: transform 0.3s ease;
}

.card:hover .avatar {
  transform: scale(1.1);
}

.name {
  font-size: 20px;
  font-weight: 600;
}

.votes {
  font-size: 14px;
  opacity: 0.7;
}

.progress {
  margin-top: 12px;
  height: 8px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, var(--hostel-100), var(--hostel-900));
  border-radius: 4rem;
  animation: fillBar 1.2s ease-out 0.4s forwards;
  box-shadow: 0 0 10px rgba(255, 20, 147, 0.3);
}

.card.winner .bar {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.6), rgba(255, 215, 0, 1));
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
}

.last-updated {
  font-size: 12px;
  opacity: 0.6;
  font-weight: 500;
  color: var(--hostel-50);
}

.refresh-btn {
  padding: 8px 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.refresh-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(255, 20, 147, 0.4);
}

.refresh-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.refresh-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.refresh-btn:disabled svg,
.refresh-btn:disabled span:first-child {
  animation: spin 1s linear infinite;
}

.total {
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
  opacity: 0.8;
  color: var(--hostel-50);
  animation: slideDownFade 0.8s ease-out 0.5s backwards;
}
</style>
