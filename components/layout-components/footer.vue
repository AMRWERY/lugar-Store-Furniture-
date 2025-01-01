<template>
    <div>
        <footer class=" bg-black/5 text-surface">
            <p class="p-4 text-3xl font-semibold text-blue-700">Lugar Store</p>
            <div class="flex items-center justify-between w-full p-4">
                <ul class="flex justify-center space-s-8">
                    <li>
                        <nuxt-link to=""
                            class="text-sm font-medium text-gray-700 capitalize hover:text-blue-500">Home</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to=""
                            class="text-sm font-medium text-gray-700 capitalize hover:text-blue-500">Portfolio</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to=""
                            class="text-sm font-medium text-gray-700 capitalize hover:text-blue-500">customize your
                            furniture</nuxt-link>
                    </li>
                </ul>
                <!-- Spacer -->
                <div class="flex-grow"></div>

                <div class="flex justify-center space-s-8">
                    <nuxt-link to="https://wa.me/201023351915" target="_blank">
                        <icon name="nimbus:whatsapp" size="20px" class="mt-1" />
                    </nuxt-link>
                    <nuxt-link to="https://www.instagram.com/lugar_furniture" target="_blank">
                        <icon name="mdi:instagram" size="20px" class="mt-1" />
                    </nuxt-link>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>

</script>