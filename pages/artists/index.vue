<template>
  <section>
    <Html>
      <Head>
        <Title>Artists | Issue Press</Title>
          <Meta name="description" content="Browse projects by Artist in the Issue Press catalog." />
          <Meta property="og:title" content="Artists | Issue Press" />
          <Meta property="og:site_name" content="Issue Press" />
          <Meta property="og:type" content="article" />
          <Meta property="og:url" content="https://issue.press/artists" />          
          <Meta property="og:image" content="/issue-press.png" />
          <Meta name="twitter:card" content="summary" />
          <Meta name="twitter:site" content="@issuepress" />         
      </Head>
    </Html>
    <div v-if="collectionList" class="pb-6">
      <CollectionHeader
        title="Artists"
        description=""
      />
        <ProductGrid class="gap-y-8">
          <NuxtLink 
            v-for="(collection, index) in filtered_collections" 
            :index="index"
            :key="collection.node.id"
            class="card w-1/2 md:w-1/3 lg:w-1/4 text-center" 
            :to="`/artists/${collection.node.handle}`"
          >
            <div class="card-image-wrapper" >
              <div class="card-image-inner">
                <img
                  alt="alt"
                  height="auto"
                  loading="lazy'"
                  width="auto"
                  :src="collection.node.products.edges[0].node.images?.edges[0]?.node?.url"
                />
              </div>
            </div>
            <div class="card-body">
              <h3 class="font-serif">{{collection.node.title}}</h3>
            </div>
          </NuxtLink>
        </ProductGrid>
    </div>
    <div v-if="error" >{{error}}</div>
  </section>
</template>

<script setup lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import { collections } from "~/apollo/queries/collections";
import { useColorStore } from "~/stores/colors";
import ProductGrid from "~/components/ProductGrid/ProductGrid.vue";

const colorStore = useColorStore();

const { result, error, fetchMore} = useQuery(collections, { numCollections: 100, cursor: null });
const collectionList = useResult(result, null, (data) => data.collections?.edges);
const filtered_collections = computed(() => collectionList.value.filter(item => item.node.artist));
const hasNextPage = computed(() => result.value.collections.pageInfo.hasNextPage )


onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});
</script>
