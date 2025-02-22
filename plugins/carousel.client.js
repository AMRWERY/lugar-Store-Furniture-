import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Carousel", Carousel);
  nuxtApp.vueApp.component("Slide", Slide);
  nuxtApp.vueApp.component("Pagination", Pagination);
  nuxtApp.vueApp.component("Navigation", Navigation);

  // Optional: Set global defaults
  // const defaultConfig = {
  //   itemsToShow: 5,
  //   gap: 20,
  //   breakpoints: {
  //     200: {
  //       itemsToShow: 1,
  //       snapAlign: "center-even",
  //       wrapAround: true,
  //       // gap: 10,
  //       // transition: 400,
  //       // breakpointMode: "carousel",
  //     },
  //     400: {
  //       itemsToShow: 4,
  //       snapAlign: "center-even",
  //       wrapAround: true,
  //       // gap: 15,
  //       // transition: 400,
  //       // breakpointMode: "carousel",
  //     },
  //     700: {
  //       itemsToShow: 2,
  //       snapAlign: "center-even",
  //       wrapAround: true,
  //       // transition: 400,
  //       // breakpointMode: "carousel",
  //     },
  //     1024: {
  //       itemsToShow: 2.5,
  //       snapAlign: "center-even",
  //       wrapAround: true,
  //       // transition: 400,
  //       // breakpointMode: "carousel",
  //     },
  //     1280: {
  //       itemsToShow: 4,
  //       snapAlign: "center-even",
  //       wrapAround: true,
  //       transition: 400,
  //       breakpointMode: "carousel",
  //     },
  //   },
  // };

  const defaultConfig = {
    itemsToShow: 4,
    wrapAround: false,
    snapAlign: 'center',
    gap: 20,
    breakpoints: {
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
    }
  };

  // Set default props for all carousels
  Carousel.props = {
    ...Carousel.props,
    settings: {
      type: Object,
      default: () => defaultConfig,
    },
  };
});
