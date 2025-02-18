<template>
  <div>
    <HeadlessTransitionRoot appear :show="isOpen" as="template">
      <HeadlessDialog as="div" @close="closeDialog" class="relative z-10">
        <HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
          enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25" />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full p-4 text-center">
            <HeadlessTransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <HeadlessDialogPanel
                class="w-full max-w-md p-6 overflow-hidden align-middle transition-all transform bg-white shadow-xl text-start rounded-2xl">
                <HeadlessDialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  <div class="flex justify-between mb-4">
                    <p>{{ $t('dashboard.add_new_banner') }}</p>
                    <button role="button" @click="closeDialog">
                      <icon name="material-symbols:close-small-outline" />
                    </button>
                  </div>
                </HeadlessDialogTitle>
                <div class="mt-2">
                  <div class="mb-4">
                    <div class="mx-auto overflow-hidden rounded-lg">
                      <div class="md:flex">
                        <div class="w-full">
                          <div
                            class="relative flex items-center justify-center h-48 bg-gray-100 border-2 border-blue-700 border-dashed border-dotted rounded-lg">
                            <div class="absolute">
                              <div class="flex flex-col items-center">
                                <icon name="material-symbols:add-photo-alternate" class="w-20 h-20 text-blue-700" />
                                <span class="block font-normal text-gray-400">{{ $t('form.attach_your_files_here')
                                }}</span>
                              </div>
                            </div>
                            <input type="file" class="w-full h-full opacity-0" multiple @change="handleFileChange">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-center mb-4 space-s-6">
                    <div v-if="previewImage" class="mt-4 border border-gray-200">
                      <img :src="previewImage" class="w-48 h-32 rounded-lg" />
                    </div>
                  </div>
                </div>

                <div class="flex justify-end mt-6 space-s-4">
                  <button class="px-6 py-2.5 btn-style" @click="uploadFile" :disabled="!selectedFile">
                    <div class="flex items-center justify-center" v-if="loading">
                      <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
                      <icon name="svg-spinners:270-ring-with-bg" />
                    </div>
                    <span v-else>{{ $t("btn.upload") }}</span>
                  </button>
                </div>
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean
})

const bannerStore = useBannersStore()
const selectedFile = ref(null);
const previewImage = ref(null);
const loading = ref(false)

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const uploadFile = () => {
  loading.value = true;
  if (selectedFile.value) {
    bannerStore.addNewBanner(selectedFile.value)
      .then((createBanner) => {
        if (createBanner) {
          let response = JSON.parse(createBanner);
          if (response?.success && response?.file_url) {
            loading.value = false;
            closeDialog();
            return bannerStore.uploadImageToBannerCollection(response.file_url);
          }
        }
        return Promise.reject("Invalid response");
      })
      .then(() => bannerStore.fetchBanners())
      .then(() => {
        closeDialog();
        selectedFile.value = null;
        previewImage.value = null;
      })
      .catch((error) => {
        loading.value = false;
        console.error("Error during upload or saving:", error);
      });
  }
};

const emit = defineEmits(['close']);

const closeDialog = () => {
  emit('close');
};
</script>