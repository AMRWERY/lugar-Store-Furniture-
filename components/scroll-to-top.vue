<template>
    <div>
        <button v-if="isVisible" @click="scrollToTop"
            class="fixed flex items-center justify-center p-3 text-black transition-all duration-300 bg-gray-300 border rounded-full shadow-lg bottom-36 end-8"
            aria-label="Scroll to top">
            <i class="fa-solid fa-arrow-up"></i>
        </button>
    </div>
</template>

<script setup>
const isVisible = ref(false);

const handleScroll = () => {
    isVisible.value = window.scrollY > 200;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>