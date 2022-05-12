<template v-if="colorStore.globalColor" >
  <Header />
  <Cart />
  <main class="min-h-[75vh] ">
    <div
      v-if="
        config.SHOPIFY_STOREFRONT_ENDPOINT &&
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
      "
    >
      <NuxtPage />
    </div>
    <div v-else>
      <GettingStarted />
    </div>
  </main>
  <Footer />
</template>

<script lang="ts" setup>
import "~/assets/css/tailwind.css";
import { useShopStore } from "~/stores/shop";
import { useColorStore } from "~/stores/colors";
const colorStore = useColorStore();

useMeta({
  htmlAttrs: {
    lang: "en",
  },
});

// Global Store Actions
const { pending, error } = await useAsyncData("shop", () => {
  const shopStore = useShopStore();
  return shopStore.getShopGlobals();
});

const config = useRuntimeConfig();


onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});


</script>

<style >
body {
  @apply bg-natural;
}
header {@apply bg-white;}
a:hover {
  color: var(--global-color) !important;
}
a:hover svg {
  fill: var(--global-color);
}
</style>