<template v-if="colorStore.globalColor" >
  <Header />
  <Cart />
  <main class="min-h-[75vh]">
    <div
      v-if="
        config.SHOPIFY_STOREFRONT_ENDPOINT &&
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
      "
    >
      <NuxtPage />
    </div>

  </main>
  <!-- <Footer /> -->
</template>

<script lang="ts" setup>
import "~/assets/css/tailwind.css";
import { useShopStore } from "~/stores/shop";

useMeta({
  colorMode: 'auto',
  htmlAttrs: {
    lang: "en",
  },  
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=UA-22429627-1', 
      async: true,
      type: 'text/javascript'
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'UA-22429627-1');
      `,
      type: 'text/javascript'
    }
  ]
});

 definePageMeta({
   
})

// Global Store Actions
const { pending, error } = await useAsyncData("shop", () => {
  const shopStore = useShopStore();
  return shopStore.getShopGlobals();
});

const config = useRuntimeConfig();


</script>
