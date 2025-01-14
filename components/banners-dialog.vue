<template>
  <div>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="flex flex-col w-[500px] max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <div class="mb-4">
          <div class="mx-auto overflow-hidden rounded-lg">
            <div class="md:flex">
              <div class="w-full">
                <div
                  class="relative flex items-center justify-center h-48 bg-gray-100 border-2 border-blue-700 border-dashed border-dotted rounded-lg">
                  <div class="absolute">
                    <div class="flex flex-col items-center">
                      <icon name="material-symbols:add-photo-alternate" class="w-20 h-20 text-blue-700" />
                      <span class="block font-normal text-gray-400">{{ $t('form.attach_your_files_here') }}</span>
                    </div>
                  </div>
                  <input type="file" class="w-full h-full opacity-0" multiple>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center mb-4 space-s-6">
          <div class="mt-4 border border-gray-200">
            <img src="@/assets/banner-img-01.jpg" class="w-48 h-32 rounded-lg">
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
const emit = defineEmits(['close']);

const closeDialog = () => {
  emit('close');
};
</script>