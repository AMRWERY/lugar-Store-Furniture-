<template>
  <div>
    <div class="mt-5">
      <products-dashboard />
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

definePageMeta({
  layout: 'dashboard',
});

useHead({
  titleTemplate: () => t('head.products'),
});
</script>