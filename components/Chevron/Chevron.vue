<template>
  <button
    class="chevron-button flex items-center justify-center h-8 w-8 rounded-lg bg-gray-100"
    aria-label="Menu"
    @click="handleClick"
    @keyup.enter="handleClick"
  >
    <DownIcon v-if="!menuOpen" class="w-6 h-6" aria-hidden />
    <UpIcon v-else class="w-6 h-6" aria-hidden />
  </button>
</template>

<script setup lang="ts">
import UpIcon from "@heroicons/vue/solid/esm/ChevronUpIcon.js";
import DownIcon from "@heroicons/vue/solid/esm/ChevronDownIcon.js";
import { useShopStore } from "~/stores/shop";

const shopStore = useShopStore();
const menuOpen = computed(() => shopStore.printMenuOpen);


function handleClick() {
  shopStore.togglePrintMenu();
  shopStore.printMenu;
}

</script>
