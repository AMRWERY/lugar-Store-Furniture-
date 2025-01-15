<template>
  <div>
    <div class="flex items-center justify-between w-full mt-1 mb-3 ps-3">
      <div class="flex items-center">
        <h3 class="text-lg font-semibold text-slate-800">{{ $t('dashboard.banners') }}</h3>
      </div>
      <nuxt-link to="" type="button" class="flex items-center px-4 py-2.5 btn-style cursor-pointer" @click="openDialog">
        <icon name="ep:plus" class="w-5 h-5 me-2" />
        <span>{{ $t('btn.add_banner') }}</span>
      </nuxt-link>
    </div>

    <div class="flex flex-col">
      <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden ">
            <table class="w-full table-auto text-start min-w-max">
              <thead>
                <tr>
                  <th class="p-4 border-b border-slate-200 bg-slate-50">
                  </th>
                  <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                      #
                    </p>
                  </th>
                  <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                      {{ $t('dashboard.banners') }}
                    </p>
                  </th>
                  <th class="p-4 border-b border-slate-200 bg-slate-50">
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b hover:bg-slate-50 border-slate-200"
                  v-for="(banner, index) in bannersStore.paginatedBanners" :key="banner.id">
                  <td class="p-4 py-5">
                    <input id="checkbox-table-1" type="checkbox" v-model="banner.visible"
                      @change="bannersStore.toggleVisibility(banner.id)"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                  </td>
                  <td class="p-4 py-5">
                    <p class="block text-sm text-slate-500">{{ (bannersStore.currentPage - 1) *
                      bannersStore.bannersPerPage + index + 1 }}</p>
                  </td>
                  <td class="p-4 py-5">
                    <img :src="banner.fileUrl" class="w-16 h-12 rounded-lg image-zoom">
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex items-center justify-end px-4 py-3 mt-4">
              <div class="flex mt-3 space-s-1 ms-auto">
                <button @click="bannersStore.changePage(bannersStore.currentPage - 1)"
                  :disabled="bannersStore.currentPage === 1"
                  class="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                  {{ $t('pagination.previous') }}
                </button>
                <button v-for="page in bannersStore.totalPages" :key="page" @click="bannersStore.changePage(page)"
                  :class="{
                    'bg-slate-800 text-white': page === bannersStore.currentPage,
                    'bg-white text-slate-500': page !== bannersStore.currentPage,
                  }"
                  class="px-3 py-1 text-sm font-normal transition duration-200 border rounded min-w-9 min-h-9 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                  {{ page }}
                </button>
                <button @click="bannersStore.changePage(bannersStore.currentPage + 1)"
                  :disabled="bannersStore.currentPage === bannersStore.totalPages"
                  class="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                  {{ $t('pagination.next') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- banners-dialog component -->
    <transition name="dialog">
      <banners-dialog v-if="isDialogOpen" @close="closeDialog" />
    </transition>
  </div>
</template>

<script setup>
const bannersStore = useBannersStore();

onMounted(() => {
  bannersStore.fetchBanners();
});

const isDialogOpen = ref(false);
const { t } = useI18n()

const openDialog = () => {
  isDialogOpen.value = true;
};
const closeDialog = () => {
  isDialogOpen.value = false;
};

definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => t("head.banners"),
});
</script>

<style scoped>
.image-zoom {
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.image-zoom:hover {
  transform: scale(5);
  transform-origin: center center;
}
</style>