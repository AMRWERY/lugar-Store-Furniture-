<template>
    <div>
        <button v-if="isVisible" @click="scrollToTop"
            class="fixed z-50 flex items-center justify-center px-4 py-4 border rounded-full shadow-lg btn-style bottom-20 end-8"
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