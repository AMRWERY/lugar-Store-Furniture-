<template>
  <div>
    <div class="bg-fixed bg-center bg-cover" style="background-image: url('https://picsum.photos/1920/1080')">
      <div class="flex items-center justify-center h-screen">
        <div class="p-8 mx-4 bg-white rounded shadow-md md:w-1/2 lg:w-1/3">
          <h1 class="mb-8 text-3xl font-bold text-center">Login</h1>
          <ClientOnly>
            <dynamic-inputs v-model="data.email" :label="t('form.email')" :placeholder="t('form.enter_your_email')"
              type="email" :validation="('required|email|ends_with:lugar.com')" :required="true" />
            <dynamic-inputs v-model="data.password" :label="t('form.password')"
              :placeholder="t('form.enter_your_password')" type="password" :validation="'required|password|length:6,7'"
              :required="true" />
            <div class="mt-6">
              <button type="submit" :disabled="loading" @click="signIn"
                class="w-[400px] px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('loading_btn.logging') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <span v-else>{{ $t('form.login') }}</span>
              </button>
            </div>
          </ClientOnly>

          <div v-if="errorMessage" class="mt-2 text-sm text-red-500">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>

    <!-- dynamic-toast component -->
    <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
      <div class="pointer-events-auto">
        <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
          :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
const store = useAuthStore()
const loading = ref(false);
const errorMessage = ref('');
const router = useRouter()
const { t } = useI18n()

const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

const data = ref({
  email: '',
  password: '',
});

const signIn = async () => {
  loading.value = true;
  try {
    await store.userSignIn({
      email: data.value.email,
      password: data.value.password,
    });
    showToast.value = true;
    toastTitle.value = t('toast.successfully_logged_in');
    toastMessage.value = t('toast.your_account_has_been_successfully_logged_in');
    toastType.value = 'success';
    toastIcon.value = 'mdi:check-circle';
    setTimeout(() => {
      router.replace('/products');
    }, 3000);
  } catch (error) {
    if (error === 'Your account has been blocked.') {
      errorMessage.value = t('form.account_blocked_please_contact_support');
      // console.log(error)
    } else {
      errorMessage.value = t('form.login_failed_please_check_your_information_and_try_again');
    }
  } finally {
    loading.value = false;
  }
};

useHead({
  titleTemplate: () => "Login",
});
</script>