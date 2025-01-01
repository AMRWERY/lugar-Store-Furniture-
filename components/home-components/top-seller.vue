<template>
  <div>
    <div class="mx-auto max-w-7xl">
      <div class="flex items-center justify-center mt-8 mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
        <span class="mx-4 text-2xl font-bold leading-10 capitalize">top seller</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
      </div>

      <ClientOnly>
        <Carousel v-bind="config">
          <Slide v-for="card in cards" :key="card">
            <div class="carousel__item">
              <div class="relative flex flex-col w-[300px] max-w-xs overflow-hidden bg-white group">
                <nuxt-link class="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl" to="">
                  <div class="relative w-full h-full">
                    <img class="absolute top-0 object-cover w-full h-full transition-all duration-500 ease-in-out end-0"
                      :src="card.imgOne" />
                    <img
                      class="absolute top-0 object-cover w-full h-full transition-all duration-500 ease-in-out opacity-0 end-0 group-hover:opacity-100"
                      :src="card.imgTwo" />
                  </div>
                </nuxt-link>

                <div class="px-5 pb-5 mt-4">
                  <nuxt-link to="" class="capitalize">
                    <h5 class="font-bold tracking-tight truncate text-md text-slate-900">
                      {{ card.title }}
                    </h5>
                  </nuxt-link>
                  <div class="flex flex-col items-center justify-between mt-2 mb-5 font-semibold text-center ms-1">
                    <p>
                      <span class="text-gray-500 dark:text-gray-400 me-1">{{
                        card.price }} LE</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </ClientOnly>

      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
          <div v-for="card in cardsOne" :key="card" class="relative group transit">
            <div
              class="block xs:min-w-full rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              <div class="relative overflow-hidden bg-no-repeat bg-cover">
                <img class="w-full transit" :src="card.img" />
                <div
                  class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
                  <div class="text-center">
                    <p class="text-lg capitalize">{{ card.subtitle }}</p>
                    <p class="font-semibold text-red-500 capitalize text-8xl">{{ card.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = {
  itemsToShow: 4,
  wrapAround: true,
  gap: 5,
  snapAlign: "center",
  autoplay: 4000,
  pauseAutoplayOnHover: true,
  breakpoints: {
    200: {
      itemsToShow: 1.5,
      snapAlign: "center",
    },
    400: {
      itemsToShow: 2,
      snapAlign: "start",
    },
    700: {
      itemsToShow: 3,
      snapAlign: "center",
    },
    1024: {
      itemsToShow: 4,
      snapAlign: "start",
    },
  },
};

const cards = ref([
  { imgOne: "https://justfields.com/storage/projects/7M5rV059/top-01.jpg", imgTwo: 'https://justfields.com/storage/projects/7M5rV059/top-02.jpg', title: 'white bear', price: '100' },
  { imgOne: "https://justfields.com/storage/projects/7M5rV059/top-03.jpg", imgTwo: 'https://justfields.com/storage/projects/7M5rV059/top-04.jpg', title: 'penguin', price: '200' },
  { imgOne: "https://justfields.com/storage/projects/7M5rV059/top-05.jpg", imgTwo: 'https://justfields.com/storage/projects/7M5rV059/top-06.jpg', title: 'candy', price: '300' },
  { imgOne: "https://justfields.com/storage/projects/7M5rV059/top-07.jpg", imgTwo: 'https://justfields.com/storage/projects/7M5rV059/top-08.jpg', title: 'three wheel', price: '400' },
])

const cardsOne = ref([
  { title: 'sofa', subtitle: 'save 30%', img: 'https://justfields.com/storage/projects/7M5rV059/home-card-01.jpg' },
  { title: 'chair', subtitle: 'save 30%', img: 'https://justfields.com/storage/projects/7M5rV059/home-card-02.jpg' },
])
</script>