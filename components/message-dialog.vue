<template>
  <div>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="flex flex-col w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <div v-if="messages?.length" class="flex space-x-6">
          <!-- Customer Info Section -->
          <div class="flex-1 p-6 rounded-lg shadow-md bg-gray-50">
            <h3 class="mb-4 text-xl font-semibold text-gray-900">
              {{ message.name }} {{ $t('dashboard.s_information') }}
            </h3>
            <div class="space-y-3">
              <p class="text-sm text-gray-700">
                <span class="font-semibold">{{ $t('dashboard.email') }}:</span>
                {{ message.email }}
              </p>
              <p class="text-sm text-gray-700">
                <span class="font-semibold">{{ $t('dashboard.phone_number') }}:</span>
                {{ message.phone }}
              </p>
            </div>
          </div>

          <!-- Customer message Section with Hidden Scroll -->
          <div class="flex-1 p-6 bg-white rounded-lg shadow-md">
            <div class="space-y-4 overflow-y-auto max-h-96 custom-scroll">
              <div class="flex-1">
                <p class="text-base font-normal text-gray-900">
                  {{ message.message }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end mt-6">
          <button class="px-6 py-2.5 btn-style" @click="closeDialog">
            {{ $t('btn.close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: Object
});

const emit = defineEmits(['close']);

const store = useContactStore();
const messages = computed(() => store?.messages || []);

const closeDialog = () => {
  emit('close');
};
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>