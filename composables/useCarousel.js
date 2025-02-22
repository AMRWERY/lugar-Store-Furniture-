// export const useCarousel = () => {
//     const breakpoints = ref({
//       200: { itemsToShow: 1, snapAlign: "center-even" },
//       400: { itemsToShow: 1.5, snapAlign: "center-even" },
//       700: { itemsToShow: 2, snapAlign: "center-even" },
//       1024: { itemsToShow: 4, snapAlign: "center-even" },
//       1280: { itemsToShow: 4, snapAlign: "center-even" },
//     });
  
//     const carouselConfig = computed(() => ({
//       wrapAround: true,
//       transition: 600,
//       mouseDrag: true,
//       touchDrag: true,
//       breakpointMode: 'carousel',
//       breakpoints: breakpoints.value,
//     }));
  
//     return { carouselConfig };
//   };

export const useCarousel = () => {
  const breakpoints = ref({
    200: { 
      itemsToShow: 1,
      snapAlign: "center",
      wrapAround: false,
      // gap: 10
    },
    400: { 
      itemsToShow: 1,
      snapAlign: "center",
      wrapAround: false,
      gap: 15
    },
    700: {
      itemsToShow: 2,
      snapAlign: "start",
      wrapAround: true,
      gap: 20
    },
    1024: {
      itemsToShow: 3,
      snapAlign: "start",
      gap: 25
    },
    1280: {
      itemsToShow: 4,
      snapAlign: "start",
      gap: 30
    }
  });

  const carouselConfig = computed(() => ({
    itemsToShow: 4,
    wrapAround: false,
    transition: 600,
    mouseDrag: true,
    touchDrag: true,
    breakpointMode: 'carousel',
    snapAlign: 'center', // Default center alignment
    breakpoints: breakpoints.value,
  }));

  return { carouselConfig };
};