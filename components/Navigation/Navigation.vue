<template>
  <nav
    class="absolute left-0 right-0 bg-white hidden border-b-2 border-black top-12 md:static md:flex md:items-center md:justify-center md:border-b-0 md:mt-1"
    :class="{ isOpen: menuOpen }"
    ref="menu"
  >
    <NuxtLink
      v-for="link in navLinks"
      :key="link.label"
      :to="link.path"
      class="block py-4 px-4 text-sm font-medium tracking-wide border-b-[1px] md:flex md:py-0 sm:px-2 lg:px-6 md:border-b-0 "
    >
      {{ link.label }}
    </NuxtLink>
    <SocialMedia class="mobile-only py-4 px-4 text-sm font-medium tracking-wide " />

  </nav>
</template>

<script setup>
import { navLinks } from "~/constants";
import { useShopStore } from "~/stores/shop";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const shopStore = useShopStore();
const menuOpen = computed(() => shopStore.menuOpen);

const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobileUI = breakpoints.smaller("md");
const menu = ref(null);

watch(route, () => (isMobileUI ? shopStore.toggleMenu(false) : null));
</script>

<style lang="postcss">
.isOpen {
  display: block !important;
}

.light nav {
  @apply bg-white;
}


</style>
