<template>
    <div>
        <div id="carouselExampleCaptions" class="relative" data-twe-carousel-init data-twe-ride="carousel"
            data-twe-interval="4000" data-twe-keyboard="true" data-twe-touch="false">
            <!--Carousel indicators-->
            <div class="absolute bottom-0 start-0 end-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                data-twe-carousel-indicators>
                <button type="button" data-twe-target="#carouselExampleCaptions" data-twe-slide-to="0"
                    data-twe-carousel-active
                    class="mx-[6px] h-[10px] w-[10px] flex-initial cursor-pointer border-0 border-transparent bg-black bg-clip-padding opacity-50 rounded-full transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-twe-target="#carouselExampleCaptions" data-twe-slide-to="1"
                    class="mx-[6px] h-[10px] w-[10px] flex-initial cursor-pointer border-0 border-transparent bg-black bg-clip-padding opacity-50 rounded-full transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                    aria-label="Slide 2"></button>
            </div>

            <!--Carousel items-->
            <div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                <!--First item-->
                <div class="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-active data-twe-carousel-item style="backface-visibility: hidden">
                    <img src="https://justfields.com/storage/projects/7M5rV059/carousel-01.jpg" class="block w-full" />
                </div>
                <!--Second item-->
                <div class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item style="backface-visibility: hidden">
                    <img src="https://justfields.com/storage/projects/7M5rV059/carousel-02.jpg" class="block w-full" />
                </div>
            </div>

            <!--Carousel controls - prev item-->
            <button
                class="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-gray-800 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button" data-twe-target="#carouselExampleCaptions" data-twe-slide="prev">
                <span class="inline-block w-8 h-8 rtl:rotate-180">
                    <icon name="material-symbols:arrow-back-ios" class="w-6 h-6 text-black rtl:rotate-180" />
                </span>
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
            </button>
            <!--Carousel controls - next item-->
            <button
                class="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-gray-800 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button" data-twe-target="#carouselExampleCaptions" data-twe-slide="next">
                <span class="inline-block w-8 h-8 rtl:rotate-180">
                    <icon name="material-symbols:arrow-forward-ios-rounded" class="w-6 h-6 text-black rtl:rotate-180" />
                </span>
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
            </button>
        </div>
    </div>
</template>

<script setup>
onMounted(async () => {
    const { Carousel, initTWE } = await import("tw-elements");
    initTWE({ Carousel });
});
</script>