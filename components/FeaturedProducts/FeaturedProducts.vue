<template>
  <div v-if="collection">
      <div v-if="title" class="col-span-2 font-bold md:col-span-3 py-6 text-center font-serif">
        {{ title }}
      </div>
    <ProductGrid>
      <ProductCard
        v-for="(product, index) in collection.products.edges"
        :index="index"
        :key="product.node.id"
        :product="product.node"
      />
    </ProductGrid>
    <InfiniteLoading v-if="hasNextPage" :firstLoad="false" :identifier="collection?.products?.edges" @infinite="loadMore" >
      <template #spinner>
        <div class="loading-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </template>
    </InfiniteLoading>
  </div>
  <div v-else-if="error">Error loading featured products</div>
  <div v-else></div>
</template>

<script setup lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import { collectionByHandle } from "~~/apollo/queries/collectionByHandle";
import InfiniteLoading from "v3-infinite-loading";

const props = defineProps<{
  collectionHandle: string;
  numberProducts?: number;
  title?: string;
}>();

const handle = props.collectionHandle;
const numProducts = props.numberProducts || 4;

const { result, error, fetchMore } = useQuery(collectionByHandle, { handle, numProducts: numProducts, cursor: null });
const collection = useResult(result, null, (data) => data.collectionByHandle);
const hasNextPage = computed(() => result.value.collectionByHandle.products?.pageInfo.hasNextPage )

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

</script>
