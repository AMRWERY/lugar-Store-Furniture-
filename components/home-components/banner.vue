<template>
  <div>
    <div class="relative w-full bg-center bg-cover hero-section" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="absolute inset-0 opacity-50"></div>
      <div class="relative z-10 flex items-center justify-center w-full h-full text-center text-white">
        <div class="px-6 space-y-6 sm:px-8 md:px-12">
          <h1 class="text-4xl font-bold text-black sm:text-5xl md:text-6xl">
            INTERIOR DESIGN IN HOME
          </h1>
          <p class="text-lg sm:text-2xl md:text-4xl">Summer Sale</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const heroImage = 'https://justfields.com/storage/projects/7M5rV059/banner.jpg';
</script>

<style scoped>
.hero-section {
  background-size: cover;
  background-position: center;
  height: 60vh;
}

@media (min-width: 640px) {
  .hero-section {
    height: 70vh;
  }
}

@media (min-width: 1024px) {
  .hero-section {
    height: 80vh;
  }
}

@media (min-width: 1280px) {
  .hero-section {
    height: 100vh;
  }
}
</style>