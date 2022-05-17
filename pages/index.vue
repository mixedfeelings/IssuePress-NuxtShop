<template>
  <div class="container mx-auto">
    <Html>
      <Head>
        <Title>NuxtShop</Title>
        <Meta name="description" :content="description" />
      </Head>
    </Html>

    <FeaturedProducts
      collectionHandle="cc"
      :numberProducts="4"
      title="Featured Products"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useShopStore } from "~/stores/shop";
import { useColorStore } from "~/stores/colors";

const colorStore = useColorStore();

const shopStore = useShopStore();
const { description } = storeToRefs(shopStore);

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});

</script>
