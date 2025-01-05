<template>
    <div>
        <div class="mx-auto my-12 max-w-7xl">
            <div class="flex space-x-4">
                <nuxt-link class="relative w-1/5 cursor-pointer group transit" v-for="card in store.categories"
                    :key="card" :to="{ path: '/all-products', query: { categoryId: card.id } }">
                    <div class="relative w-full h-48 overflow-hidden rounded-lg group-hover:opacity-75 sm:h-48">
                        <img :src="card?.imgOne" class="object-cover object-center w-full h-full" />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <h3 class="relative overflow-hidden text-xl font-semibold text-white capitalize">
                                {{ $i18n.locale === 'ar' ? card?.titleAr :
                                    card?.title }}
                                <span
                                    class="absolute bottom-0 start-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>
const store = useCategoriesStore()

onMounted(async () => {
    await store.fetchCategories();
});
</script>