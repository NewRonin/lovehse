<template>
  <div class="layout">
    <div class="content">
      <h1>ВЛЮБИСЬ</h1>
      <slot />
    </div>

  </div>
</template>

<script setup lang="ts">
const scaleContacts = ref(false)

function scrollToFooter() {
  const footer = document.getElementById('footer');

  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' });
    scaleContacts.value = true

    setTimeout(() => scaleContacts.value = false, 4000)
  }
}
</script>

<style scoped lang="scss">
.layout {
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    width: 100dvw;
    min-height: 100dvh;
  }

.content{
  position: relative;
  flex: 1;
  width: 100dvw;
}

h1 {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3.2rem;
  text-align: center;
  margin: 2rem 0;
  font-family: DelaGothicOne;
  color: var(--background-white);
}
</style>