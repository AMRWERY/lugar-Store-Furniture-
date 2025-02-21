<template>
  <div>
    <div class="mx-auto my-12 max-w-7xl">
      <div class="flex items-center justify-center mt-8 mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
        <span class="mx-4 text-2xl font-bold leading-10 capitalize">{{ $t('home.new_products') }}</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
      </div>

      <div class="w-full max-w-full px-2 pb-16 sm:px-0">
        <HeadlessTabGroup>
          <div class="flex justify-center">
            <HeadlessTabList class="flex flex-row flex-wrap mx-auto mb-5 list-none border-b-0 ps-0 space-s-6">
              <HeadlessTab v-slot="{ selected }">
                <button :class="[
                  'my-2 block rounded-full focus:border-gray-800 px-7 pb-3.5 pt-4 leading-tight text-neutral-600 font-semibold capitalize hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none',
                  selected ? 'border-2 border-gray-800 bg-white' : 'border-2 border-gray-300 bg-white'
                ]">
                  {{ $t('home.sofa') }}
                </button>
              </HeadlessTab>
              <HeadlessTab v-slot="{ selected }">
                <button :class="[
                  'my-2 block rounded-full focus:border-gray-800 px-7 pb-3.5 pt-4 leading-tight text-neutral-600 font-semibold capitalize hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none',
                  selected ? 'border-2 border-gray-800 bg-white' : 'border-2 border-gray-300 bg-white'
                ]">
                  {{ $t('home.chairs') }}
                </button>
              </HeadlessTab>
              <HeadlessTab v-slot="{ selected }">
                <button :class="[
                  'my-2 block rounded-full focus:border-gray-800 px-7 pb-3.5 pt-4 leading-tight text-neutral-600 font-semibold capitalize hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none',
                  selected ? 'border-2 border-gray-800 bg-white' : 'border-2 border-gray-300 bg-white'
                ]">
                  {{ $t('home.bed_rooms') }}
                </button>
              </HeadlessTab>
              <HeadlessTab v-slot="{ selected }">
                <button :class="[
                  'my-2 block rounded-full focus:border-gray-800 px-7 pb-3.5 pt-4 leading-tight text-neutral-600 font-semibold capitalize hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none',
                  selected ? 'border-2 border-gray-800 bg-white' : 'border-2 border-gray-300 bg-white'
                ]">
                  {{ $t('home.living_rooms') }}
                </button>
              </HeadlessTab>
              <HeadlessTab v-slot="{ selected }">
                <button :class="[
                  'my-2 block rounded-full focus:border-gray-800 px-7 pb-3.5 pt-4 leading-tight text-neutral-600 font-semibold capitalize hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none',
                  selected ? 'border-2 border-gray-800 bg-white' : 'border-2 border-gray-300 bg-white'
                ]">
                  {{ $t('home.dining_rooms') }}
                </button>
              </HeadlessTab>
            </HeadlessTabList>
          </div>

          <HeadlessTabPanels class="mt-2">
            <HeadlessTabPanel :class="[
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]">
              <!--dynamic-products-cards component -->
              <dynamic-products-cards :config="config" :categoryTitle="'Chairs'" />
            </HeadlessTabPanel>
            <HeadlessTabPanel :class="[
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]">
              <!--dynamic-products-cards component -->
              <dynamic-products-cards :config="config" :categoryTitle="'Chairs'" />
            </HeadlessTabPanel>
            <HeadlessTabPanel :class="[
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]">
              <!--dynamic-products-cards component -->
              <dynamic-products-cards :config="config" :categoryTitle="'Bedrooms'" />
            </HeadlessTabPanel>
            <HeadlessTabPanel :class="[
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]">
              <!--dynamic-products-cards component -->
              <dynamic-products-cards :config="config" :categoryTitle="'Living Room'" />
            </HeadlessTabPanel>
            <HeadlessTabPanel :class="[
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]">
              <!--dynamic-products-cards component -->
              <dynamic-products-cards :config="config" :categoryTitle="'Dining Room'" />
            </HeadlessTabPanel>
          </HeadlessTabPanels>
        </HeadlessTabGroup>
      </div>
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