<template>
  <div>
    <!-- overlay Component -->
    <overlay :visible="localeStore.isOverlayVisible" />

    <div v-if="!isLoginPage">
      <header class="sticky inset-0 z-50 text-white bg-black h-14">
        <nav
          class="flex items-center justify-center h-full gap-8 px-6 mx-auto transition-all duration-200 ease-in-out lg:px-20">
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
              <i
                class="fa-brands fa-instagram text-2xl bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] bg-clip-text text-transparent">
              </i>
            </nuxt-link>

            <nuxt-link to="https://www.tiktok.com/@lugarfurnitureinv?_t=8sj2O0ysXQo&_r=1" target="_blank"
              class="transition hover:opacity-75">
              <span class="sr-only">Tiktok</span>
              <i
                class="fa-brands fa-tiktok text-2xl bg-gradient-to-r from-[#69C9D0] via-white to-[#EE1D52] bg-clip-text text-transparent">
              </i>
            </nuxt-link>

            <!-- <ClientOnly>
              <nuxt-link to="/login" role="button" class="text-sm font-medium font-dm"
                v-if="!authStore.isAuthenticated">{{ $t('layout.sign_in') }}</nuxt-link>
              <nuxt-link to="" role="button" class="text-sm font-medium font-dm" @click="logout"
                v-if="authStore.isAuthenticated">{{ $t('btn.logout') }}</nuxt-link>
            </ClientOnly> -->

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


      <HeadlessDisclosure as="nav" class="bg-white shadow-xl" v-slot="{ open }">
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <!-- Mobile menu button-->
              <HeadlessDisclosureButton
                class="relative inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-gray-800">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <i class="block fa-solid fa-bars" aria-hidden="true" v-if="!open"></i>
                <i class="block fa-solid fa-xmark" aria-hidden="true" v-else></i>
              </HeadlessDisclosureButton>
            </div>
            <div class="flex items-center justify-center flex-1 sm:items-center sm:justify-start">
              <!-- Logo container -->
              <div class="flex items-center shrink-0">
                <nuxt-link to="/">
                  <img class="w-[100px] h-16" src="https://justfields.com/storage/projects/7M5rV059/LOGO1-lugar.png"
                    alt="lugar logo" />
                </nuxt-link>
              </div>

              <!-- Navigation links container (visible on sm and above) -->
              <div class="hidden sm:ms-6 sm:block">
                <div class="flex flex-row items-center space-s-4">
                  <nuxt-link to="/" class="text-gray-700 capitalize"
                    active-class="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md" exact>
                    {{ $t('layout.home') }}
                  </nuxt-link>
                  <nuxt-link to="/all-products" class="text-gray-700 capitalize"
                    active-class="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md" exact>
                    {{ $t('layout.products') }}
                  </nuxt-link>
                  <nuxt-link to="/hot-deals" class="text-gray-700 capitalize"
                    active-class="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md" exact>
                    {{ $t('layout.hot_deals') }}
                    <i class="ml-2 text-red-500 fa-solid fa-fire-flame-curved fa-lg"></i>
                  </nuxt-link>
                  <nuxt-link to="/contact-us" class="text-gray-700 capitalize"
                    active-class="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md" exact>
                    {{ $t('layout.contact_us') }}
                  </nuxt-link>
                </div>
              </div>
            </div>

            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pe-0">
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
                      <i class="fa-solid fa-cart-shopping mt-0.5 text-gray-700 text-2xl"></i>
                    </button>
                  </nuxt-link>
                </span>
              </div>
            </div>
          </div>
        </div>

        <HeadlessDisclosurePanel class="sm:hidden">
          <div class="px-2 pt-2 pb-3 space-y-2">
            <HeadlessDisclosureButton class="block w-full text-start">
              <nuxt-link to="/" exact
                class="block w-full px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-700 hover:text-white"
                active-class="text-white bg-gray-900">{{ $t('layout.home') }}</nuxt-link>
            </HeadlessDisclosureButton>

            <HeadlessDisclosureButton class="block w-full text-start">
              <nuxt-link to="/all-products" exact
                class="px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-700 hover:text-white text-start hover:block hover:w-full"
                active-class="block w-full text-white bg-gray-900 text-start">{{ $t('layout.products') }}</nuxt-link>
            </HeadlessDisclosureButton>

            <HeadlessDisclosureButton class="block w-full text-start">
              <nuxt-link to="/hot-deals" exact
                class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-700 hover:text-white text-start hover:block hover:w-full"
                active-class="block w-full text-white bg-gray-900 text-start">
                {{ $t('layout.hot_deals') }}
                <i class="text-red-500 ms-2 fa-solid fa-fire-flame-curved fa-lg"></i>
              </nuxt-link>
            </HeadlessDisclosureButton>

            <HeadlessDisclosureButton class="block w-full text-start">
              <nuxt-link to="/contact-us" exact
                class="px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-700 hover:text-white text-start hover:block hover:w-full"
                active-class="block w-full text-white bg-gray-900 text-start">{{ $t('layout.contact_us') }}</nuxt-link>
            </HeadlessDisclosureButton>
          </div>
        </HeadlessDisclosurePanel>
      </HeadlessDisclosure>
    </div>
  </div>
</template>

<script setup>
const localeStore = useLocaleStore();
const cartStore = useCartStore();
const { locale } = useI18n();

onMounted(() => {
  locale.value = localeStore.locale;
});

const setLocale = (value) => {
  locale.value = value;
  localeStore.updateLocale(value);
};

computed(() => {
  const storedLocale = localeStore.locale;
  setLocale(storedLocale);
});
</script>