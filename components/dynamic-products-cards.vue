<template>
  <div>
    <div class="mx-auto max-w-7xl">
      <ClientOnly>
        <Carousel v-bind="config">
          <Slide v-for="card in products" :key="card.id">
            <div class="carousel__item">
              <div class="relative flex flex-col w-[300px] max-w-xs overflow-hidden bg-white group">
                <nuxt-link class="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl" to="">
                  <div class="relative w-full h-full">
                    <img class="absolute top-0 object-cover w-full h-full transition-all duration-500 ease-in-out end-0"
                      :src="card.imgOne" />
                    <img
                      class="absolute top-0 object-cover w-full h-full transition-all duration-500 ease-in-out opacity-0 end-0 group-hover:opacity-100"
                      :src="card.imgTwo" />
                  </div>
                </nuxt-link>

                <div class="px-5 pb-5 mt-4">
                  <nuxt-link :to="card.link" class="capitalize">
                    <h5 class="font-bold tracking-tight truncate text-md text-slate-900">
                      {{ card.title }}
                    </h5>
                  </nuxt-link>
                  <div class="flex flex-col items-center justify-between mt-2 mb-5 font-semibold text-center ms-1">
                    <p class="flex items-center space-s-1">
                      <span class="text-gray-900 me-1">{{ card.discountedPrice }} LE</span>
                      <span class="text-sm text-gray-500 line-through mt-0.5">{{ card.originalPrice }} LE</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  categoryTitle: {
    type: String,
    default: ''
  },
  subCategoryTitle: {
    type: String,
    default: ''
  },
});

const productsStore = useNewProductsStoreStore()
const products = ref([])
const categoryStore = useCategoriesStore()
const subCategories = ref([])
const selectedSubCategoryId = ref('')
const categories = ref([])
const selectedCategoryId = ref('')

onMounted(async () => {
  if (props.subCategoryTitle) {
    await categoryStore.fetchSubCategories();
    subCategories.value = categoryStore.subCategories;
    selectedSubCategoryId.value = subCategories.value.find((subCat) => subCat.title === props.subCategoryTitle)?.id;
    // console.log('categoryStore.subCategories', categoryStore.subCategories);
    await productsStore.fetchProducts();
    products.value = productsStore.products.filter((product) => product.subCategoryId === selectedSubCategoryId.value);
  }

  if (props.categoryTitle) {
    await categoryStore.fetchCategories().then(() => {
      categories.value = categoryStore.categories;
      selectedCategoryId.value = categories.value.find((cat) => cat.title == props.categoryTitle)?.id;
      productsStore.fetchProducts().then(() => {
        products.value = productsStore.products.filter((product) => product.categoryId === selectedCategoryId.value);
      });
    });
  }

  if (!props.categoryTitle && !props.subCategoryTitle) {
    console.log('Neither categoryTitle nor subCategoryTitle provided.');
  }
});
</script>