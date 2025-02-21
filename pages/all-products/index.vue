<template>
  <div>
    <!-- Mobile filter dialog -->
    <HeadlessTransitionRoot as="template" :show="mobileFiltersOpen">
      <HeadlessDialog class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
        <HeadlessTransitionChild as="template" enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25" />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <HeadlessTransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="translate-x-full">
            <HeadlessDialogPanel
              class="relative flex flex-col max-w-xs py-4 pb-12 overflow-y-auto bg-white shadow-xl ms-auto size-full">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button type="button"
                  class="flex items-center justify-center p-2 text-gray-400 bg-white rounded-md -me-2 size-10"
                  @click="mobileFiltersOpen = false">
                  <span class="sr-only">Close menu</span>
                  <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4 border-t border-gray-200">
                <HeadlessDisclosure as="div" v-for="section in filters" :key="section.id"
                  class="px-4 py-6 border-t border-gray-200" v-slot="{ open }">
                  <h3 class="flow-root -mx-2 -my-3">
                    <HeadlessDisclosureButton
                      class="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                      <span class="font-medium text-gray-900">{{ section.name }}</span>
                      <span class="flex items-center ms-6">
                        <i class="fa-solid fa-plus" aria-hidden="true" v-if="!open"></i>
                        <i class="fa-solid fa-minus" aria-hidden="true" v-else></i>
                      </span>
                    </HeadlessDisclosureButton>
                  </h3>
                  <HeadlessDisclosurePanel class="pt-6">
                    <div class="space-y-6">
                      <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex gap-3">
                        <div class="flex items-center h-5 shrink-0">
                          <div class="grid grid-cols-1 group size-4">
                            <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                              :value="option.value" type="checkbox"
                              class="col-start-1 row-start-1 bg-white border border-gray-300 rounded appearance-none checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                          </div>
                        </div>
                        <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="flex-1 min-w-0 text-gray-500">{{
                          option.label }}</label>
                      </div>
                    </div>
                  </HeadlessDisclosurePanel>
                </HeadlessDisclosure>
              </form>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>

    <main class="px-4 mx-auto max-w-9xl sm:px-6 lg:px-8">
      <div class="flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 capitalize">{{ $t('products.products') }}</h1>
        <button type="button" class="p-2 -m-2 text-gray-400 ms-4 hover:text-gray-500 sm:ms-6 lg:hidden"
          @click="mobileFiltersOpen = true">
          <span class="sr-only">Filters</span>
          <i class="fa-solid fa-filter" aria-hidden="true"></i>
        </button>
      </div>

      <section aria-labelledby="products-heading" class="pt-6 pb-12">
        <h2 id="products-heading" class="sr-only">{{ $t('products.products') }}</h2>
        <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[250px_1fr]">
          <!-- Filters -->
          <form class="hidden lg:block">
            <HeadlessDisclosure as="div" v-for="section in filters" :key="section.id"
              class="py-6 border-b border-gray-200" :defaultOpen="true" v-slot="{ open }">
              <h3 class="flow-root -my-3">
                <HeadlessDisclosureButton
                  class="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                  <span class="font-medium text-gray-900">{{ section.name }}</span>
                  <span class="flex items-center ms-6">
                    <i class="fa-solid fa-plus" aria-hidden="true" v-if="!open"></i>
                    <i class="fa-solid fa-minus" aria-hidden="true" v-else></i>
                  </span>
                </HeadlessDisclosureButton>
              </h3>
              <HeadlessDisclosurePanel class="pt-6">
                <div class="space-y-4">
                  <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex gap-3">
                    <div class="flex items-center h-5 shrink-0">
                      <div class="grid grid-cols-1 group size-4">
                        <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value"
                          type="checkbox" :checked="option.checked" v-model="selectedCategories"
                          class="col-start-1 row-start-1 bg-white border border-gray-300 rounded appearance-none checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                      </div>
                    </div>
                    <label :for="`filter-${section.id}-${optionIdx}`" class="text-sm text-gray-600">{{ option.label
                    }}</label>
                  </div>
                </div>
              </HeadlessDisclosurePanel>
            </HeadlessDisclosure>
          </form>

          <!-- Product grid -->
          <div>
            <!-- products component -->
            <products :selected-categories="selectedCategories" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()
const selectedCategories = ref([]);

const filterOptions = computed(() => [
  { value: '1', label: t('products.chairs') },
  { value: '2', label: t('products.bed_rooms') },
  { value: '3', label: t('products.sofa') },
  { value: '6', label: t('products.living_rooms') },
  { value: '8', label: t('products.dining_rooms') }
])

const filters = computed(() => [
  {
    id: 'categories',
    name: t('products.categories'),
    options: filterOptions.value.map(opt => ({
      ...opt,
      checked: selectedCategories.value.includes(opt.value)
    }))
  }
]);

const mobileFiltersOpen = ref(false)

useHead({
  titleTemplate: () => t('products.products'),
});
</script>