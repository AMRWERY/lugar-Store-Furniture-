<template>
  <div>
    <div class="flex items-center justify-between">
      <h3 class="py-2 mt-5 mb-12 text-2xl font-bold text-start">{{ $t('dashboard.banners') }}</h3>
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
                <tr class="border-b hover:bg-slate-50 border-slate-200">
                  <td class="p-4 py-5">
                    <input id="checkbox-table-1" type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                  </td>
                  <td class="p-4 py-5">
                    <p class="block text-sm text-slate-500">1</p>
                  </td>
                  <td class="p-4 py-5">
                    <img src="@/assets/banner-img-01.jpg" class="w-16 h-12 rounded-lg">
                  </td>
                  <td class="p-4 py-5">
                    <p class="text-sm text-blue-700 cursor-pointer" @click="openDialog">View Banner</p>
                  </td>
                  <td class="p-4 py-5">
                    <p class="text-sm text-blue-700 cursor-pointer" @click="openDialog">Add Banner</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- banners-dialog component -->
    <transition name="dialog">
      <banners-dialog v-if="isDialogOpen" @close="closeDialog" />
    </transition>

    <!-- dynamic-toast component -->
    <!-- <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
            <div class="pointer-events-auto">
                <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
                    :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
            </div>
        </div> -->
  </div>
</template>

<script setup>
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