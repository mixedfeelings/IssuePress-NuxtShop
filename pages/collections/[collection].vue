<template>
  <section class="container mx-auto"  v-if="collection">
      <Html>
        <Head>
          <Title>{{ `${collection?.title} | Issue Press` ?? "Issue Press" }}</Title>
          <Meta name="description" :content="collection?.description ?? ''" />
        </Head>
      </Html>

      <CollectionHeader
        :title="collection?.title ?? ''"
        :description="collection?.descriptionHtml ?? ''"
      />
      <ProductGrid v-if="collection?.products?.edges">
        <ProductCard
          v-for="(product, index) in collection?.products?.edges"
          :index="index"
          :key="product.node.id"
          :product="product.node"
        />
      </ProductGrid>
    <div v-if="error">Error</div>
  </section>
</template>

<script setup lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import { collectionByHandle } from "~/apollo/queries/collectionByHandle";
import { useColorStore } from "~/stores/colors";
const colorStore = useColorStore();

const route = useRoute();
const handle = route.params.collection;

const { result, error } = useQuery(collectionByHandle, {
  handle,
  numProducts: 48,
});
const collection = useResult(result, null, (data) => data.collectionByHandle);

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});
</script>
