<template>
    <div>
        <footer class="text-white bg-black lg:grid lg:grid-cols-6 space-s-3">
            <div class="relative block h-32 lg:col-span-3 lg:h-full">
                <img src="https://justfields.com/storage/projects/7M5rV059/LOGO2white.png"
                    class="absolute inset-0 object-cover w-full h-full lg:w-[780px] mx-auto" />
            </div>

            <div class="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
                <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                        <p>
                            <span class="text-xs tracking-wide capitalize">
                                {{ $t('footer.call_us') }}
                            </span>

                            <nuxt-link to="" class="block text-2xl font-medium hover:opacity-75 sm:text-3xl">
                                +20 122 409 1737
                            </nuxt-link>
                        </p>

                        <ul class="mt-8 space-y-1 text-sm">
                            <li class="flex items-center space-s-2">
                                <icon name="material-symbols:add-location" class="w-5 h-5" />
                                <span class="truncate">{{ $t('footer.factory_damietta_dam_road_angar_logar_furniture')
                                    }}</span>
                            </li>
                            <li class="flex items-center space-s-2">
                                <icon name="material-symbols:add-location" class="w-5 h-5" />
                                <span class="truncate">{{
                                    $t('footer.damietta_exhibition_port_said_road_behind_al_baqari_cars') }}</span>
                            </li>
                            <li class="flex items-center space-s-2">
                                <icon name="material-symbols:add-location" class="w-6 h-6" />
                                <span class="truncate">{{
                                    $t('footer.fifth_settlement_lotus_exhibition_iin_front_of_platinum_club_next_to_skyline_school')
                                    }}</span>
                            </li>
                        </ul>

                        <ul class="flex gap-6 mt-8">
                            <li>
                                <nuxt-link to="https://www.facebook.com/lugarinv?mibextid=ZbWKwL" target="_blank"
                                    class="transition hover:opacity-75">
                                    <span class="sr-only">Facebook</span>
                                    <icon name="logos:facebook" class="w-6 h-6" />
                                </nuxt-link>
                            </li>

                            <li>
                                <nuxt-link to="https://wa.me/201023351915" target="_blank"
                                    class="transition hover:opacity-75">
                                    <span class="sr-only">Whatsapp</span>
                                    <icon name="logos:whatsapp-icon" class="w-6 h-6" />
                                </nuxt-link>
                            </li>

                            <li>
                                <nuxt-link to="https://www.instagram.com/lugar_furniture" target="_blank"
                                    class="transition hover:opacity-75">
                                    <span class="sr-only">Instagram</span>
                                    <icon name="skill-icons:instagram" class="w-6 h-6" />
                                </nuxt-link>
                            </li>

                            <li>
                                <nuxt-link to="https://www.tiktok.com/@lugarfurnitureinv?_t=8sj2O0ysXQo&_r=1"
                                    target="_blank" class="transition hover:opacity-75">
                                    <span class="sr-only">Tiktok</span>
                                    <icon name="logos:tiktok-icon" class="w-6 h-6" />
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <ul class="mt-6 space-y-4 text-sm">
                                <li>
                                    <nuxt-link to="/" class="transition hover:opacity-75">
                                        {{ $t('footer.home') }}
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="/all-products" class="transition hover:opacity-75">
                                        {{ $t('footer.products') }}
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="/contact-us" class="transition hover:opacity-75">
                                        {{ $t('footer.contact_us') }}
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul class="mt-6 space-y-4 text-sm">
                                <li v-for="card in store.categories" :key="card">
                                    <nuxt-link :to="{ path: '/all-products', query: { categoryId: card.id } }"
                                        class="transition hover:opacity-75">
                                        {{ $i18n.locale === 'ar' ? card?.titleAr :
                                            card?.title }}
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
const store = useCategoriesStore()

onMounted(() => {
    store.fetchCategories();
});
</script>