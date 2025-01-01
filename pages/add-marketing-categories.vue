<template>
  <div>
    <div class="max-w-2xl p-6 mx-auto mt-5 bg-white border rounded-lg">

      <h2 class="mt-8 mb-4 text-xl font-bold">{{ $t('form.add_subcategory') }}</h2>
      <form @submit.prevent="handleAddSubCategory">
        <div class="mb-4">
          <label for="subcategory-title" class="block text-sm font-medium text-gray-700">{{ $t('form.subcategory_title')
            }}</label>
          <input id="subcategory-title" type="text" v-model="newSubCategoryTitle"
            class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
            :placeholder="$t('form.enter_subcategory_title')" required />
        </div>

        <div class="mb-4">
          <div class="mx-auto overflow-hidden rounded-lg ">
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
                  <input type="file" class="w-full h-full opacity-0" @change="handleFileChange" multiple>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center mb-4 space-s-6">
          <div v-if="product.imgOne" class="mt-4 border border-gray-200">
            <img :src="product.imgOne" class="w-48 h-32 rounded-lg">
          </div>
        </div>

        <button type="submit" class="px-4 py-2 text-white bg-green-500 rounded-lg">
          <div class="flex items-center justify-center" v-if="loadingTwo">
            <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
            <icon name="svg-spinners:270-ring-with-bg" />
          </div>
          <span v-else>{{ $t('btn.add_marketing_category') }}</span>
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
const loadingTwo = ref(false);
const newSubCategoryTitle = ref('');
const product = ref({})

const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

const handleFileChange = async (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 4) {
    alert("You can only upload up to 4 images.");
    return;
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload an image in JPEG, PNG, or WebP format.');
      return;
    }
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Image size must not exceed 2MB.');
      return;
    }
    const base64Image = await convertToBase64(file);
    if (i === 0) {
      product.value.imgOne = base64Image;
    }
  }
};

// Convert image to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const handleAddSubCategory = async () => {
  loadingTwo.value = true;
  try {
    await store.addSubCategory(newSubCategoryTitle.value.trim(), product.value.imgOne);
    toastTitle.value = t('toast.great');
    toastMessage.value = t('toast.marketing_category_added_successfully');
    resetForm();
    toastType.value = 'success';
    toastIcon.value = 'mdi:check-circle';
    showToast.value = true;
  } catch (error) {
    toastTitle.value = t('toast.error');
    toastMessage.value = t('toast.subcategory_add_failed');
    toastType.value = 'error';
    toastIcon.value = 'mdi:alert-circle';
    showToast.value = true;
  } finally {
    newSubCategoryTitle.value = '';
    loadingTwo.value = false;
  }
};

const resetForm = () => {
  product.value = { title: '', imgOne: '' };
};

const { t } = useI18n()

definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => t("head.categories"),
});
</script>