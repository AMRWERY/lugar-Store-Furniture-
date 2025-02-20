<template>
  <div>
    <!-- overlay Component -->
    <overlay :visible="localeStore.isOverlayVisible" />

    <div v-if="!isLoginPage">
      <header class="sticky inset-0 text-white bg-black h-14">
        <nav
          class="flex items-center justify-between h-full gap-8 px-6 mx-auto transition-all duration-200 ease-in-out lg:px-20">
          <!-- Announcement -->
          <div class="hidden text-sm gap-7 md:flex">
            <div class="flex items-center space-s-2.5">
              <i class="fa-solid fa-phone-volume"></i>
              <p class="capitalize">{{ $t('layout.call_us') }} +20 122 409 1737</p>
            </div>
          </div>

          <!-- Spacer -->
          <div class="flex-grow"></div>

          <div class="flex items-center gap-7 ms-auto">
            <nuxt-link to="https://www.facebook.com/lugarinv?mibextid=ZbWKwL" target="_blank"
              class="transition hover:opacity-75">
              <span class="sr-only">Facebook</span>
              <i class="fa-brands fa-facebook text-2xl text-[#1877F2]"></i>
            </nuxt-link>

            <nuxt-link to="https://wa.me/201023351915" target="_blank" class="transition hover:opacity-75">
              <span class="sr-only">Whatsapp</span>
              <i class="fa-brands fa-whatsapp text-2xl text-[#25D366]"></i>
            </nuxt-link>

            <nuxt-link to="https://www.instagram.com/lugar_furniture" target="_blank"
              class="transition hover:opacity-75">
              <span class="sr-only">Instagram</span>
              <i class="fa-brands fa-instagram text-2xl
   bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]
   bg-clip-text text-transparent">
              </i>
            </nuxt-link>

            <nuxt-link to="https://www.tiktok.com/@lugarfurnitureinv?_t=8sj2O0ysXQo&_r=1" target="_blank"
              class="transition hover:opacity-75">
              <span class="sr-only">Tiktok</span>
              <i class="fa-brands fa-tiktok text-2xl
          bg-gradient-to-r from-[#69C9D0] via-white to-[#EE1D52]
          bg-clip-text text-transparent">
              </i>
            </nuxt-link>

            <ClientOnly>
              <nuxt-link to="/login" role="button" class="text-sm font-medium font-dm"
                v-if="!authStore.isAuthenticated">{{ $t('layout.sign_in') }}</nuxt-link>
              <nuxt-link to="" role="button" class="text-sm font-medium font-dm" @click="logout"
                v-if="authStore.isAuthenticated">{{ $t('btn.logout') }}</nuxt-link>
            </ClientOnly>

            <!-- toggle locales -->
            <nuxt-link to="" class="font-semibold text-white me-4" role="button" v-if="localeStore.isRTL">
              <span class="[&>svg]:w-5" @click="setLocale('en')">
                En
              </span>
            </nuxt-link>
            <nuxt-link to="" class="font-semibold text-white me-4" role="button" v-else>
              <span class="[&>svg]:w-5" @click="setLocale('ar')">
                العربية
              </span>
            </nuxt-link>
          </div>
        </nav>
      </header>

      <nav class="bg-white shadow-md">
        <div class="flex items-center justify-between px-10">
          <div>
            <nuxt-link to="/">
              <img class="h-16 cursor-pointer w-[100px]"
                src="https://justfields.com/storage/projects/7M5rV059/LOGO1-lugar.png" />
            </nuxt-link>
          </div>
          <ul class="flex items-center mx-auto space-s-8">
            <li><nuxt-link to="/" class="font-semibold text-gray-700 capitalize text-md hover:text-blue-500">{{
              $t('layout.home') }}</nuxt-link>
            </li>
            <li><nuxt-link to="/all-products"
                class="font-semibold text-gray-700 capitalize text-md hover:text-blue-500">{{ $t('layout.products')
                }}</nuxt-link></li>
            <li>
              <nuxt-link to=""
                class="inline-flex items-center font-semibold text-gray-700 capitalize text-md hover:text-blue-500">
                {{ $t('layout.hot_deals') }}
                <i class="text-red-500 ms-2 fa-solid fa-fire-flame-curved fa-lg"></i>
              </nuxt-link>
            </li>
            <li><nuxt-link to="/contact-us"
                class="font-semibold text-gray-700 capitalize text-md hover:text-blue-500">{{ $t('layout.contact_us')
                }}</nuxt-link></li>
          </ul>
          <!-- cart -->
          <div>
            <span class="flex items-center space-s-1">
              <nuxt-link to="/shopping-cart" class="relative">
                <span
                  class="absolute top-0 inline-flex items-center justify-center w-5 h-5 -mt-2 text-xs text-white bg-red-600 rounded-full -me-3 end-2">
                  {{ cartStore.cart.length }}
                </span>
                <button type="button" class="relative rounded-full">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View cart</span>
                  <i class="fa-solid fa-cart-shopping mt-0.5"></i>
                </button>
              </nuxt-link>
            </span>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
const localeStore = useLocaleStore();
const cartStore = useCartStore();
const authStore = useAuthStore()
const route = useRoute();
const { locale } = useI18n();

const setLocale = (value) => {
  locale.value = value;
  localeStore.updateLocale(value);
};

computed(() => {
  const storedLocale = localeStore.locale;
  setLocale(storedLocale);
});

const logout = async () => {
  try {
    await authStore.logoutUser();
  } catch (err) {
    console.error('Error during logout:', err);
  }
};

const isLoginPage = computed(() => route.path === '/login')

onMounted(async () => {
  await authStore.init();
});
</script>