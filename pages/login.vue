<template>
  <div>
    <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto">
        <img src="@/assets/Lugar_Furniture_Logo.svg" class="mx-auto w-36 h-36" />
        <h1 class="text-2xl font-bold text-center text-black sm:text-3xl">
          {{ $t('form.get_started_today') }}
        </h1>
        <ClientOnly>
          <div class="p-4 mb-6 space-y-4 rounded-lg shadow-lg sm:p-6 lg:p-8">
            <p class="text-lg font-medium text-center">{{ $t('form.sign_in_to_your_account') }}</p>
            <div>
              <dynamic-inputs v-model="data.email" :label="t('form.email')" :placeholder="t('form.enter_your_email')"
                type="email" :validation="('required|email|ends_with:lugar.com')" :required="true" />
            </div>
            <div>
              <dynamic-inputs v-model="data.password" :label="t('form.password')"
                :placeholder="t('form.enter_your_password')" type="password"
                :validation="'required|password|length:6,7'" :required="true" />
            </div>

            <div class="mt-6">
              <button type="submit" :disabled="loading" @click="signIn" class="block w-full px-4 py-2 btn-style">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('loading_btn.logging') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <span v-else>{{ $t('form.login') }}</span>
              </button>

            </div>
            <div v-if="errorMessage" class="mt-2 text-sm text-center text-red-500">
              {{ errorMessage }}
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>

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