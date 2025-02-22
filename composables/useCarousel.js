export const useCarousel = () => {
    const breakpoints = ref({
      200: { itemsToShow: 1, snapAlign: "center-even" },
      400: { itemsToShow: 1.5, snapAlign: "center-even" },
      700: { itemsToShow: 2, snapAlign: "center-even" },
      1024: { itemsToShow: 4, snapAlign: "center-even" },
      1280: { itemsToShow: 4, snapAlign: "center-even" },
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
  