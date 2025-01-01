<template>
  <div>
    <li>
      <nuxt-link :to="item.route"
        class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out"
        @click.prevent="handleItemClick" :class="{
          'bg-black': sidebarStore.page === item.label
        }">
        <icon :name="item.icon" />
        {{ item.label }}
        <icon name="ic:baseline-keyboard-arrow-down"
          class="absolute w-5 h-5 -translate-y-1/2 fill-current end-4 top-1/2"
          :class="{ 'rotate-180': sidebarStore.page === item.label }" v-if="item.children" />
      </nuxt-link>

      <!-- Dropdown Menu Start -->
      <div class="overflow-hidden transform translate" v-show="sidebarStore.page === item.label">
        <sidebar-dropdown v-if="item.children" :items="item.children" :currentPage="currentPage" :page="item.label" />
        <!-- Dropdown Menu End -->
      </div>
    </li>
  </div>
</template>

<script setup>
const sidebarStore = useSidebarStore();

const props = defineProps(['item', 'index']);
const currentPage = useRoute().name;

const handleItemClick = () => {
  const pageName = sidebarStore.page === props.item.label ? '' : props.item.label;
  sidebarStore.page = pageName;

  if (props.item.children) {
    return props.item.children.some(child => sidebarStore.selected === child.label);
  }
};
</script>