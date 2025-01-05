<template>
  <div>
    <div class="flex items-center justify-between">
      <h3 class="py-2 mt-5 mb-12 text-2xl font-bold text-start">{{ $t('dashboard.customer_messages') }}</h3>
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
            </th>
            <th class="p-4 border-b border-slate-200 bg-slate-50">
            </th>
          </tr>
        </thead>

        <tbody v-if="store.paginatedMessages.length === 0">
          <tr>
            <td colspan="10" class="p-4 text-2xl font-semibold text-center text-gray-500">
              {{ $t('dashboard.no_messages_available') }}
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr class="border-b hover:bg-slate-50 border-slate-200" v-for="(message, index) in store.paginatedMessages"
            :key="message.id">
            <td class="p-4 py-5">
              <p class="block text-sm text-slate-500">{{ (store.currentPage - 1) *
                store.messagesPerPage +
                index +
                1 }}</p>
            </td>
            <td class="p-4 py-5">
              <p class="block text-sm text-slate-500">{{ message.email }}</p>
            </td>
            <td class="p-4 py-5">
              <p class="text-sm text-slate-500">{{ message.name }}</p>
            </td>
            <td class="p-4 py-5">
              <p class="text-sm text-slate-500">{{ message.date }}</p>
            </td>
            <td class="p-4 py-5">
              <p class="text-sm text-slate-500">{{ message.phone }}</p>
            </td>
            <td class="p-4 py-5">
              <p class="text-sm text-blue-700 cursor-pointer" @click="openMessageDetails(message)">
              <div class="flex items-center justify-center" v-if="message.loading">
                <icon name="svg-spinners:tadpole" />
              </div>
              <span v-else>{{ $t('btn.view_message') }}</span>
              </p>
            </td>
            <td class="p-4 py-5">
              <button type="button" @click="deleteMessage(message.id)">
                <icon name="svg-spinners:tadpole" class="text-blue-500" v-if="message.loading" />
                <icon name="material-symbols:delete-sharp" class="text-red-700" data-twe-toggle="tooltip"
                  data-twe-placement="top" :title="$t('tooltip.delete_message')" v-else />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex items-center px-4 py-3">
        <div class="flex mt-3 space-x-1 ms-auto">
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
          <button @click="store.changePage(store.currentPage + 1)" :disabled="store.currentPage === store.totalPages"
            class="px-3 py-1 text-sm font-normal transition duration-200 bg-white border rounded min-w-9 min-h-9 text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400 ease">
            {{ $t('pagination.next') }}
          </button>
        </div>
      </div>
    </div>

    <!-- order-details-dialog component -->
    <transition name="dialog">
      <message-dialog v-if="isDialogOpen" :message="selectedMessage" @close="closeDialog" />
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
const store = useContactStore();
const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

onMounted(() => {
  store.fetchMessages()
})

const isDialogOpen = ref(false);
const selectedMessage = ref({});

const openMessageDetails = async (message) => {
  message.loading = true;
  selectedMessage.value = message;
  await new Promise(resolve => setTimeout(resolve, 2000));
  message.loading = false;
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  selectedMessage.value = {};
};

const { t } = useI18n()

const deleteMessage = async (messageId) => {
  const message = store.paginatedMessages.find(o => o.id === messageId);
  if (message) {
    message.loading = true;
  }
  try {
    await store.deleteMessage(messageId);
    store.paginatedMessages = store.paginatedMessages.filter(message => message.id !== messageId);
    showToast.value = true;
    toastTitle.value = t('toast.great');
    toastMessage.value = t('toast.message_deleted');
    toastType.value = 'success';
    toastIcon.value = 'mdi:check-circle';
  } catch (error) {
    showToast.value = true;
    toastTitle.value = t('toast.error');
    toastMessage.value = t('toast.message_deletion_failed');
    toastType.value = 'error';
    toastIcon.value = 'mdi:alert-circle';
  } finally {
    setTimeout(() => {
      if (message) {
        message.loading = false;
      }
    }, 3000);
  }
};

onMounted(async () => {
  const { Tooltip, initTWE } = await import("tw-elements");
  initTWE({ Tooltip });
});

definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => t("head.customer_messages"),
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