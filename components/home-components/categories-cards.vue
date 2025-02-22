<template>
    <div>
        <div v-if="store.categories.length === 0">
            <!-- skeleton-loader component -->
            <skeleton-loader />
        </div>

        <div class="mx-auto my-12 max-w-8xl" data-aos="fade-left">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
                <nuxt-link v-for="(card, index) in store.categories" :key="card.id"
                    :to="{ path: '/all-products', query: { categoryId: card.id } }"
                    class="relative z-50 overflow-hidden bg-gray-100 rounded-lg cursor-pointer group transit">
                    <div class="relative w-full h-full">
                        <img :src="card.imgOne" alt="category image" class="object-cover w-full h-full" />
                        <div
                            class="absolute inset-0 z-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-50">
                            <!-- Overlay content container -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <!-- Wrap the text and underline in an inline-block container -->
                                <div class="inline-block">
                                    <p class="text-xl text-white font-[eb-garamond-italic] xs:text-5xl md:text-3xl">Save
                                        20%</p>
                                    <!-- Underline element: initial width 0, animates to full container width -->
                                    <span
                                        class="block h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="absolute z-10 p-2 text-xl font-bold text-red-500 transition-opacity font-[libre-baskerville-regular] xs:text-6xl md:text-4xl"
                            :class="getTitlePositionClass(index)">
                            {{ $i18n.locale === 'ar' ? card.titleAr : card.title }}
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>
const store = useCategoriesStore()

onMounted(() => {
    store.fetchCategories();
});

const positions = [
    'top-4 start-4',
    'top-4 end-4',
    'bottom-4 start-4',
    'bottom-4 end-4',
    'start-4 top-4'
];

const getTitlePositionClass = (index) => {
    return positions[index % positions.length];
};
</script>