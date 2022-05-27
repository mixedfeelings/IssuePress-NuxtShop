<template>
    <div v-if="collection" class="collection-slider py-4">
        <div v-if="title" class="py-4 flex items-start w-full justify-between md:justify-center ">
            <button @click="myCarousel.prev();" type="button" class="carousel-prev" aria-label="Navigate to previous slide">
                <ChevronLeftIcon class="w-6" />
            </button>
            <NuxtLink class="text-center mx-6" :to="`/collections/${title}`">
                <div class="py-2 font-serif text-xl">{{ title }}</div>
                <div class="text-xs">See All</div>
            </NuxtLink>
            <button @click="myCarousel.next();" type="button" class="carousel-next" aria-label="Navigate to next slide">
                <ChevronRightIcon class="w-6" />
            </button>            
        </div>
        <Carousel ref="myCarousel" :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
            <Slide 
                v-for="(product, index) in collection.products.edges"
                :index="index"
                :key="product.node.id"
                class="items-start w-1/2 md:w-1/5 lg:w-1/5 "
            >
                <ProductCard
                    :product="product.node"
                    class="w-full"
                />     
            </Slide>
            <template #addons="{ slidesCount }">
                <Pagination v-if="slidesCount > 1" />
            </template>
        </Carousel>
    </div>
    <div v-else-if="error">Error loading featured products</div>
    <div v-else></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChevronRightIcon from "@heroicons/vue/solid/esm/ChevronRightIcon.js";
import ChevronLeftIcon from "@heroicons/vue/solid/esm/ChevronLeftIcon.js";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { useQuery, useResult } from "@vue/apollo-composable";
import { collectionByHandle } from "~~/apollo/queries/collectionByHandle";

const myCarousel = ref(null);

const props = defineProps<{
  collectionHandle: string;
  numberProducts?: number;
  title?: string;
}>();

const settings = ref({
    itemsToShow: 2,
});

const breakpoints = ref( {
  700: {
    itemsToShow: 3,
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
  }
});

const handle = props.collectionHandle;
const numProducts = props.numberProducts || 4;

const { result, error } = useQuery(collectionByHandle, { handle, numProducts: numProducts, cursor: null });
const collection = useResult(result, null, (data) => data.collectionByHandle);

</script>
