<template>
    <div>
        <div v-if="products.length === 0">
            <!-- skeleton-loader component -->
            <skeleton-loader />
        </div>

        <div class="mx-auto max-w-7xl" data-aos="fade-right" v-else>
            <div class="flex items-center justify-center mt-8 mb-3">
                <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
                <span class="mx-4 text-2xl font-bold leading-10 capitalize">{{ title }}</span>
                <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
            </div>

            <ClientOnly>
                <Carousel v-bind="carouselConfig">
                    <Slide v-for="card in products" :key="card.id">
                        <div class="carousel__item">

                            <div class="p-2">
                                <div class="rounded-lg shadow-md wrapper wrapper-cards">
                                <nuxt-link class="container"
                                    :to="{ path: `/all-products/${card.id}`, query: { id: card.id } }">
                                    <div class="top" :style="{
                                        backgroundImage: `url(${card.imgOne})`,
                                        backgroundSize: '100%',
                                        backgroundPosition: 'center center',
                                        backgroundRepeat: 'no-repeat'
                                    }"></div>
                                    <div :class="['bottom', { clicked: isClicked[card.id] }]">
                                        <div class="left">
                                            <div class="details">

                                                <div
                                                    class="flex flex-col items-center pb-2 text-center ">
                                                    <div class="font-normal ">
                                                        {{ $i18n.locale === 'ar' ? card.titleAr : card.title }}
                                                    </div>
                                                    <div class="flex items-center gap-2 font-semibold " >
                                                        <!-- <span class="text-gray-900 me-1">{{ card.discountedPrice }} {{
                                                            $t('home.le')
                                                            }}</span> -->
                                                        <span class="text-sm text-gray-500 mt-0.5">{{
                                                            card.originalPrice }} {{ $t('home.le')
                                                            }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Bind the click event to handleBuy -->
                                            <div role="button" class="buy" @click.stop.prevent="handleAddToCart(card)">
                                                <i class="fa-solid fa-cart-plus"></i>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="done">
                                                <i class="fa-solid fa-check"></i>
                                            </div>
                                            <div class="details">
                                                <h1>{{ $i18n.locale === 'ar' ? card.titleAr :
                                                    card.title }}</h1>
                                                <p>Added to your cart</p>
                                            </div>
                                            <!-- Bind the click event to handleRemove -->
                                            <div class="remove" @click.stop.prevent="removeItem(card.id)">
                                                <i class="fa-solid fa-xmark"></i>
                                            </div>
                                        </div>
                                    </div>
                                </nuxt-link>
                                <!-- <div class="inside">
                                    <div class="icon">
                                        <i class="fa-solid fa-circle-exclamation"></i>
                                    </div>
                                    <div class="contents">
                                        <table>
                                            <tr>
                                                <th>{{ $i18n.locale === 'ar' ? card.descriptionAr :
                                                    card.description }}</th>
                                            </tr>
                                        </table>
                                    </div>
                                </div> -->
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
const { carouselConfig } = useCarousel();

const props = defineProps({
    categoryTitle: {
        type: String,
        default: ''
    },
    subCategoryTitle: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true,
    }
});

const productsStore = useProductsStore()
const categoryStore = useCategoriesStore()
const cartStore = useCartStore();
const products = ref([])
const subCategories = ref([])
const selectedSubCategoryId = ref('')
const categories = ref([])
const selectedCategoryId = ref('')

onMounted(() => {
    if (props.subCategoryTitle) {
        categoryStore
            .fetchSubCategories()
            .then(() => {
                subCategories.value = categoryStore.subCategories;
                const foundSubCat = subCategories.value.find(
                    (subCat) => subCat.title === props.subCategoryTitle
                );
                selectedSubCategoryId.value = foundSubCat ? foundSubCat.id : "";
                return productsStore.fetchProducts();
            })
            .then(() => {
                products.value = productsStore.products.filter(
                    (product) => product.subCategoryId === selectedSubCategoryId.value
                );
            })
            .catch((error) => {
                console.error("Error in subcategory flow:", error);
            });
    }

    if (props.categoryTitle) {
        categoryStore
            .fetchCategories()
            .then(() => {
                categories.value = categoryStore.categories;
                const foundCat = categories.value.find(
                    (cat) => cat.title === props.categoryTitle
                );
                selectedCategoryId.value = foundCat ? foundCat.id : "";
                return productsStore.fetchProducts();
            })
            .then(() => {
                products.value = productsStore.products.filter(
                    (product) => product.categoryId === selectedCategoryId.value
                );
            })
            .catch((error) => {
                console.error("Error in category flow:", error);
            });
    }

    if (!props.categoryTitle && !props.subCategoryTitle) {
        // console.log("Neither categoryTitle nor subCategoryTitle provided.");
    }
});

const quantity = ref(1)

const handleAddToCart = async (product) => {
    if (!product) {
        return
    }
    try {
        isClicked[product.id] = true
        await cartStore.addToCart(
            product.id,
            product.title,
            product.titleAr,
            product.discountedPrice,
            product.originalPrice,
            product.imgOne,
            product.categoryId,
            product.subCategoryId,
            product.discount,
            quantity.value
        )
    } catch (error) {
        console.error("Error adding product to cart:", error)
    }
}

const removingItem = ref(null);

const removeItem = async (productId) => {
    if (!productId) {
        return;
    }
    try {
        removingItem.value = productId;
        await cartStore.removeFromCart(productId);
        removingItem.value = null;
        isClicked[productId] = false
    } catch (error) {
        console.error("Error removing item:", error);
    }
};

const isClicked = reactive({})
</script>