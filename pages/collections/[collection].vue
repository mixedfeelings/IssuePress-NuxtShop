<template>
  <section >
    <div v-if="collection?.products?.edges" >
      <Html>
        <Head>
          <Title>{{ `${collection?.title} | Issue Press` ?? "Issue Press" }}</Title>
          <Meta name="description" :content="`Browse projects from the ${collection?.title} collection in the Issue Press catalog.`" />
          <Meta property="og:title" :content=" `${collection?.title} | Issue Press`" />
          <Meta property="og:site_name" content="Issue Press" />
          <Meta property="og:type" content="article" />
          <Meta property="og:url" :content="`https://issue.press${route.path}`" />          
          <Meta property="og:image" content="/issue-press.png" />
          <Meta name="twitter:card" content="summary" />
          <Meta name="twitter:site" content="@issuepress" /> 
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
          class="w-1/2 md:w-1/3 lg:w-1/4"
        />
        <InfiniteLoading v-if="hasNextPage" :firstLoad="false" :identifier="collection?.products?.edges" @infinite="loadMore" >
          <template #spinner>
            <div class="loading-container">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </template>
        </InfiniteLoading>
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
import InfiniteLoading from "v3-infinite-loading";

const colorStore = useColorStore();
const route = useRoute();
const handle = route.params.collection;

const { result, error, fetchMore } = useQuery(collectionByHandle, { handle, numProducts: 12, cursor: null });
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

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});
</script>
