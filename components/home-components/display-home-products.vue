<template>
    <div>
        <div class="max-w-full py-6 mx-auto space-y-6 sm:px-6 lg:px-8">

            <!-- features componenet -->
            <features />

            <!-- dynamic-products-carousel component -->
            <dynamic-products-carousel :config="config" :subCategoryTitle="'Top Seller'"
                :title="$t('home.top_seller')" />

            <!-- dynamic-products-carousel component -->
            <dynamic-products-carousel :config="config" :subCategoryTitle="'24h Delivery items'"
                :title="$t('home.24h_delivery_items')" />

            <!-- dynamic-products-carousel component -->
            <dynamic-products-carousel :config="config" :subCategoryTitle="'Special Offers'"
                :title="$t('home.special_offers')" />

            <!-- categories-cards component-->
            <categories-cards />

            <!-- banner component-->
            <banner />

            <!-- new-products component-->
            <new-products />

            <!-- dynamic-products-carousel component -->
            <dynamic-products-carousel :config="config" :subCategoryTitle="'Customer Choice'"
                :title="$t('home.customer_choice')" />
        </div>
    </div>
</template>

<script setup>
const config = {
    itemsToShow: 5,
    gap: 5,
    breakpoints: {
        200: { itemsToShow: 1.5, snapAlign: 'center', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
        400: { itemsToShow: 1.5, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
        700: { itemsToShow: 2, snapAlign: 'center', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
        1024: { itemsToShow: 2.5, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
        1280: { itemsToShow: 4, snapAlign: 'start', wrapAround: true, transition: 400, breakpointMode: 'carousel' },
    },
};
</script>