<template>
  <div>
    <div class="mx-auto my-12 max-w-7xl">
      <div class="flex items-center justify-center mt-8 mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
        <span class="mx-4 text-2xl font-bold leading-10 capitalize">new products</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
      </div>

      <!-- Tabs navigation -->
      <div class="flex justify-center">
        <ul class="flex flex-row flex-wrap mx-auto mb-5 list-none border-b-0 ps-0 space-s-4" role="tablist"
          data-twe-nav-ref>
          <li role="presentation" class="mx-1">
            <a href="#tabs-sofa"
              class="my-2 block rounded-full border-2 border-gray-300 px-7 pb-3.5 pt-4 text-sm leading-tight text-neutral-600 font-semibold hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none focus:border-gray-800 data-[twe-nav-active]:border-gray-800 data-[twe-nav-active]:text-gray-800 capitalize"
              data-twe-toggle="pill" data-twe-target="#tabs-sofa" data-twe-nav-active role="tab"
              aria-controls="tabs-sofa" aria-selected="true">Sofa</a>
          </li>
          <li role="presentation" class="mx-1">
            <a href="#tabs-chairs"
              class="my-2 block rounded-full border-2 border-gray-300 px-7 pb-3.5 pt-4 text-sm leading-tight text-neutral-600 font-semibold hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none focus:border-gray-800 data-[twe-nav-active]:border-gray-800 data-[twe-nav-active]:text-gray-800 capitalize"
              data-twe-toggle="pill" data-twe-target="#tabs-chairs" role="tab" aria-controls="tabs-chairs"
              aria-selected="false">Chairs</a>
          </li>
          <li role="presentation" class="mx-1">
            <a href="#tabs-bed-rooms"
              class="my-2 block rounded-full border-2 border-gray-300 px-7 pb-3.5 pt-4 text-sm leading-tight text-neutral-600 font-semibold hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none focus:border-gray-800 data-[twe-nav-active]:border-gray-800 data-[twe-nav-active]:text-gray-800 capitalize"
              data-twe-toggle="pill" data-twe-target="#tabs-bed-rooms" role="tab" aria-controls="tabs-bed-rooms"
              aria-selected="false">Bed Rooms</a>
          </li>
          <li role="presentation" class="mx-1">
            <a href="#tabs-living-room"
              class="my-2 block rounded-full border-2 border-gray-300 px-7 pb-3.5 pt-4 text-sm leading-tight text-neutral-600 font-semibold hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none focus:border-gray-800 data-[twe-nav-active]:border-gray-800 data-[twe-nav-active]:text-gray-800 capitalize"
              data-twe-toggle="pill" data-twe-target="#tabs-living-room" role="tab" aria-controls="tabs-living-room"
              aria-selected="false">Living Room</a>
          </li>
          <li role="presentation" class="mx-1">
            <a href="#tabs-dining-room"
              class="my-2 block rounded-full border-2 border-gray-300 px-7 pb-3.5 pt-4 text-sm leading-tight text-neutral-600 font-semibold hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none focus:border-gray-800 data-[twe-nav-active]:border-gray-800 data-[twe-nav-active]:text-gray-800 capitalize"
              data-twe-toggle="pill" data-twe-target="#tabs-dining-room" role="tab" aria-controls="tabs-dining-room"
              aria-selected="false">Dining Room</a>
          </li>
        </ul>
      </div>

      <!-- Tabs content -->
      <div class="mb-6">
        <div class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-sofa" role="tabpanel" aria-labelledby="tabs-sofa-tab" data-twe-tab-active>
          <dynamic-products-cards :config="config" :categoryTitle="'Sofa'" />
        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-chairs" role="tabpanel" aria-labelledby="tabs-chairs-tab">
          <dynamic-products-cards :config="config" :categoryTitle="'Chairs'" />

        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-bed-rooms" role="tabpanel" aria-labelledby="tabs-bed-rooms-tab">
          <dynamic-products-cards :config="config" :categoryTitle="'Bedrooms'" />

        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-living-room" role="tabpanel" aria-labelledby="tabs-living-room-tab">
          <dynamic-products-cards :config="config" :categoryTitle="'Living Room'" />

        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-dining-room" role="tabpanel" aria-labelledby="tabs-dining-room-tab">
          <dynamic-products-cards :config="config" :categoryTitle="'Dining Room'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = {
  itemsToShow: 4,
  wrapAround: true,
  gap: 5,
  snapAlign: 'center',
  breakpoints: {
    200: { itemsToShow: 1.5, snapAlign: 'center' },
    400: { itemsToShow: 2, snapAlign: 'start' },
    700: { itemsToShow: 3, snapAlign: 'center' },
    1024: { itemsToShow: 4, snapAlign: 'start' },
  },
};

onMounted(async () => {
  const { Tab, initTWE } = await import("tw-elements");
  initTWE({ Tab });
});
</script>