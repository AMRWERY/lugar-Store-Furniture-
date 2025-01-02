<template>
  <div>
    <div v-if="!isLoginPage">
      <header class="sticky inset-0 text-white bg-black h-14">
        <nav
          class="flex items-center justify-between h-full gap-8 px-6 mx-auto transition-all duration-200 ease-in-out lg:px-20">

          <!-- Announcement -->
          <div class="hidden text-sm gap-7 md:flex">
            <p>Announce something here</p>
            <div class="flex items-center space-s-2.5">
              <icon name="material-symbols:call" size="20px" />
              <p>CALL US: 123-456-7890</p>
            </div>
            <div class="flex items-center space-s-2.5">
              <icon name="material-symbols:mail-rounded" size="20px" />
              <p>EMAIL: Support@Fiot.com</p>
            </div>
          </div>

          <!-- Spacer -->
          <div class="flex-grow"></div>

          <!-- Sign-in -->
          <div class="flex items-center gap-7">
            <span class="flex items-center space-s-1">
              <nuxt-link to="/shopping-cart" class="relative">
                <span
                  class="absolute top-0 inline-flex items-center justify-center w-5 h-5 -mt-2 text-xs text-white bg-red-600 rounded-full -me-3 end-2">
                  {{ cartStore.cart.length }}
                </span>
                <button type="button" class="relative rounded-full" data-twe-toggle="tooltip"
                  data-twe-placement="bottom" :title="$t('tooltip.your_cart')">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View cart</span>
                  <icon name="clarity:shopping-cart-line" class="mt-0.5" />
                </button>
              </nuxt-link>
            </span>

            <nuxt-link to="https://www.facebook.com/lugarinv?mibextid=ZbWKwL" target="_blank"
              class="transition hover:opacity-75">
              <span class="sr-only">Facebook</span>
              <icon name="logos:facebook" class="w-6 h-6" />
            </nuxt-link>

            <nuxt-link to="https://wa.me/201023351915" target="_blank" class="transition hover:opacity-75">
              <span class="sr-only">Instagram</span>
              <icon name="logos:whatsapp-icon" class="w-6 h-6" />
            </nuxt-link>

            <nuxt-link to="https://www.instagram.com/lugar_furniture" target="_blank"
              class="transition hover:opacity-75">
              <span class="sr-only">Instagram</span>
              <icon name="skill-icons:instagram" class="w-6 h-6" />
            </nuxt-link>

            <nuxt-link to="https://www.tiktok.com/@lugarfurnitureinv?_t=8sj2O0ysXQo&_r=1" target="_blank"
              class="transition hover:opacity-75">
              <span class="sr-only">Tiktok</span>
              <icon name="logos:tiktok-icon" class="w-6 h-6" />
            </nuxt-link>

            <ClientOnly>
              <nuxt-link to="/login" role="button" class="text-sm font-medium font-dm"
                v-if="!store.isUserAuthenticated">Sign in</nuxt-link>
              <nuxt-link to="" role="button" class="text-sm font-medium font-dm" @click="logout"
                v-if="store.isUserAuthenticated">{{ $t('btn.logout') }}</nuxt-link>
            </ClientOnly>

            <!-- Toggle Language -->
            <nuxt-link class="text-white me-4" to="" role="button" v-if="isRTL"
              @click="updateLocale('en'); changeLocale('en')">
              <span class="[&>svg]:w-5">
                En
              </span>
            </nuxt-link>
            <nuxt-link class="text-white me-4" to="" role="button" v-else
              @click="updateLocale('ar'); changeLocale('ar')">
              <span class="[&>svg]:w-5">
                العربية
              </span>
            </nuxt-link>
          </div>
        </nav>
      </header>

      <nav class="bg-white shadow-md">
        <div class="flex items-center justify-between px-10">
          <div>
            <nuxt-link to="">
              <img class="h-16 cursor-pointer" src="https://justfields.com/storage/projects/7M5rV059/LOGO1-lugar.png" />
            </nuxt-link>
          </div>
          <ul class="flex items-center mx-auto space-s-8">
            <li><nuxt-link to="/"
                class="font-semibold text-gray-700 capitalize text-md hover:text-blue-500">Home</nuxt-link>
            </li>
            <li><nuxt-link to="/all-products"
                class="font-semibold text-gray-700 capitalize text-md hover:text-blue-500">Products</nuxt-link></li>
            <li><nuxt-link to="/contact-us"
                class="font-semibold text-gray-700 capitalize text-md hover:text-blue-500">Contact Us</nuxt-link></li>
          </ul>
        </div>
      </nav>

      <!-- overlay component -->
      <overlay :visible="showOverlay" />
    </div>
  </div>
</template>

<script setup>
import { changeLocale } from '@formkit/vue'

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

const showOverlay = ref(false);
const store = useAuthStore()

const logout = async () => {
  try {
    showOverlay.value = true;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await store.logout();
    sessionStorage.removeItem("isAuthenticated");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    showOverlay.value = false;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login')

import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
</script>