<template>
    <transition name="overlay-fade">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div class="flex items-center justify-center">
          <div class="flex justify-center text-5xl text-white align-center">
            <div>{{ translatedMessage }}</div>
            <icon name="svg-spinners:blocks-scale" class="mt-3 ms-2" />
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'loading_btn.logging_out'
    }
  });
  
  const { t } = useI18n();
  
  const translatedMessage = computed(() => {
    return t(props.message);
  });
  </script>
  
  <style scoped>
  .overlay-fade-enter-active,
  .overlay-fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .overlay-fade-enter-from,
  .overlay-fade-leave-to {
    opacity: 0;
  }
  
  .overlay-fade-enter-to,
  .overlay-fade-leave-from {
    opacity: 1;
  }
  </style>