<script setup lang="ts">
type ParticipantResult = {
  id: number
  name: string
  imageUrl?: string | null
  _count: {
    votes: number
  }
}

const { data, pending } = await useFetch<ParticipantResult[]>('/api/results')

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
</script>

<template>
  <div class="page">
    <h1 class="title">Результаты голосования</h1>

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
          <span v-if="index === 0">🥇</span>
          <span v-else-if="index === 1">🥈</span>
          <span v-else-if="index === 2">🥉</span>
          <span v-else>#{{ index + 1 }}</span>
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
.page {
  max-width: 900px;
  margin: 60px auto;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
}

.loading,
.empty {
  text-align: center;
  font-size: 18px;
  opacity: 0.7;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  transition: 0.2s ease;
}

.card.winner {
  border: 2px solid gold;
  box-shadow: 0 8px 30px rgba(255, 200, 0, 0.25);
}

.rank {
  font-size: 22px;
  margin-bottom: 10px;
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
  background: linear-gradient(90deg, #6c63ff, #8f88ff);
  transition: width 0.4s ease;
}

.total {
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
  opacity: 0.8;
}
</style>
