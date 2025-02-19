<template>
  <div>
    <div class="max-w-4xl p-6 mx-auto my-10 bg-white rounded-lg shadow-lg">
      <!-- Order Number -->
      <div class="flex items-center justify-between mb-12">
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">{{ $t('order_summary.order_summary') }}</h2>
          <ClientOnly>
            <p class="mt-1 text-sm text-gray-500">
              <!-- {{ $t('order_summary.order_number') }} <span class="font-semibold text-gray-900">{{ orderId }}</span> -->
            </p>
          </ClientOnly>
        </div>
      </div>

      <!-- Product Details -->
      <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b" v-for="(item, index) in orderSummary?.products || []"
        :key="item.productId">
        <div class="col-span-2">
          <img :src="item.imgOne" class="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div class="col-span-10">
          <p class="text-lg font-semibold text-gray-900">{{ $i18n.locale === 'ar' ? item.titleAr : item.title }}</p>
          <p class="text-sm font-semibold text-gray-700"><span class="me-1">{{ $t('order_summary.category') }} </span>{{
            $i18n.locale === 'ar' ? item.categoryTitleAr : item.categoryTitle }}</p>
        </div>
      </div>

      <!-- Subtotal Section -->
      <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
        <div class="col-span-8">
          <dt class="text-sm font-medium text-gray-500">{{ $t('order_summary.subtotal') }}</dt>
        </div>
        <div class="col-span-4 text-end">
          <dd class="text-sm font-medium text-gray-900">{{ subTotalAmount }} {{ $t('products.le') }}</dd>
        </div>
      </div>

      <!-- Savings Section -->
      <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
        <div class="col-span-8">
          <dt class="text-sm font-medium text-gray-500">{{ $t('order_summary.savings') }}</dt>
        </div>
        <div class="col-span-4 text-end">
          <dd class="text-sm font-medium text-green-500">%{{ averageDiscount }}</dd>
        </div>
      </div>

      <!-- Total Section -->
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-8 font-semibold text-gray-900">
          <dt class="text-xl">{{ $t('order_summary.total') }}</dt>
        </div>
        <div class="col-span-4 text-end">
          <dd class="text-xl font-semibold text-gray-900">{{ totalAmount }} {{ $t('products.le') }}</dd>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const orderSummary = ref(null);

const subTotalAmount = computed(() => {
  if (!orderSummary.value || !orderSummary.value.products) return "0.00";
  return orderSummary.value.products.reduce((total, item) => {
    return total + (parseFloat(item.discountedPrice || 0) * (item.qty || item.quantity || 1));
  }, 0).toFixed(2);
});

const totalDiscount = computed(() => {
  if (!orderSummary.value || !orderSummary.value.products) return 0;
  return orderSummary.value.products.reduce((total, item) => {
    const discount = parseFloat(item.discount || 0);
    const quantity = item.qty || item.quantity || 1;
    return total + (discount * quantity);
  }, 0);
});

const averageDiscount = computed(() => {
  if (!orderSummary.value || !orderSummary.value.products) return 0;
  const totalItems = orderSummary.value.products.reduce((total, item) => total + (item.qty || item.quantity || 1), 0);
  return totalItems > 0 ? (totalDiscount.value / totalItems).toFixed(2) : 0;
});

const totalAmount = computed(() => {
  const subtotal = parseFloat(subTotalAmount.value);
  const discountPercent = parseFloat(averageDiscount.value) || 0;
  const savingsAmount = subtotal * (discountPercent / 100);
  return (subtotal - savingsAmount).toFixed(2);
});

onMounted(() => {
  const savedOrder = localStorage.getItem("order-summary");
  if (savedOrder) {
    try {
      orderSummary.value = JSON.parse(savedOrder);
      console.log("Loaded order summary from localStorage:", orderSummary.value);
    } catch (error) {
      console.error("Error parsing order summary from localStorage:", error);
    }
  }
});

const { t } = useI18n()

useHead({
  titleTemplate: () => t("head.order_summary"),
});
</script>