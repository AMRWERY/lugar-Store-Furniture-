<template>
  <div>
    <div class="max-w-2xl px-8 py-6 mx-auto my-8 bg-white border rounded-lg">
      <h2 class="mb-4 text-2xl font-medium text-center">{{ $t('form.edit_product')
        }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="main-category" class="block mb-2 font-medium text-gray-700">{{ $t('form.category') }}</label>
          <select id="main-category" name="main-category" v-model="selectedCategory"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
            <option value="" disabled>{{ $t('form.select_category') }}</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="sub-category" class="block mb-2 font-medium text-gray-700">{{ $t('form.marketing_categories')
            }}</label>
          <select id="sub-category" name="sub-category" v-model="selectedSubCategory"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
            <option value="" disabled>{{ $t('form.select_marketing_category') }}</option>
            <option v-for="subCategory in subCategories" :key="subCategory.id" :value="subCategory.id">{{
              subCategory.title }}</option>
          </select>
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
          <div v-if="product.imgTwo" class="mt-4 border border-gray-200">
            <img :src="product.imgTwo" class="w-48 h-32 rounded-lg">
          </div>
          <div v-if="product.imgThree" class="mt-4 border border-gray-200">
            <img :src="product.imgThree" class="w-48 h-32 rounded-lg">
          </div>
          <div v-if="product.imgFour" class="mt-4 border border-gray-200">
            <img :src="product.imgFour" class="w-48 h-32 rounded-lg">
          </div>
        </div>

        <div class="mb-4">
          <label for="video-link" class="block mb-2 font-medium text-gray-700">
            {{ $t('form.video_link') }}
          </label>
          <input type="url" id="video-link" v-model="product.videoLink"
            placeholder="Enter video URL (e.g., YouTube, Instagram, Vimeo)"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400" />
        </div>

        <div v-if="isValidVideoUrl(product.videoLink)" class="mt-4">
          <iframe v-if="isValidInstagramUrl(product.videoLink)" :src="getInstagramEmbedUrl(product.videoLink)"
            width="100%" height="400" frameborder="0" allowfullscreen class="rounded-lg">
          </iframe>
          <iframe v-else :src="product.videoLink" width="100%" height="400" frameborder="0" allowfullscreen
            class="rounded-lg">
          </iframe>
        </div>

        <div class="mb-4">
          <label for="title" class="block mb-2 font-medium text-gray-700">{{ $t('form.title') }}</label>
          <input type="text" id="title" name="title" v-model="product.title"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="title-ar" class="block mb-2 font-medium text-gray-700">
            {{ $t('form.title_ar') }}
          </label>
          <input type="text" id="title-ar" name="title-ar" v-model="product.titleAr"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="description" class="block mb-2 font-medium text-gray-700">{{ $t('form.description') }}</label>
          <textarea id="description" rows="4" name="description" v-model="product.description"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400" />
        </div>

        <div class="mb-4">
          <label for="description-ar" class="block mb-2 font-medium text-gray-700">
            {{ $t('form.description_ar') }}
          </label>
          <textarea id="description-ar" rows="4" name="description-ar" v-model="product.descriptionAr"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
  </textarea>
        </div>

        <div class="mb-4">
          <label for="original-price" class="block mb-2 font-medium text-gray-700">{{ $t('form.original_price')
            }}</label>
          <input type="text" id="original-price" name="original-price" v-model="product.originalPrice"
            @input="(event) => handleInput(event, 'originalPrice')" @blur="() => handleBlur('originalPrice')"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="price" class="block mb-2 font-medium text-gray-700">{{ $t('form.discounted_price') }}</label>
          <input type="text" id="price" name="price" v-model="product.discountedPrice"
            @input="(event) => handleInput(event, 'discountedPrice')" @blur="() => handleBlur('discountedPrice')"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="discount" class="block mb-2 font-medium text-gray-700">{{ $t('form.discount') }}</label>
          <input type="text" id="discount" name="discount" v-model="product.discount"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
        </div>

        <div class="mb-4">
          <label for="availability" class="block mb-2 font-medium text-gray-700">{{ $t('form.availability') }}</label>
          <select id="availability" name="availability" v-model="product.availability"
            class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400">
            <option value="" disabled>{{ $t('form.select_availability') }}</option>
            <option>In stock</option>
            <option>Out of stock</option>
          </select>
        </div>

        <div>
          <button type="submit" class="w-full px-4 py-2 btn-style">
            <div class="flex items-center justify-center" v-if="loading">
              <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
              <icon name="svg-spinners:270-ring-with-bg" />
            </div>
            <span v-else>{{ $t('btn.update_product') }}</span>
          </button>
        </div>
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
import { useProductsStore } from '@/stores/productsStore';

const store = useProductsStore()
const productStore = useNewProductsStoreStore()
const loading = ref(false);
const categories = ref([])
const subCategories = ref([])
const selectedCategory = ref('')
const selectedSubCategory = ref('')
const route = useRoute();
const productId = route.params.id

const product = ref({ title: '', description: '', discountedPrice: '', originalPrice: '', discount: '', videoLink: '', titleAr: '', descriptionAr: '', categoryId: '', subCategoryId: '', productId: '' })

onMounted(async () => {
  await store.fetchCategories();
  categories.value = store.categories;
  await store.fetchSubCategories();
  subCategories.value = store.subCategories;

  if (productId) {
    const productDetail = await productStore.fetchProductDetail(productId);
    product.value = productDetail;
    selectedCategory.value = productDetail.categoryId;
    selectedSubCategory.value = productDetail.subCategoryId;
  }
});

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
    } else if (i === 1) {
      product.value.imgTwo = base64Image;
    } else if (i === 2) {
      product.value.imgThree = base64Image;
    } else if (i === 3) {
      product.value.imgFour = base64Image;
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

const { t } = useI18n();

const handleSubmit = async () => {
  loading.value = true;
  try {
    await store.updateProduct(productId, product.value);
    const updatedProduct = await productStore.fetchProductDetail(productId);
    product.value = updatedProduct;
    showToast.value = true;
    toastTitle.value = "Success";
    toastMessage.value = "Product updated successfully!";
    toastType.value = "success";
  } catch (error) {
    console.error("Error updating product:", error);
    showToast.value = true;
    toastTitle.value = "Error";
    toastMessage.value = "Failed to update product.";
    toastType.value = "error";
  } finally {
    loading.value = false;
  }
};

const isValidInstagramUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/p\/[A-Za-z0-9-_]+\/?$/;
  return regex.test(url);
};

// Generate the Instagram embed URL
const getInstagramEmbedUrl = (url) => {
  const match = url.match(/\/p\/[A-Za-z0-9-_]+/);
  return match ? `https://www.instagram.com${match[0]}/embed` : '';
};

const isValidVideoUrl = (url) => {
  const videoRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|instagram\.com|vimeo\.com)\/.+$/;
  return videoRegex.test(url);
};

const { formatDecimal, enforceTwoDecimalPlaces } = useFormatter();

const handleInput = (event, key) => {
  const inputElement = event.target;
  const cursorPosition = inputElement.selectionStart;
  const formattedValue = formatDecimal(inputElement.value);
  product.value[key] = formattedValue;
  nextTick(() => {
    inputElement.setSelectionRange(cursorPosition, cursorPosition);
  });
};

const handleBlur = (key) => {
  product.value[key] = enforceTwoDecimalPlaces(product.value[key]);
};

definePageMeta({
  layout: "dashboard",
});

useHead({
  titleTemplate: () => t('head.edit_product'),
});
</script>