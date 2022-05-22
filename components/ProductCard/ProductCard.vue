<template>
  <NuxtLink class="card w-1/2 md:w-1/3 lg:w-1/4" :to="productPath">
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
      <div class="card-body">
        <div v-if="artist" class="text-xs mt-3 font-mono" v-html="artist" />
        <ProductTitle
          tag="span"
          :title="product.title"
          class="font-serif"
        />
        <ProductPrice
          :priceRange="product.priceRange"
          :compareAtPriceRange="product.compareAtPriceRange"
          class="text-sm justify-center"
        />
      </div>

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
  hideArtist?: boolean;
}>();

const productPath = `/products/${props.product.handle}`;

const lazyLoadingThreshold = 7;
const src = props.product?.images?.edges[0]?.node?.url ?? "";
const width = props.product?.images?.edges[0]?.node?.width ?? "";
const height = props.product?.images?.edges[0]?.node?.height ?? "";
const sizes = ``;
const srcset = getSrcset(src);
const artist = computed(() => {
  if (!props.hideArtist) {
    return props.product?.artist?.value ?? "";
  }
});

</script>
