<template>
    <div>
        <div class="flex items-center justify-between w-full mt-1 mb-3 ps-3">
            <div class="flex items-center">
                <h3 class="text-lg font-semibold text-slate-800">Marketing Categories</h3>
            </div>
            <nuxt-link to="/marketing-categories/add-marketing-categories" type="button"
                class="flex items-center px-4 py-2.5 btn-style">
                <icon name="ep:plus" class="w-5 h-5 me-2" />
                <span>{{ $t('btn.add_marketing_category') }}</span>
            </nuxt-link>
        </div>

        <div
            class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white rounded-lg shadow-md bg-clip-border">
            <table class="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                #
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Marketing Category Title
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b hover:bg-slate-50 border-slate-200"
                        v-for="(subcategory, index) in store.paginatedSubcategories" :key="subcategory.id">
                        <td class="p-4 py-5">
                            <p class="block text-sm font-semibold text-slate-800">
                                {{ (store.currentPage - 1) * store.subcategoriesPerPage + index + 1 }}
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block font-semibold text-md text-slate-500">{{ subcategory.title }}</p>
                        </td>
                        <td class="p-4 py-5 text-center">
                            <div class="flex items-center justify-center space-s-4">
                                <nuxt-link :to="'/marketing-categories/' + subcategory.id" type="button"
                                    class="rounded-full" data-twe-toggle="tooltip" data-twe-placement="top"
                                    :title="$t('tooltip.edit_marketing_category')">
                                    <icon name="ep:edit" class="w-6 h-6 text-gray-600" />
                                </nuxt-link>

                                <button type="button" class="rounded-full" data-twe-toggle="tooltip"
                                    data-twe-placement="top" :title="$t('tooltip.delete_marketing_category')"
                                    @click="handleDeleteMarketCategory(subcategory.id)">
                                    <icon v-if="deleteCat === subcategory.id" name="svg-spinners:6-dots-rotate"
                                        size="20px" class="text-red-500" />
                                    <icon name="ep:delete" class="w-6 h-6 text-red-600" v-else />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="flex items-center justify-end px-4 py-3 mt-4">
                <div class="flex mt-3 space-s-1 ms-auto">
                    <button @click="store.changePage(store.currentPage - 1)" :disabled="store.currentPage === 1"
                        class="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                        {{ $t('pagination.previous') }}
                    </button>
                    <button v-for="page in store.totalPagesSubcategory" :key="page" @click="store.changePage(page)"
                        :class="{
                            'bg-slate-800 text-white': page === store.currentPage,
                            'bg-white text-slate-500': page !== store.currentPage,
                        }"
                        class="px-3 py-1 text-sm font-normal transition duration-200 border rounded min-w-9 min-h-9 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                        {{ page }}
                    </button>
                    <button @click="store.changePage(store.currentPage + 1)"
                        :disabled="store.currentPage === store.totalPagesSubcategory"
                        class="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                        {{ $t('pagination.next') }}
                    </button>
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
const store = useCategoriesStore();

onMounted(() => {
    store.fetchSubCategories();
});

const { t } = useI18n()
const deleteCat = ref(null);
const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

const handleDeleteMarketCategory = async (marketCategoryId) => {
    deleteCat.value = marketCategoryId;
    setTimeout(async () => {
        await store.deleteMarketCategory(marketCategoryId);
        showToast.value = true;
        toastTitle.value = t('toast.great');
        toastMessage.value = t('toast.marketing_category_deleted_successfully');
        toastType.value = 'success';
        toastIcon.value = 'mdi:check-circle';
        deleteCat.value = null;
    }, 3000);
};

onMounted(async () => {
    const { Tooltip, initTWE } = await import("tw-elements");
    initTWE({ Tooltip });
});

definePageMeta({
    layout: 'dashboard'
})

useHead({
    titleTemplate: () => t("head.marketing_categories"),
});
</script>