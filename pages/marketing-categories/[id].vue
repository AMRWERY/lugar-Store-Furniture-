<template>
    <div>
        <div class="max-w-2xl p-6 mx-auto mt-5 bg-white border rounded-lg">
            <h2 class="mb-4 text-xl font-bold">{{ $t('form.edit_marketing_category') }}</h2>
            <form @submit.prevent="handleUpdateMarketCategory">
                <div class="mb-4">
                    <label for="category-title" class="block text-sm font-medium text-gray-700">{{
                        $t('form.marketing_category_title')
                    }}</label>
                    <input id="category-title" type="text" v-model="newMarketCategoryTitle"
                        class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300" required />
                </div>

                <div class="mb-4">
                    <label for="category-title" class="block text-sm font-medium text-gray-700">{{
                        $t('form.marketing_category_title_ar')
                    }}</label>
                    <input id="category-title" type="text" v-model="newMarketCategoryTitleAr"
                        class="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300" required />
                </div>

                <button type="submit" class="w-full px-4 py-2 btn-style">
                    <div class="flex items-center justify-center" v-if="loadingOne">
                        <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
                        <icon name="svg-spinners:270-ring-with-bg" />
                    </div>
                    <span v-else>{{ $t('btn.update_marketing_category') }}</span>
                </button>
            </form>
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
const loadingOne = ref(false);
const newMarketCategoryTitle = ref('');
const newMarketCategoryTitleAr = ref('');
const route = useRoute();
const marketCategoryId = route.params.id

onMounted(async () => {
    if (marketCategoryId) {
        await store.fetchCMarketCategoryDetails(marketCategoryId);
        // console.log(store.currentMarketCategory);
        if (store.currentMarketCategory) {
            newMarketCategoryTitle.value = store.currentMarketCategory.title || "";
            newMarketCategoryTitleAr.value = store.currentMarketCategory.titleAr || "";
        }
    }
});

const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

const handleUpdateMarketCategory = async () => {
    if (!marketCategoryId) return;
    loadingOne.value = true;
    const updatedData = {
        title: newMarketCategoryTitle.value,
        titleAr: newMarketCategoryTitleAr.value,
    };
    try {
        await store.updateMarketCategory(marketCategoryId, updatedData);
        showToast.value = true;
        toastTitle.value = t("toast.success");
        toastMessage.value = t("toast.marketing_category_updated");
        toastType.value = "success";
        toastIcon.value = "check-circle";
        await store.fetchCMarketCategoryDetails(marketCategoryId);
    } catch (error) {
        console.error("Error updating category:", error);
        showToast.value = true;
        toastTitle.value = t("toast.error");
        toastMessage.value = t("toast.marketing_category_update_failed");
        toastType.value = "error";
        toastIcon.value = "error";
    } finally {
        loadingOne.value = false;
    }
};

const { t } = useI18n()

definePageMeta({
    layout: 'dashboard'
})

useHead({
    titleTemplate: () => t("head.edit_marketing_category"),
});
</script>