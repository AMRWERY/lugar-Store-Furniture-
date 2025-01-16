<template>
    <div>
        <div class="text-gray-800 bg-gray-100 dark:bg-gray-900 dark:text-white">
            <ClientOnly>
                <div class="mx-auto max-w-7xl">
                    <!-- Carousel Wrapper -->
                    <div class="overflow-hidden rounded-lg shadow-lg">
                        <!-- Carousel -->
                        <div class="carousel">
                            <!-- Slide -->
                            <div class="bg-white carousel-item dark:bg-gray-800" v-for="banner in filteredBanners"
                                :key="banner">
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
let filteredBanners = ref();

onMounted(async () => {
    await bannersStore.fetchBanners().then(res => {
        // debugger
        filteredBanners.value = bannersStore.banners.filter(banner => banner.visible);
    })
    console.log('banners', filteredBanners.value);
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