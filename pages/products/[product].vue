<template :key="handle">
<div >
  <div v-if="product" class="flex flex-col my-8" >
    <section class="container mx-auto">
      <Html>
        <Head v-if="product?.title && product?.description">
          <Title>{{ product.title }}</Title>
          <Meta name="description" :content="product.description" />
        </Head>
      </Html>
      <div class="flex flex-col md:flex-row ">
        <div class="w-full md:w-1/2">
          <div class="card-image-wrapper thumbnail ">
            <div class="card-image-inner px-8">
              <ProductImage
                :alt="product.handle"
                :sizes="sizes"
                :srcset="srcset"
                width="auto"
                height="auto"
                class=""
              />
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 p-8 h-auto flex flex-col ">
          <div>
            <ProductTitle
              tag="h1"
              :title="product.title"
              variant="product"
              class="text-2xl md:text-3xl lg:text-4xl font-serif tracking-wide mb-2"
            />
            <div v-if="artist" class="text-base md:text-lg my-1 font-mono">
              by {{artist}}
            </div>
            <ProductPrice
              :priceRange="product.priceRange"
              :compareAtPriceRange="product.compareAtPriceRange"
              class="mt-4 "
            />
          </div>
          <div class="pt-8">
            <ProductVariants  label="Select option" :variants="variants" :default-variant="default_variant" />
            <ProductAddToCart />
          </div>

        </div>
      </div>
    </section>

    <carousel v-if="images.length > 1" :items-to-show="2.5" :wrap-around="true">
      <slide v-for="(image, index) in images" key="index">
        <div class="carousel__item">
          <img :src="image.node.url" />
        </div>       
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>

    <section class="container mx-auto px-8">
      <div v-if="product" >
        <ProductDescription :description="product.descriptionHtml" class="py-6 text-2xl" />
      </div>
    </section>
  </div>    
  <div v-else></div>
  <div v-if="error">Error</div>
</div>
</template>

<script setup lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import { breakpointsTailwind } from "@vueuse/core";
import { getSrcset } from "~/utils/images";
import { productByHandle } from "~/apollo/queries/productByHandle";
import { productVariantsByHandle } from "~/apollo/queries/productVariantsByHandle";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';


const route = useRoute();
const handle = route.params.product;

// Get product data
let variants = ref(null);
const { result, error } = useQuery(productByHandle, { handle });
const product: any = useResult(result, null, (data) => data.productByHandle);
const initialVariants = useResult(
  result,
  [],
  (data) => data.productByHandle.variants.edges
);
variants.value = initialVariants;

const artist = computed(() => product.value.artist?.value ?? "");

// Product Image
const src = computed(() => product.value.images?.edges[0]?.node?.url ?? "");
const sizes = `(max-width: ${breakpointsTailwind.md}px) 95vw, 40vw`;
const srcset = computed(() => getSrcset(src.value || ""));

const show_images = computed(() => (product.value.images?.edges.length > 1 ));
const images = computed(() => product.value.images?.edges.slice(1));

const default_variant = computed(() => {
  if (product.value.variants?.edges.length > 1 ) {
    return "";
  } else {
    return product.value?.variants?.edges[0]?.node?.id;
  }
});


// Fetch fresh inventory on client
onMounted(() => {
  const { result: clientResult, onResult } = useQuery(
    productVariantsByHandle,
    { handle },
    { fetchPolicy: "network-only" }
  );
  const clientVariants = useResult(
    clientResult,
    [],
    (data) => data.productByHandle.variants.edges
  );
  variants.value = clientVariants;

});
</script>

<style >
.card-image-wrapper {
   @apply relative block w-full z-0 bg-white ;
   height: 0;
   padding-bottom: 100%;
}
.card-image-wrapper.thumbnail {
  padding-bottom: 100%;
}
.card-image-wrapper .card-image-inner {
  @apply flex flex-1 absolute w-full h-full items-center justify-center;
}

.card-image-wrapper .card-image-inner img {
   height: auto;
   max-width:90%;
   max-height: 90%;
   width: auto;
}

.carousel {
  @apply relative bg-white pt-8 pb-4 my-6 ;
}

.carousel__item {
  @apply flex items-center;
  min-height: 200px;
  width: 100%;
  height: auto;

}

.carousel__item img {
  @apply object-contain h-full w-auto;
  max-height: 400px;
  box-sizing: content-box;

}

button.carousel__next,
button.carousel__prev,
button.carousel__pagination-button {
  background-color: var(--global-color);
}

button.carousel__next,
button.carousel__prev {
  @apply border border-white border-4 opacity-75;
}

button.carousel__next:hover,
button.carousel__prev:hover {
  @apply opacity-100;
}

button.carousel__next {
  right: 5%;
}

button.carousel__prev {
  left: 5%;
}

button.carousel__pagination-button {
  background-color: var(--global-color);
}
</style>