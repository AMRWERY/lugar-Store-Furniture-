<template>
    <div>
        <!-- overlay Component -->
        <overlay :visible="authStore.isOverlayVisible" />

        <aside v-if="!isAuthPage"
            class="absolute left-0 top-0 z-50 flex h-screen w-[230px] flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:static lg:translate-x-0"
            :class="{
                'translate-x-0': sidebarStore.isSidebarOpen,
                '-translate-x-full': !sidebarStore.isSidebarOpen
            }" ref="target">
            <!-- SIDEBAR HEADER -->
            <div class="flex items-center justify-between gap-3 px-6 py-[1.375rem] lg:py-6.5">
                <nuxt-link to="">
                    <p class="text-3xl font-semibold text-white capitalize opacity-100 max-h-7">Lugar Store</p>
                </nuxt-link>

                <button class="block lg:hidden" @click="sidebarStore.isSidebarOpen = false">
                    <icon name="ic:baseline-arrow-back-ios-new" class="w-5 h-5 mt-2 text-white fill-current" />
                </button>
            </div>
            <!-- SIDEBAR HEADER -->

            <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <!-- Sidebar Menu -->
                <nav class="py-4 mt-5 text-white lg:mt-9">
                    <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
                        <div>
                            <ul class="mb-6 flex flex-col gap-1.5">
                                <sidebar-item v-for="(menuItem, index) in menuGroup.menuItems" :item="menuItem"
                                    :key="index" :index="index" />
                            </ul>
                        </div>
                    </template>
                </nav>
                <!-- Sidebar Menu -->
            </div>
            <div class="px-6 pb-6 mt-auto">
                <nuxt-link type="button" to="/login" @click="logout"
                    class="block py-2 text-center text-white transition-all duration-300 bg-transparent border-2 border-white rounded-md hover:bg-white hover:text-black">
                    {{ $t('btn.logout') }}
                </nuxt-link>
            </div>
        </aside>
    </div>
</template>

<script setup>
const target = ref(null)

const sidebarStore = useSidebarStore()

onClickOutside(target, () => {
    sidebarStore.isSidebarOpen = false
})

const authStore = useAuthStore()
const showOverlay = ref(false);

const logout = async () => {
    try {
        await authStore.logoutUser();
    } catch (err) {
        console.error('Error during logout:', err);
    }
};

//hide routes composable
const { isAuthPage } = useAuthPage();

const { t } = useI18n()

const menuGroups = computed(() => [
    {
        menuItems: [
            {
                icon: 'material-symbols:table-bar',
                label: t('layout.products'),
                route: '/products',
            },
            {
                icon: 'material-symbols:calendar-month-sharp',
                label: t('layout.categories'),
                route: '/categories',
            },
            {
                icon: 'material-symbols:calendar-month-sharp',
                label: t('layout.marketing_categories'),
                route: '/marketing-categories',
            },
            {
                icon: 'mdi:order-bool-descending-variant',
                label: t('layout.orders'),
                route: '/orders',
            },
            {
                icon: 'material-symbols:attach-email-outline-sharp',
                label: t('layout.customer_messages'),
                route: '/customer-messages',
            },
            {
                icon: 'material-symbols:image',
                label: t('layout.banners'),
                route: '/banners',
            },
        ],
    },
]);
</script>