<template>
    <div>
        <section class="py-6 dark:bg-gray-800 dark:text-gray-50">
            <div class="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div class="py-6 md:py-0 md:px-6">
                    <h1 class="text-4xl font-bold">Get in touch</h1>
                    <p class="pt-2 pb-4">Fill in the form to start a conversation</p>
                    <div class="space-y-4">
                        <p class="flex items-center">
                            <icon name="material-symbols:location-on" class="w-5 h-5 me-2 sm:me-6" />
                            <span>Fake address, 9999 City</span>
                        </p>
                        <p class="flex items-center">
                            <icon name="material-symbols:call" class="w-5 h-5 me-2 sm:me-6" />
                            <span>123456789</span>
                        </p>
                        <p class="flex items-center">
                            <icon name="material-symbols:alternate-email" class="w-5 h-5 me-2 sm:me-6" />
                            <span>contact@business.com</span>
                        </p>
                    </div>
                </div>
                <form novalidate class="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                    <label class="block">
                        <span class="mb-1">Full name</span>
                        <input type="text" placeholder="Leroy Jenkins"
                            class="block w-full rounded-md shadow-sm focus:ring focus:ri dark:bg-gray-800">
                    </label>
                    <label class="block">
                        <span class="mb-1">Email address</span>
                        <input type="email" placeholder="leroy@jenkins.com"
                            class="block w-full rounded-md shadow-sm focus:ring focus:ri dark:bg-gray-800">
                    </label>
                    <label class="block">
                        <span class="mb-1">Message</span>
                        <textarea rows="3"
                            class="block w-full rounded-md focus:ring focus:ri dark:bg-gray-800"></textarea>
                    </label>
                    <button type="button"
                        class="self-center w-full px-8 py-3 text-lg text-white bg-black rounded">Submit</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup>

</script>