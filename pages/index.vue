<template>
  <section class="py-8">
    <Html>
      <Head>
        <Title>Issue Press</Title>
        <Meta name="description" :content="description" />
      </Head>
    </Html>
    <FeaturedProducts
      collectionHandle="in-stock"
      :numberProducts="12"
    />
  </section>
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
