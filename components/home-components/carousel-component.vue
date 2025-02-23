<template>
    <div>
        <div class="flex justify-center">
            <!-- Full-width container with responsive max-width on larger screens -->
            <div class="w-full text-gray-800">
                <ClientOnly>
                    <div class="w-full mx-auto sm:max-w-7xl">
                        <!-- Carousel Wrapper -->
                        <div class="overflow-hidden rounded-lg shadow-lg">
                            <!-- Carousel -->
                            <div class="carousel">
                                <!-- Slide -->
                                <div class="bg-white carousel-item" v-for="banner in filteredBanners" :key="banner.id">
                                    <img :src="banner?.fileUrl" alt="banner"
                                        class="object-fill w-full h-64 rounded-md sm:h-96" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script setup>
const bannersStore = useBannersStore();
const filteredBanners = ref([]);

onMounted(() => {
    bannersStore.fetchBanners().then(() => {
        filteredBanners.value = bannersStore.banners.filter(
            (banner) => banner.visible && banner.selected
        );
    });
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