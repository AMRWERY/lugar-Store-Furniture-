<template>
    <div>
        <div class="flex items-center justify-between">
            <h3 class="py-2 mt-5 mb-12 text-2xl font-bold text-start">{{ $t('dashboard.orders') }}</h3>
            <div class="flex items-end space-s-4">
                <div class="flex flex-col">
                    <label class="mb-1 text-sm font-medium">{{ $t('form.start_date') }}</label>
                    <input type="date" v-model="startDate" class="p-2 border rounded"
                        :placeholder="$t('form.start_date')" />
                </div>
                <div class="flex flex-col">
                    <label class="mb-1 text-sm font-medium">{{ $t('form.end_date') }}</label>
                    <input type="date" v-model="endDate" class="p-2 border rounded"
                        :placeholder="$t('form.end_date')" />
                </div>
                <button @click="filterOrdersByDate" class="px-4 py-2 btn-style">
                    {{ $t('btn.filter') }}
                </button>
            </div>
        </div>
        <div
            class="relative flex flex-col w-full h-full overflow-scroll overflow-y-hidden text-gray-700 bg-white rounded-lg shadow-md bg-clip-border">
            <table class="w-full table-auto text-start min-w-max">
                <thead>
                    <tr>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                #
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.order_id') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.email') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.customer_name') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.date') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.phone_number') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.address') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.state') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.status') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                        </th>
                    </tr>
                </thead>

                <tbody v-if="checkoutStore.paginatedOrders.length === 0">
                    <tr>
                        <td colspan="10" class="p-4 text-center">
                            <!-- skeleton-loader component -->
                            <skeleton-loader />
                            <!-- <i class="fa-solid fa-spinner fa-spin-pulse fa-4x"></i> -->
                        </td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <tr class="border-b hover:bg-slate-50 border-slate-200"
                        v-for="(order, index) in checkoutStore.paginatedOrders" :key="order.id">
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-500">{{ (checkoutStore.currentPage - 1) *
                                checkoutStore.ordersPerPage +
                                index +
                                1 }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm font-semibold text-slate-500">{{ order.orderId }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="block text-sm text-slate-500">{{ order.email }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="text-sm text-slate-500">{{ order.name }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="text-sm text-slate-500">{{ order.date }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="text-sm text-slate-500">{{ order.phoneNumber }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="text-sm text-slate-500">{{ order.address }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="text-sm text-slate-500">{{ order.state }}</p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="text-sm text-blue-700 cursor-pointer" @click="openOrderDetails(order)">
                            <div class="flex items-center justify-center" v-if="order.loading">
                                <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                            </div>
                            <span v-else>{{ $t('btn.view_details') }}</span>
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="text-sm font-semibold" :class="{
                                'text-green-700': getStatusTitle(order.statusId)?.status === 'Pending' || getStatusTitle(order.statusId)?.statusAr === 'Pending',
                                'text-red-700': getStatusTitle(order.statusId)?.status === 'Confirmed' || getStatusTitle(order.statusId)?.statusAr === 'Confirmed',
                                'text-blue-700': getStatusTitle(order.statusId)?.status === 'Delivered'
                            }">
                                {{ $i18n.locale === 'ar' ? getStatusTitle(order.statusId)?.statusAr :
                                    getStatusTitle(order.statusId)?.status }}
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <button type="button" @click="deleteOrder(order.id)">
                                <i class="text-blue-500 fa-solid fa-spinner fa-spin-pulse" v-if="order.loading"></i>
                                <i class="text-red-700 fa-regular fa-trash-can" v-else></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="flex items-center px-4 py-3">
                <div class="flex mt-3 space-x-1 ms-auto">
                    <button @click="checkoutStore.changePage(checkoutStore.currentPage - 1)"
                        :disabled="checkoutStore.currentPage === 1"
                        class="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                        {{ $t('pagination.previous') }}
                    </button>
                    <button v-for="page in checkoutStore.totalPages" :key="page" @click="checkoutStore.changePage(page)"
                        :class="{
                            'bg-slate-800 text-white': page === checkoutStore.currentPage,
                            'bg-white text-slate-500': page !== checkoutStore.currentPage,
                        }"
                        class="px-3 py-1 text-sm font-normal transition duration-200 border rounded min-w-9 min-h-9 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                        {{ page }}
                    </button>
                    <button @click="checkoutStore.changePage(checkoutStore.currentPage + 1)"
                        :disabled="checkoutStore.currentPage === checkoutStore.totalPages"
                        class="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
                        {{ $t('pagination.next') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- order-details-dialog component -->
        <order-details-dialog :order="selectedOrder" v-if="isDialogOpen" :isOpen="isDialogOpen" @close="closeDialog" />

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
const checkoutStore = useCheckoutStore();
const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast()

const currentStatus = ref('')
const orderStatus = ref([])

onMounted(async () => {
    await checkoutStore.fetchOrders();
    await checkoutStore.fetchStatus();
    orderStatus.value = checkoutStore.status
});

const updateOrderStatus = async (orderId, newStatus, newStatusAr) => {
    try {
        const order = checkoutStore.paginatedOrders.find((o) => o.id === orderId);
        if (!order) return;
        order.loading = true;
        order.action = checkoutStore.fetchStatus()
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await checkoutStore.updateOrderStatus(orderId, newStatus, newStatusAr);
        await checkoutStore.fetchOrders();
        triggerToast({
            title: t('toast.great'),
            message: t('toast.order_status_updated'),
            type: 'success',
            icon: 'fa-solid fa-circle-check',
        });
    } catch (error) {
        console.error(error);
    } finally {
        const order = checkoutStore.paginatedOrders.find((o) => o.id === orderId);
        if (order) {
            order.loading = false;
            order.action = null;
        }
    }
};

const isDialogOpen = ref(false);
const selectedOrder = ref({});

const openOrderDetails = async (order) => {
    order.loading = true;
    selectedOrder.value = order;
    await new Promise(resolve => setTimeout(resolve, 2000));
    order.loading = false;
    isDialogOpen.value = true;
};

const closeDialog = () => {
    isDialogOpen.value = false;
    selectedOrder.value = {};
};

const startDate = ref('');
const endDate = ref('');

const filterOrdersByDate = () => {
    if (!startDate.value || !endDate.value) {
        alert('Please select both start and end dates');
        return;
    }
    const filteredOrders = checkoutStore.orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= new Date(startDate.value) && orderDate <= new Date(endDate.value);
    });
    checkoutStore.paginatedOrders = filteredOrders;
};

const deleteOrder = async (orderId) => {
    const order = checkoutStore.paginatedOrders.find(o => o.id === orderId);
    if (order) {
        order.loading = true;
    }
    try {
        await checkoutStore.deleteOrder(orderId);
        checkoutStore.paginatedOrders = checkoutStore.paginatedOrders.filter(order => order.id !== orderId);
        triggerToast({
            title: t('toast.great'),
            message: t('toast.order_deleted'),
            type: 'success',
            icon: 'fa-solid fa-circle-check',
        });
    } catch (error) {
        triggerToast({
            title: t('toast.error'),
            message: t('toast.order_deletion_failed'),
            type: 'error',
            icon: 'fa-solid fa-triangle-exclamation',
        });
    } finally {
        setTimeout(() => {
            if (order) {
                order.loading = false;
            }
        }, 3000);
    }
};

const getStatusTitle = (statusId) => {
    currentStatus.value = checkoutStore.status.find((s) => s.id === statusId);
    // console.log(currentStatus.value)
    return currentStatus.value
}

const { t } = useI18n()

definePageMeta({
    layout: 'dashboard'
})

useHead({
    titleTemplate: () => t("head.orders"),
});
</script>