// // export const useCarousel = () => {
// //     const breakpoints = ref({
// //       200: { itemsToShow: 1, snapAlign: "center-even" },
// //       400: { itemsToShow: 1.5, snapAlign: "center-even" },
// //       700: { itemsToShow: 2, snapAlign: "center-even" },
// //       1024: { itemsToShow: 4, snapAlign: "center-even" },
// //       1280: { itemsToShow: 4, snapAlign: "center-even" },
// //     });
  
// //     const carouselConfig = computed(() => ({
// //       wrapAround: true,
// //       transition: 600,
// //       mouseDrag: true,
// //       touchDrag: true,
// //       breakpointMode: 'carousel',
// //       breakpoints: breakpoints.value,
// //     }));
  
// //     return { carouselConfig };
// //   };

// export const useCarousel = () => {
//   const breakpoints = ref({
//     320: {  // Changed from 200 to 320 (more standard mobile breakpoint)
//       itemsToShow: 1,
//       snapAlign: "center",
//       wrapAround: false,
//       gap: 10
//     },
//     480: {  // Changed from 400
//       itemsToShow: 1.2,
//       snapAlign: "center",
//       wrapAround: false,
//       gap: 15
//     },
//     640: {  // Changed from 700
//       itemsToShow: 2,
//       snapAlign: "start",
//       wrapAround: true,
//       gap: 15
//     },
//     1024: {
//       itemsToShow: 3,
//       snapAlign: "start",
//       gap: 20
//     },
//     1280: {
//       itemsToShow: 4,
//       snapAlign: "start",
//       gap: 25
//     }
//   });

//   const carouselConfig = computed(() => ({
//     itemsToShow: 1, // Default to mobile-first
//     wrapAround: false,
//     transition: 600,
//     mouseDrag: true,
//     touchDrag: true,
//     breakpoints: breakpoints.value,
//   }));

//   return { carouselConfig };
// };
// // export const useCarousel = () => {
// //   const breakpoints = ref({
// //     200: { 
// //       itemsToShow: 1,
// //       snapAlign: "center",
// //       wrapAround: false,
// //       // gap: 10
// //     },
// //     400: { 
// //       itemsToShow: 1,
// //       snapAlign: "center",
// //       wrapAround: false,
// //       gap: 15
// //     },
// //     700: {
// //       itemsToShow: 2,
// //       snapAlign: "start",
// //       wrapAround: true,
// //       gap: 20
// //     },
// //     1024: {
// //       itemsToShow: 3,
// //       snapAlign: "start",
// //       gap: 25
// //     },
// //     1280: {
// //       itemsToShow: 4,
// //       snapAlign: "start",
// //       gap: 30
// //     }
// //   });

// //   const carouselConfig = computed(() => ({
// //     itemsToShow: 4,
// //     wrapAround: false,
// //     transition: 600,
// //     mouseDrag: true,
// //     touchDrag: true,
// //     breakpointMode: 'carousel',
// //     snapAlign: 'center', // Default center alignment
// //     breakpoints: breakpoints.value,
// //   }));

// //   return { carouselConfig };
// // };

// composables/useCarousel.js
export const useCarousel = () => {
  const config = ref({
    itemsToShow: 1,
    wrapAround: false,
    snapAlign: 'center',
    transition: 600,
    mouseDrag: true,
    touchDrag: true,
    breakpoints: {
      320: { itemsToShow: 1, snapAlign: 'center' },
      640: { itemsToShow: 2, snapAlign: 'start' },
      1024: { itemsToShow: 3, snapAlign: 'start' },
      1280: { itemsToShow: 4, snapAlign: 'start' }
    }
  });

  return { config };
};