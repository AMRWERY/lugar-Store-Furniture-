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
            <a href="#tabs-home"
              class="my-2 block rounded-full border-2 border-gray-300 px-7 pb-3.5 pt-4 text-sm leading-tight text-neutral-600 font-semibold hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none focus:border-gray-800 data-[twe-nav-active]:border-gray-800 data-[twe-nav-active]:text-gray-800 capitalize"
              data-twe-toggle="pill" data-twe-target="#tabs-home" data-twe-nav-active role="tab"
              aria-controls="tabs-home" aria-selected="true">Home</a>
          </li>
          <li role="presentation" class="mx-1">
            <a href="#tabs-profile"
              class="my-2 block rounded-full border-2 border-gray-300 px-7 pb-3.5 pt-4 text-sm leading-tight text-neutral-600 font-semibold hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none focus:border-gray-800 data-[twe-nav-active]:border-gray-800 data-[twe-nav-active]:text-gray-800 capitalize"
              data-twe-toggle="pill" data-twe-target="#tabs-profile" role="tab" aria-controls="tabs-profile"
              aria-selected="false">Profile</a>
          </li>
          <li role="presentation" class="mx-1">
            <a href="#tabs-messages"
              class="my-2 block rounded-full border-2 border-gray-300 px-7 pb-3.5 pt-4 text-sm leading-tight text-neutral-600 font-semibold hover:isolate hover:border-gray-600 hover:bg-neutral-100 focus:outline-none focus:border-gray-800 data-[twe-nav-active]:border-gray-800 data-[twe-nav-active]:text-gray-800 capitalize"
              data-twe-toggle="pill" data-twe-target="#tabs-messages" role="tab" aria-controls="tabs-messages"
              aria-selected="false">Messages</a>
          </li>
        </ul>
      </div>

      <!-- Tabs content -->
      <div class="mb-6">
        <div class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-home" role="tabpanel" aria-labelledby="tabs-home-tab" data-twe-tab-active>
          Home tab content
        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-profile" role="tabpanel" aria-labelledby="tabs-profile-tab">
          Profile tab content
        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
          id="tabs-messages" role="tabpanel" aria-labelledby="tabs-profile-tab">
          Messages tab content
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
onMounted(async () => {
  const { Tab, initTWE } = await import("tw-elements");
  initTWE({ Tab });
});
</script>