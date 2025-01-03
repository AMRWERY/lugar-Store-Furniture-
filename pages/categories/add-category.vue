<template>
  <div>
    <div class="max-w-2xl p-6 mx-auto mt-5 bg-white border rounded-lg">
      <h2 class="mb-4 text-xl font-bold">{{ $t('form.add_category') }}</h2>
      <form @submit.prevent="handleAddCategory">
        <div class="mb-4">
          <label for="category-title" class="block text-sm font-medium text-gray-700">{{ $t('form.category_title')
            }}</label>
          <input id="category-title" type="text" v-model="newCategoryTitle"
            class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
            :placeholder="$t('form.enter_category_title')" required />
        </div>

        <div class="mb-4">
          <div class="mx-auto overflow-hidden rounded-lg">
            <div class="md:flex">
              <div class="w-full">
                <div
                  class="relative flex items-center justify-center h-48 bg-gray-100 border-2 border-blue-700 border-dashed border-dotted rounded-lg">
                  <div class="absolute">
                    <div class="flex flex-col items-center">
                      <icon name="material-symbols:add-photo-alternate" class="w-20 h-20 text-blue-700" />
                      <span class="block font-normal text-gray-400">{{ $t('form.attach_your_files_here') }}</span>
                    </div>
                  </div>
                  <input type="file" class="w-full h-full opacity-0" @change="handleImageUpload">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center mb-4 space-s-6" v-if="previewImage">
          <img :src="previewImage" class="w-48 h-32 rounded-lg">
        </div>

        <button type="submit" class="w-full px-4 py-2 btn-style">
          <div class="flex items-center justify-center" v-if="loadingOne">
            <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
            <icon name="svg-spinners:270-ring-with-bg" />
          </div>
          <span v-else>{{ $t('btn.add_category') }}</span>
        </button>
      </form>
    </div>

    <!-- dynamic-toast component -->
    <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
      <div class="pointer-events-auto">
        <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
          :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/categoriesStore';

const store = useCategoriesStore();
const loadingOne = ref(false);
const newCategoryTitle = ref('');
const previewImage = ref("");
const selectedImageBase64 = ref("");

const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImageBase64.value = e.target.result;
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.value = "";
  }
};

const handleAddCategory = async () => {
  loadingOne.value = true;
  if (newCategoryTitle.value.trim() && selectedImageBase64.value) {
    await store.addCategory(newCategoryTitle.value.trim(), selectedImageBase64.value);
    showToast.value = true;
    toastTitle.value = t('toast.great');
    toastMessage.value = t('toast.category_added_successfully');
    toastType.value = 'success';
    toastIcon.value = 'mdi:check-circle'
    newCategoryTitle.value = '';
    selectedImageBase64.value = '';
  }
  loadingOne.value = false;
  showToast.value = true;
};

const { t } = useI18n()

definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => t("head.add_category"),
});
</script>