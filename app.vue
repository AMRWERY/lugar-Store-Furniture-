<template>
  <div>
    <NuxtLayout>
      <progress-bar />
      <NuxtPage />
      <whatsapp-componenet />
      <scroll-to-top />
    </NuxtLayout>
  </div>
</template>

<script setup>
// tailwind-elements referance

// onMounted(async () => {
//   const { Tooltip, initTWE } = await import("tw-elements");
//   initTWE({ Tooltip });
// });

useHead({
  titleTemplate: 'Lugar Store',
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>