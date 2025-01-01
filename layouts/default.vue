<template>
  <div>
    <div :dir="isRTL ? 'rtl' : 'ltr'" :class="{ 'rtl': isRTL, 'ltr': !isRTL }">
      <navbar />
      <div class="max-w-full min-h-screen px-2 py-2 mx-auto sm:px-6 lg:px-4">
        <main class="mt-6">
          <slot />
        </main>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();

const isRTL = computed(() => {
  return locale.value === 'ar';
});
</script>