<template>
  <div>
    <div class="py-6 sm:py-8 lg:py-12" data-aos="zoom-in-up">
      <div class="max-w-4xl px-4 mx-auto">
        <div class="grid gap-8 sm:grid-cols-2 md:gap-12 xl:grid-cols-3 xl:gap-16">
          <!-- feature - start -->
          <div class="flex gap-4 md:gap-6">
            <div
              class="flex items-center justify-center w-12 h-12 text-gray-700 rounded-lg shrink-0 md:h-14 md:w-14 md:rounded-xl">
              <i class="fa-regular fa-credit-card fa-3x"></i>
            </div>

            <div>
              <h3 class="mb-2 text-lg font-semibold md:text-xl">{{ $t('home.cash_on_delivery') }}</h3>
              <p class="mb-2 text-gray-500">{{ $t('home.cash_on_delivery') }}</p>
            </div>
          </div>
          <!-- feature - end -->

          <!-- feature - start -->
          <div class="flex gap-4 md:gap-6">
            <div
              class="flex items-center justify-center w-12 h-12 text-gray-700 rounded-lg shrink-0 md:h-14 md:w-14 md:rounded-xl">
              <i class="fa-solid fa-cart-shopping fa-3x"></i>
            </div>

            <div>
              <h3 class="mb-2 text-lg font-semibold md:text-xl">{{ $t('home.45_Day_return') }}</h3>
              <p class="mb-2 text-gray-500">{{ $t('home.shop_with_confidence') }}</p>
            </div>
          </div>
          <!-- feature - end -->

          <!-- feature - start -->
          <div class="flex gap-4 md:gap-6">
            <div
              class="flex items-center justify-center w-12 h-12 text-gray-700 rounded-lg shrink-0 md:h-14 md:w-14 md:rounded-xl">
              <i class="fa-solid fa-award fa-3x"></i>
            </div>

            <div>
              <h3 class="mb-2 text-lg font-semibold md:text-xl">{{ $t('home.guarantee') }}</h3>
              <p class="mb-2 text-gray-500">{{ $t('home.5_years_warranty') }}</p>
            </div>
          </div>
          <!-- feature - end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>