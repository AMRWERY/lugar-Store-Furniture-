<template>
    <div>
        <h3 class="py-2 mt-5 mb-12 text-2xl font-bold text-start">{{ $t('dashboard.orders') }}</h3>
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
                                Order ID
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                {{ $t('dashboard.email') }}
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Name
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Date
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Phone Number
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                Address
                            </p>
                        </th>
                        <th class="p-4 border-b border-slate-200 bg-slate-50">
                            <p class="text-sm font-normal leading-none text-slate-500">
                                State
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
                <tbody>
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
                                <icon name="svg-spinners:tadpole" />
                            </div>
                            <span v-else>View Items</span>
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <p class="text-sm font-semibold">
                                {{ order.status || 'Pending' }}
                            </p>
                        </td>
                        <td class="p-4 py-5">
                            <div class="flex space-s-2">
                                <button @click="updateOrderStatus(order.id, 'Accepted')"
                                    :disabled="order.status === 'Accepted'">
                                    <icon v-if="order.loading && order.action === 'Accepted'"
                                        name="svg-spinners:6-dots-rotate" size="20px" class="text-green-500" />
                                    <icon name="material-symbols:check-circle"
                                        class="w-8 h-8 text-white bg-green-500 rounded hover:bg-green-600 disabled:opacity-50"
                                        v-else />
                                </button>
                                <button @click="updateOrderStatus(order.id, 'Rejected')"
                                    :disabled="order.status === 'Rejected'">
                                    <icon v-if="order.loading && order.action === 'Rejected'"
                                        name="svg-spinners:6-dots-rotate" size="20px" class="text-red-500" />
                                    <icon name="material-symbols:cancel"
                                        class="w-8 h-8 text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
                                        v-else />
                                </button>
                            </div>
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
        <transition name="dialog">
            <order-details-dialog v-if="isDialogOpen" :order="selectedOrder" @close="closeDialog" />
        </transition>

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
const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

onMounted(async () => {
    await checkoutStore.fetchOrders();
});

const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const order = checkoutStore.paginatedOrders.find((o) => o.id === orderId);
        if (!order) return;
        order.loading = true;
        order.action = newStatus;
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await checkoutStore.updateOrderStatus(orderId, newStatus);
        await checkoutStore.fetchOrders();
        showToast.value = true;
        toastTitle.value = t('toast.great');
        toastMessage.value = `${t('order_status_updated')}: ${orderId}`
        toastType.value = 'success';
        toastIcon.value = 'mdi:check-circle';
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

const { t } = useI18n()

definePageMeta({
    layout: 'dashboard'
})

useHead({
    titleTemplate: () => t("head.orders"),
});
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
    transition: opacity 1.5s;
}

.dialog-enter,
.dialog-leave-to {
    opacity: 0;
}
</style>