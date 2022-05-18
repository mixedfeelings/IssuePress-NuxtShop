<template>
  <NuxtLink class="block" v-if="product" :to="productPath">
    <div class="card-image-wrapper" >
      <div class="card-image-inner">
        <ProductImage
          :alt="product.handle"
          :height="height"
          :lazy="index > lazyLoadingThreshold"
          :sizes="sizes"
          :srcset="srcset"
          :width="width"
          class=""
        />
      </div>
    </div>

    <div v-if="artist" class="text-xs mt-3 font-mono" v-html="artist" />
    <ProductTitle
      tag="span"
      :title="product.title"
      class="font-serif"
    />
    <ProductPrice
      :priceRange="product.priceRange"
      :compareAtPriceRange="product.compareAtPriceRange"
      class="text-sm"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core";
import { getSrcset } from "~/utils/images";
import { storeToRefs } from "pinia";
import { useColorStore } from "~/stores/colors";


const props = defineProps<{
  product: ProductCard;
  index?: number;
}>();

const productPath = `/products/${props.product.handle}`;

const lazyLoadingThreshold = 7;
const src = props.product?.images?.edges[0]?.node?.url ?? "";
const width = props.product?.images?.edges[0]?.node?.width ?? "";
const height = props.product?.images?.edges[0]?.node?.height ?? "";
const sizes = ``;
const srcset = getSrcset(src);
const artist = props.product?.artist?.value ?? "";

</script>

<style scoped>


.card-image-wrapper {
   @apply relative block w-full mb-2 z-0 bg-white ;
   height: 0;
   padding-bottom: 75%;
}
.card-image-wrapper:after {
  @apply block;
  padding-top: 100%;
}
.card-image-wrapper .card-image-inner {
  @apply flex flex-1 absolute w-full h-full items-center justify-center;
}
.card-image-wrapper .card-image-inner img {
   height: auto;
   max-width: 85%;
   max-height: 85%;
   width: auto;
}

</style>