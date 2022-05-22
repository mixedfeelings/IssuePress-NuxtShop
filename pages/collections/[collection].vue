<template>
  <section >
    <div v-if="collection?.products?.edges" >
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
      <ProductGrid>
        <ProductCard
          v-for="(product, index) in collection?.products?.edges"
          :index="index"
          :key="product.node.id"
          :product="product.node"
        />
      </ProductGrid>

    </div>
    <div v-else></div>
    <div v-if="error">Error</div>
  </section>
</template>

<script setup lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import { collectionByHandle } from "~/apollo/queries/collectionByHandle";
import { useColorStore } from "~/stores/colors";
import ProductDescriptionVue from "~~/components/ProductDescription/ProductDescription.vue";
const colorStore = useColorStore();

const route = useRoute();
const handle = route.params.collection;

const { result, error, fetchMore } = useQuery(
  collectionByHandle, 
  {
    handle,
    numProducts: 12,
    cursor: null,
  }, 
)

const collection: any = useResult(result, null, (data) => data.collectionByHandle);

function loadMore () {
  fetchMore({
    variables: {
      cursor: result.value.collectionByHandle.products?.pageInfo.endCursor,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const newEdges = fetchMoreResult.collectionByHandle.products.edges
      const pageInfo = fetchMoreResult.collectionByHandle.products.pageInfo

      return newEdges.length ? {
        ...previousResult,
        collectionByHandle: {   
          ...previousResult.collectionByHandle,       
          products: {
            ...previousResult.collectionByHandle.products,
            // Concat edges
            edges: [
              ...previousResult.collectionByHandle.products.edges,
              ...newEdges
            ],
            // Override with new pageInfo
            pageInfo,
          }
        }
      } : previousResult

    },
  });
};

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});
</script>
