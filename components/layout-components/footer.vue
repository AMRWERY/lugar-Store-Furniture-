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

                        <ul class="flex items-center mt-8 space-y-1 text-sm">
                            <li class="flex items-center space-s-2">
                                <icon name="material-symbols:add-location" class="w-4 h-4" />
                                <span>{{ $t('footer.damietta') }}</span>
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
                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        {{ $t('footer.chairs') }}
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        {{ $t('footer.bed_rooms') }}
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        {{ $t('footer.sofa') }}
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        {{ $t('footer.living_rooms') }}
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        {{ $t('footer.dining_rooms') }}
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

</script>