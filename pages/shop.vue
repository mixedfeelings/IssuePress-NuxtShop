<template>
  <div class="py-8">
    <Html>
      <Head>
        <Title>Shop | Issue Press</Title>
        <Meta name="description" content="Shop the collection at Issue Press" />
      </Head>
    </Html>
    <div class="text-center">
        <h1 class="font-serif text-3xl ">Shop</h1>
    </div>
    <div class="py-6">
      <FeaturedCollection
          collectionHandle="publications"
          :numberProducts="8"
          title="Publications"
      />
      <FeaturedCollection
          collectionHandle="prints"
          :numberProducts="8"
          title="Prints"
      />
      <FeaturedCollection
          collectionHandle="multiples"
          :numberProducts="8"
          title="Multiples"
      />
    </div>
  </div>
</template>

<script setup>
import { useColorStore } from "~/stores/colors";

const colorStore = useColorStore();

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});

</script>
