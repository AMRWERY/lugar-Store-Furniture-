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
                            <span>Damietta</span>
                        </p>
                        <p class="flex items-center">
                            <icon name="material-symbols:call" class="w-5 h-5 me-2 sm:me-6" />
                            <span>+2010-233-51915</span>
                        </p>
                    </div>
                </div>

                <div class="p-4 space-y-4 rounded-lg shadow-lg w-[430px]">
                    <ClientOnly>
                        <dynamic-inputs :label="t('form.name')" :placeholder="t('form.enter_your_name')" type="text"
                            :validation="('required|contains_alpha')" :required="true" />

                        <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                            :validation="('required|email')" :required="true" />

                        <dynamic-inputs :label="t('form.phone_number')" :placeholder="t('form.enter_your_phone')"
                            type="tel" :validation="('required')" :required="true" />

                        <dynamic-inputs :label="t('form.your_message')" :placeholder="t('form.enter_your_message')"
                            type="textarea" :validation="'required|length:10,500'" :required="true" />
                    </ClientOnly>

                    <div class="mt-6">
                        <button type="button" class="w-[400px] px-4 py-2 btn-style">
                            <!-- <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('loading_btn.logging') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div> -->
                            Send Your Message</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const { t } = useI18n()

useHead({
    titleTemplate: () => t("head.contact_us"),
});
</script>