<template>
  <div>
    <div class="mx-auto max-w-7xl">
      <div class="flex items-center justify-center mt-8 mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
        <span class="mx-4 text-2xl font-bold leading-10 capitalize">{{ $t('home.special_offers') }}</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
      </div>

      <dynamic-products-cards :config="config" :subCategoryTitle="'Top Seller'" />
    </div>
  </div>
</template>

<script setup>
const config = {
  itemsToShow: 4,
  wrapAround: false,
  gap: 5,
  snapAlign: 'center',
  breakpoints: {
    200: { itemsToShow: 1.5, snapAlign: 'center' },
    400: { itemsToShow: 2, snapAlign: 'start' },
    700: { itemsToShow: 3, snapAlign: 'center' },
    1024: { itemsToShow: 4, snapAlign: 'start' },
  },
};
</script>