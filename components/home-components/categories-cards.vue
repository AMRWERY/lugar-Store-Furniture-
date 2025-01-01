<template>
    <div>
        <div class="mx-auto my-12 max-w-7xl">
            <ClientOnly>
                <Carousel v-bind="config">
                    <Slide v-for="card in store.categories" :key="card">
                        <div class="carousel__item">
                            <div class="relative cursor-pointer group transit">
                                <div
                                    class="relative w-full h-48 overflow-hidden rounded-lg group-hover:opacity-75 sm:h-48">
                                    <img :src="card?.imgOne" class="object-cover object-center size-full" />
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <h3
                                            class="relative overflow-hidden text-xl font-semibold text-white capitalize">
                                            {{ card?.title }}
                                            <span
                                                class="absolute bottom-0 start-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full">
                                            </span>
                                        </h3>
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
const config = {
    itemsToShow: 4,
    wrapAround: true,
    gap: 5,
    snapAlign: "center",
    autoplay: 4000,
    pauseAutoplayOnHover: true,
    breakpoints: {
        200: {
            itemsToShow: 1.5,
            snapAlign: "center",
        },
        400: {
            itemsToShow: 2,
            snapAlign: "start",
        },
        700: {
            itemsToShow: 3,
            snapAlign: "center",
        },
        1024: {
            itemsToShow: 4,
            snapAlign: "start",
        },
    },
};

const store = useCategoriesStore()

onMounted(async () => {
    await store.fetchCategories();
    // console.log(store.fetchCategories())
});
</script>