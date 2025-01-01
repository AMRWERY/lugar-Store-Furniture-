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
                                Call us
                            </span>

                            <nuxt-link to="" class="block text-2xl font-medium hover:opacity-75 sm:text-3xl">
                                +2010-233-51915
                            </nuxt-link>
                        </p>

                        <ul class="flex items-center mt-8 space-y-1 text-sm">
                            <li class="flex items-center space-x-2">
                                <icon name="material-symbols:add-location" class="w-4 h-4" />
                                <span>Damietta</span>
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
                                    <span class="sr-only">Instagram</span>
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
                        </ul>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <!-- <p class="font-medium">Services</p> -->

                            <ul class="mt-6 space-y-4 text-sm">
                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        Home
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        Products
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        Contact
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <!-- <p class="font-medium">Company</p> -->

                            <ul class="mt-6 space-y-4 text-sm">
                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        Chairs
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        Bedrooms
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        Sofa
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        Living Room
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link to="" class="transition hover:opacity-75">
                                        Dining Room
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