<template>
  <div>
    <div class="min-h-screen py-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <div class="max-w-6xl px-4 mx-auto">
        <h1 class="mb-6 text-4xl font-extrabold text-center text-gray-800">
          Exclusive Special Offers
        </h1>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="product in specialProducts" :key="product.id"
            class="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div class="relative">
              <img :src="product.image" :alt="product.name" class="object-cover w-full h-56" />
              <div class="absolute top-0 left-0 px-3 py-1 text-xs font-semibold text-white uppercase bg-red-500">
                Special Offer
              </div>
            </div>
            <div class="p-4">
              <h2 class="text-xl font-bold text-gray-700">{{ product.name }}</h2>
              <p class="mt-2">
                <span class="mr-2 text-gray-500 line-through">
                  ${{ product.originalPrice }}
                </span>
                <span class="text-lg font-bold text-green-600">
                  ${{ product.offerPrice }}
                </span>
              </p>
              <button
                class="w-full py-2 mt-4 text-white transition-colors duration-300 bg-green-600 rounded hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Sample product data with special offers
const specialProducts = ref([
  {
    id: 1,
    name: 'Modern Lamp',
    originalPrice: 79.99,
    offerPrice: 49.99,
    image: 'https://justfields.com/storage/projects/7M5rV059/product-card-img.jpg',
  },
  {
    id: 2,
    name: 'Stylish Chair',
    originalPrice: 129.99,
    offerPrice: 89.99,
    image: 'https://justfields.com/storage/projects/7M5rV059/product-card-img.jpg',
  },
  {
    id: 3,
    name: 'Contemporary Table',
    originalPrice: 199.99,
    offerPrice: 149.99,
    image: 'https://justfields.com/storage/projects/7M5rV059/product-card-img.jpg',
  },
  {
    id: 4,
    name: 'Cozy Sofa',
    originalPrice: 299.99,
    offerPrice: 229.99,
    image: 'https://justfields.com/storage/projects/7M5rV059/product-card-img.jpg',
  },
  {
    id: 5,
    name: 'Elegant Vase',
    originalPrice: 39.99,
    offerPrice: 24.99,
    image: 'https://justfields.com/storage/projects/7M5rV059/product-card-img.jpg',
  },
  {
    id: 6,
    name: 'Designer Clock',
    originalPrice: 59.99,
    offerPrice: 34.99,
    image: 'https://justfields.com/storage/projects/7M5rV059/product-card-img.jpg',
  },
])
</script>