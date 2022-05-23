<template>
  <table v-if="collection">
    <thead class="desktop-only">
        <tr>
            <th class="number">#</th>
            <th class="image"></th>
            <th class="title">Title</th>
            <th class="artist">Artist</th>
            <th class="year">Year</th>
        </tr>
    </thead>
    <tbody >
        <tr v-for="(product, index) in collection?.products.edges"
            :index="index"
            :key="product.node.id"
        >            
            <td class="number desktop-only">{{product.node.variants?.edges[0]?.node?.sku}}</td>
            <td class="image">
                <NuxtLink :to="`/products/${product.node.handle}`" class="table-image">
                    <img loading="lazy" :src="product.node.images?.edges[0]?.node?.url"/>
                </NuxtLink>
            </td>
            <td class="title">
                <div class="number mobile-only">{{product.node.variants?.edges[0]?.node?.sku}}</div>
                <NuxtLink :to="`/products/${product.node.handle}`"><h3>{{product.node.title}}</h3></NuxtLink>
                <div class="artist mobile-only">{{product.node.artist?.value}}<span v-if="product.node.date?.value">, {{formateYear(product.node.date?.value)}}</span></div>
            </td>
            <td class="artist desktop-only"><NuxtLink v-if="product.node.artist?.value" :to="`/artists/${formatArtist(product.node.artist?.value)}`">{{product.node.artist?.value}}</NuxtLink></td>
            <td class="year desktop-only">{{product.node.date?.value ? formateYear(product.node.date?.value) : ""}}</td>   
        </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

    import { useQuery, useResult } from "@vue/apollo-composable";
    import { collectionByHandle } from "~~/apollo/queries/collectionByHandle";
    import { slugify } from "~/utils/strings";

    const props = defineProps<{
        collectionHandle: string;
    }>();
    
    const handle = props.collectionHandle;
    const { result, error, fetchMore } = useQuery(collectionByHandle, { handle, numProducts: 100 });
    const collection = useResult(result, null, (data) => data.collectionByHandle);
    
    function formateYear(date: string)  {
        const newDate = new Date(date);
        return newDate.getUTCFullYear();
    };

    function formatArtist(text: string) {
        return slugify(text);
    }

</script>