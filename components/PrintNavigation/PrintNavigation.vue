<template>
    <aside 
        class="hidden w-full md:w-1/4 absolute md:relative md:block md:pt-6 font-sans text-base md:text-lg md:text-xl shadow-lg md:shadow-none md:border-r-2"
        :class="{ isOpen: menuOpen }"
        ref="menu"
    >
        <NuxtLink
            v-for="link in printNavLinks"
            :key="link.label"
            :to="link.path"
            class="block p-4 text-sm font-medium tracking-wide border-b-[1px] lg:px-6 lg:py-2 md:border-b-0 "
        >
            {{ link.label }}
        </NuxtLink>
    </aside>
</template>

<script setup>
    import { printNavLinks } from "~/constants";
    import { useShopStore } from "~/stores/shop";
    import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

    const shopStore = useShopStore();
    const menuOpen = computed(() => shopStore.printMenuOpen);

    const route = useRoute();
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobileUI = breakpoints.smaller("md");
    const menu = ref(null);

    watch(route, () => (isMobileUI ? shopStore.togglePrintMenu(false) : null));
</script>

<style lang="postcss">

.router-link-active {
    color: var(--global-color);
}

.isOpen {
  display: block !important;
}

.light nav {
  @apply bg-white;
}
</style>
