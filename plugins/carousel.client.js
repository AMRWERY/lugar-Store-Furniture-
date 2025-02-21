import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Carousel", Carousel);
  nuxtApp.vueApp.component("Slide", Slide);
  nuxtApp.vueApp.component("Pagination", Pagination);
  nuxtApp.vueApp.component("Navigation", Navigation);

  // Optional: Set global defaults
  const defaultConfig = {
    itemsToShow: 5,
    gap: 20,
    breakpoints: {
      200: {
        itemsToShow: 1.5,
        snapAlign: "center",
        wrapAround: true,
        gap: 10,
        // transition: 400,
        // breakpointMode: "carousel",
      },
      400: {
        itemsToShow: 1.5,
        snapAlign: "start",
        wrapAround: true,
        gap: 15,
        // transition: 400,
        // breakpointMode: "carousel",
      },
      700: {
        itemsToShow: 2,
        snapAlign: "center",
        wrapAround: true,
        // transition: 400,
        // breakpointMode: "carousel",
      },
      1024: {
        itemsToShow: 2.5,
        snapAlign: "start",
        wrapAround: true,
        // transition: 400,
        // breakpointMode: "carousel",
      },
      1280: {
        itemsToShow: 4,
        snapAlign: "start",
        wrapAround: true,
        transition: 400,
        breakpointMode: "carousel",
      },
    },
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
