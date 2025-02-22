<template>
  <div>
    <div class="mx-auto my-12 max-w-7xl" data-aos="fade-right">
      <div class="flex items-center justify-center mt-8 mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
        <span class="mx-4 text-2xl font-bold leading-10 text-center capitalize">{{ $t('home.new_products') }}</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
      </div>

      <div class="w-full max-w-full px-2 pb-16 sm:px-0">
        <HeadlessTabGroup>
          <div class="flex justify-center">
            <HeadlessTabList
              class="flex flex-row px-2 mx-auto mb-5 overflow-x-auto list-none border-b-0 space-s-3 flex-nowrap scrollbar-hide sm:flex-wrap sm:space-s-6 sm:overflow-visible sm:px-0">
              <HeadlessTab v-for="(tab, index) in tabs" :key="index" v-slot="{ selected }" class="shrink-0 sm:shrink">
                <button :class="[
                  'my-2 block rounded-full focus:border-gray-800 px-4 pb-2 pt-3 text-sm leading-tight font-semibold capitalize',
                  'hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none border-2',
                  'sm:px-7 sm:pb-3.5 sm:pt-4 sm:text-base',
                  selected ? 'border-gray-800 bg-white' : 'border-gray-300 bg-white'
                ]">
                  {{ $t(`home.${tab.key}`) }}
                </button>
              </HeadlessTab>
            </HeadlessTabList>
          </div>

          <HeadlessTabPanels class="mt-2">
            <HeadlessTabPanel v-for="(tab, index) in tabs" :key="index"
              class="p-3 bg-white rounded-xl ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
              <dynamic-products-cards :categoryTitle="tab.category" />
            </HeadlessTabPanel>
          </HeadlessTabPanels>
        </HeadlessTabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  { key: 'sofa', category: 'Sofa' },
  { key: 'chairs', category: 'Chairs' },
  { key: 'bed_rooms', category: 'Bedrooms' },
  { key: 'living_rooms', category: 'Living Room' },
  { key: 'dining_rooms', category: 'Dining Room' }
];
</script>

<style>
.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
}
</style>