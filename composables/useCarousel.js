export const useCarousel = () => {
    const breakpoints = ref({
      200: { itemsToShow: 1.5, snapAlign: "center" },
      400: { itemsToShow: 1.5, snapAlign: "start" },
      700: { itemsToShow: 2, snapAlign: "center" },
      1024: { itemsToShow: 2.5, snapAlign: "start" },
      1280: { itemsToShow: 4, snapAlign: "start" },
    });
  
    const carouselConfig = computed(() => ({
      wrapAround: true,
      transition: 600,
      mouseDrag: true,
      touchDrag: true,
      breakpointMode: 'carousel',
      breakpoints: breakpoints.value,
    }));
  
    return { carouselConfig };
  };
  