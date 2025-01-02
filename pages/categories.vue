<template>
    <div>
        <div class="flex items-center justify-between w-full mt-1 mb-3 ps-3">
            <div class="flex items-center">
                <h3 class="text-lg font-semibold text-slate-800">Categories</h3>
            </div>
            <nuxt-link to="/add-category" type="button"
                class="flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <icon name="ep:plus" class="w-5 h-5 me-2" />
                <span>{{ $t('btn.add_category') }}</span>
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
                                Category Title
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Image
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b hover:bg-slate-50 border-slate-200"
                        v-for="(category, index) in store.paginatedCategories" :key="category.id">
                        <td class="p-4 py-5">
                            <p class="block text-sm font-semibold text-slate-800">
                                {{ (store.currentPage - 1) * store.categoriesPerPage + index + 1 }}
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="font-semibold text-md text-slate-500">{{ category.title }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <img :src="category.imgOne" class="w-12 h-12 rounded-lg">
                        </td>
                        <td class="p-4 py-5 text-center">
                            <div class="flex items-center justify-center space-s-4">
                                <button type="button" class="rounded-full" data-twe-toggle="tooltip"
                                    data-twe-placement="top" :title="$t('tooltip.edit_category')">
                                    <icon name="ep:edit" class="w-6 h-6 text-gray-600" />
                                </button>

                                <button type="button" class="rounded-full" data-twe-toggle="tooltip"
                                    data-twe-placement="top" :title="$t('tooltip.delete_category')">
                                    <icon name="ep:delete" class="w-6 h-6 text-red-600" />
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
                    <button v-for="page in store.totalPages" :key="page" @click="store.changePage(page)" :class="{
                        'bg-slate-800 text-white': page === store.currentPage,
                        'bg-white text-slate-500': page !== store.currentPage,
                    }"
                        class="px-3 py-1 text-sm font-normal transition duration-200 border rounded min-w-9 min-h-9 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                        {{ page }}
                    </button>
                    <button @click="store.changePage(store.currentPage + 1)"
                        :disabled="store.currentPage === store.totalPages"
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
    store.fetchCategories();
});

const { t } = useI18n()

onMounted(async () => {
    const { Tooltip, initTWE } = await import("tw-elements");
    initTWE({ Tooltip });
});

definePageMeta({
    layout: 'dashboard'
})

useHead({
    titleTemplate: () => t("head.categories"),
});
</script>