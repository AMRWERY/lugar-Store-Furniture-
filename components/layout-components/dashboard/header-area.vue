<template>
  <div>
    <header class="sticky top-0 flex w-full bg-white z-999 drop-shadow-1">
      <div class="flex items-center justify-between flex-grow px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
          <!-- Hamburger Toggle BTN -->
          <button class="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
            v-if="!isAuthPage" @click="() => { toggleSidebar() }">
            <span class="relative block h-[1.375rem] w-[1.375rem] cursor-pointer">
              <icon name="material-symbols:menu-rounded" />
            </span>
          </button>
        </div>

        <div class="flex ms-auto">
          <nuxt-link class="me-4 text-neutral-600 dark:text-white" to="" role="button" v-if="isRTL"
            @click="updateLocale('en'); changeLocale('en')">
            <span class="[&>svg]:w-5">
              En
            </span>
          </nuxt-link>
          <nuxt-link class="me-4 text-neutral-600 dark:text-white" to="" role="button" v-else
            @click="updateLocale('ar'); changeLocale('ar')">
            <span class="[&>svg]:w-5">
              العربية
            </span>
          </nuxt-link>

          <nuxt-link to="/login" v-if="!store.isUserAuthenticated" class="text-neutral-600 dark:text-white">{{
            $t('form.login') }}</nuxt-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { changeLocale } from '@formkit/vue'

const { toggleSidebar } = useSidebarStore()

const { locale, setLocale } = useI18n();
const isRTL = ref(false);

const updateLocale = (value) => {
  setLocale(value);
  changeLocale(value);
  sessionStorage.setItem('locale', value);
  isRTL.value = value === 'ar';
  setTimeout(() => {
    location.reload();
  }, 1000);
};

onMounted(() => {
  const storedLocale = sessionStorage.getItem('locale') || 'en';
  setLocale(storedLocale);
  changeLocale(storedLocale);
  isRTL.value = storedLocale === 'ar';
});

watch(locale, (newVal) => {
  isRTL.value = newVal === 'ar';
});

//hide routes composable
const { isAuthPage } = useAuthPage();

const store = useAuthStore()

onMounted(async () => {
  const { Tooltip, initTWE } = await import("tw-elements");
  initTWE({ Tooltip });
});
</script>