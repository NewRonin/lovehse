<script setup lang="ts">

const { data: participants } = await useFetch('/api/participants')
const selected = ref<string | null>(null)
const error = ref('')

async function vote() {
  if (!selected.value) return

  try {
    await $fetch('/api/vote', {
      method: 'POST',
      body: { participantId: selected.value }
    })

    navigateTo('/results')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка голосования'
  }
}
</script>
