<template>
    <div class="flex justify-center">
        <div class="text-gray-800 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <ClientOnly>
                <div class="mx-auto max-w-7xl">
                    <!-- Carousel Wrapper -->
                    <div class="overflow-hidden rounded-lg shadow-lg">
                        <!-- Carousel -->
                        <div class="carousel">
                            <!-- Slide -->
                            <div class="bg-white carousel-item dark:bg-gray-800" v-for="banner in filteredBanners"
                                :key="banner.id">
                                <img :src="banner?.fileUrl" class="object-cover w-full rounded-md h-96">
                            </div>
                        </div>
                    </div>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup>
const bannersStore = useBannersStore();
let filteredBanners = ref([]);

onMounted(async () => {
    await bannersStore.fetchBanners();
    filteredBanners.value = bannersStore.banners.filter(banner => banner.visible && banner.selected);

    // console.log('Filtered Banners:', filteredBanners.value.length);
});
</script>

<style scoped>
@keyframes slide {
    0% {
        transform: translateX(0%);
    }

    20% {
        transform: translateX(0%);
    }

    25% {
        transform: translateX(-100%);
    }

    45% {
        transform: translateX(-100%);
    }

    50% {
        transform: translateX(-200%);
    }

    70% {
        transform: translateX(-200%);
    }

    75% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(0%);
    }
}

.carousel {
    display: flex;
    animation: slide 12s infinite;
}

.carousel-item {
    flex: 0 0 100%;
}
</style>

<!-- coming soon -->
<!-- <template>
    <div>
        <section class="flex items-center justify-center bg-gray-200 hover:bg-gray-400 transition-colors duration-300
           h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
                {{ $t('home.coming_soon') }}
            </h1>
        </section>
    </div>
</template>

<script setup>

</script> -->