<template>
    <div>
        <section class="py-6 dark:bg-gray-800 dark:text-gray-50">
            <div class="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div class="py-6 md:py-0 md:px-6">
                    <h1 class="text-4xl font-bold">{{ $t('contact_us.get_in_touch') }}</h1>
                    <p class="pt-2 pb-4">{{ $t('contact_us.fill_in_the_form_to_start_a_conversation') }}</p>
                    <div class="space-y-4">
                        <p class="flex items-center">
                            <icon name="material-symbols:location-on" class="w-5 h-5 me-2 sm:me-6" />
                            <span>{{ $t('footer.damietta') }}</span>
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
                            :validation="('required|contains_alpha')" :required="true" v-model="data.name" />

                        <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                            :validation="('required|email')" :required="true" v-model="data.email" />

                        <dynamic-inputs :label="t('form.phone_number')" :placeholder="t('form.enter_your_phone')"
                            type="tel" :validation="('required')" :required="true" v-model="data.phone" />

                        <dynamic-inputs :label="t('form.your_message')" :placeholder="t('form.enter_your_message')"
                            type="textarea" :validation="'required|length:10,500'" :required="true"
                            v-model="data.message" />

                        <div class="mt-6">
                            <button type="submit" class="w-[400px] px-4 py-2 btn-style" @click="sendMessage">
                                <div class="flex items-center justify-center" v-if="loading">
                                    <span class="text-center me-2">{{ $t('loading_btn.logging') }}...</span>
                                    <icon name="svg-spinners:270-ring-with-bg" />
                                </div>
                                <span v-else>{{ $t('btn.send_your_message') }}</span>
                            </button>
                        </div>
                    </ClientOnly>
                </div>
            </div>
        </section>

        <!-- dynamic-toast component  -->
        <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
            <div class="pointer-events-auto">
                <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
                    :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
            </div>
        </div>
    </div>
</template>

<script setup>
const store = useContactStore();
const loading = ref(false);
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const data = ref({
    name: '',
    email: '',
    phone: '',
    message: ''
});

const sendMessage = async () => {
    loading.value = true;
    try {
        await store.submitForm(data.value);
        triggerToast({
            title: t('toast.great'),
            message: t('toast.your_message_sent_successfully'),
            type: 'success',
            icon: 'mdi:check-circle',
        });
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
};

const { t } = useI18n()

useHead({
    titleTemplate: () => t("head.contact_us"),
});
</script>