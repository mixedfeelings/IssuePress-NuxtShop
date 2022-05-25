<template>
  <table v-if="collection">
    <thead class="desktop-only">
        <tr>
            <th class="number">#</th>
            <th class="image"></th>
            <th class="title">Title</th>
            <th class="artist">Artist</th>
            <th class="project-type">Type</th>
            <th class="year">Year</th>
        </tr>
    </thead>
    <tbody >
        <tr v-for="(product, index) in collection?.products.edges"
            :index="index"
            :key="product.node.id"
            @click="onRowClick(product.node.handle)"
        >            
            <td class="number desktop-only">{{product.node.variants?.edges[0]?.node?.sku}}</td>
            <td class="image">
                <div class="table-image">
                    <ProductImage
                        :alt="product.handle"
                        :height="64"
                        :lazy="index > lazyLoadingThreshold"
                        :sizes="sizes"
                        :srcset="setSrc(`${product.node.images?.edges[0]?.node?.url || ''}`)"
                        :width="64"
                        class=""
                    />
                </div>
            </td>
            <td class="title">
                <div class="number mobile-only">{{product.node.variants?.edges[0]?.node?.sku}}</div>
                <h3>{{product.node.title}}</h3>
                <div class="artist mobile-only">
                    {{product.node.artist?.value}}<span v-if="product.node.artist2?.value">, {{product.node.artist2?.value}}</span>
                </div>
                <div class="project-type mobile-only">
                    {{product.node.productType}}<span v-if="product.node.date?.value">, {{formateYear(product.node.date?.value)}}</span>
                </div>

            </td>
            <td class="artist desktop-only">
                {{product.node.artist?.value}}<span v-if="product.node.artist2?.value">,{{product.node.artist2?.value}}</span>
            </td>
            <td class="project-type desktop-only">
                {{product.node.productType}}
            </td>
            <td class="year desktop-only">{{product.node.date?.value ? formateYear(product.node.date?.value) : ""}}</td>   
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th colspan="6">
                <InfiniteLoading v-if="hasNextPage" :firstLoad="false" :identifier="collection?.products?.edges" @infinite="loadMore" >
                <template #spinner>
                    <div class="loading-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    </div>
                </template>
                </InfiniteLoading>
            </th>
        </tr>
    </tfoot>
  </table>
</template>

<script setup lang="ts">

    import { useRouter } from "vue-router";
    import { useQuery, useResult } from "@vue/apollo-composable";
    import { collectionByHandle } from "~~/apollo/queries/collectionByHandle";
    import { slugify } from "~/utils/strings";
    import { getSrcset } from "~/utils/images";
    import InfiniteLoading from "v3-infinite-loading";


    const props = defineProps<{
        collectionHandle: string;
        numberProducts?: number;

    }>();
    
    const handle = props.collectionHandle;
    const numProducts = props.numberProducts || 12;

    const lazyLoadingThreshold = 7;
    const width = "widt";
    const height = "64";
    const sizes = ``;

    function setSrc(src) {
        return getSrcset(src);
    } 

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

    const router = useRouter();
    
    function onRowClick(path){
       router.push({ path: `/products/${path}` })
    }

    function formateYear(date: string)  {
        const newDate = new Date(date);
        return newDate.getUTCFullYear();
    };

    function formatArtist(text: string) {
        return slugify(text);
    }

</script>