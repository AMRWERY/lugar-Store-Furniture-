<template>
    <div>
        <div class="flex items-center justify-between w-full mt-1 mb-3 ps-3">
            <div class="flex items-center">
                <h3 class="text-lg font-semibold text-slate-800">Marketing Categories</h3>
            </div>
            <nuxt-link to="/add-marketing-categories" type="button"
                class="flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
                        <!-- <td class="p-4 py-5">
                            <p class="text-sm text-slate-500">actions</p>
                        </td> -->
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
    </div>
</template>

<script setup>
const store = useCategoriesStore();

onMounted(() => {
    store.fetchSubCategories();
});

const { t } = useI18n()

definePageMeta({
    layout: 'dashboard'
})

useHead({
    titleTemplate: () => t("head.sub_categories"),
});
</script>