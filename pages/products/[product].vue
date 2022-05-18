<template :key="handle">
<div >
  <div v-if="product">
    <section >
      <Html>
        <Head v-if="product?.title && product?.description">
          <Title>{{ product.title }} | Issue Press</Title>
          <Meta name="description" :content="product.description" />
        </Head>
      </Html>

    <carousel v-if="show_images" :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
      <slide v-for="(image, index) in images" key="index">
        <div class="carousel__item">
          <img :src="image.node.url" />
        </div>       
      </slide>
      <template #addons>
        <navigation v-if="has_more_than_one_image"/>
        <pagination v-if="has_more_than_one_image"/>
      </template>
    </carousel>
    <section class="flex flex-col md:flex-row container mx-auto py-7 md:py-12 px-3">
        <div class="w-full">
          <ProductTitle
            tag="h1"
            :title="product.title"
            variant="product"
            class="text-2xl md:text-3xl lg:text-4xl font-serif tracking-wide mb-2"
          />
          <div v-if="artist" class="artist text-base md:text-lg my-1 font-mono">
            by <span v-html="artist" />
          </div>

          <div class="py-6">
              <ProductPrice
                :priceRange="product.priceRange"
                :compareAtPriceRange="product.compareAtPriceRange"
              />

            <div class="flex items-center gap-6 flex-wrap pt-4">

              <ProductVariants  label="Select option" :variants="variants" :default-variant="default_variant" />
              <ProductAddToCart />
            </div>

          </div>


          <ProductDescription :description="product.descriptionHtml" class="text-base md:text-2xl py-4" />
          <div class="metadata text-sm md:text-lg py-6 font-mono whitespace-pre-wrap leading-loose">
            <div v-if="year" v-text="year" />
            <div v-if="metadata" v-text="metadata" />
            <div v-if="sku" v-text="sku" />
          </div>
        </div>
    </section>
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
import { useColorStore } from "~/stores/colors";

const settings = ref({
    itemsToShow: 1,
});

const breakpoints = ref( {
  700: {
    itemsToShow: 1.5,
  },
  // 1024 and up
  1024: {
    itemsToShow: 2.5,
  }
});

const colorStore = useColorStore();
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
const sku = computed(() => product.value?.variants?.edges[0]?.node?.sku ?? "");

const year = computed(() =>  {
  if (product.value.date?.value) {
    const date = new Date(`${product.value.date?.value}`);
    return date.getUTCFullYear();
  } 
});
const metadata = computed(() => product.value.metadata?.value ?? "");


// Product Image
const src = computed(() => product.value.images?.edges[0]?.node?.url ?? "");
const sizes = `(max-width: ${breakpointsTailwind.md}px) 95vw, 40vw`;
const srcset = computed(() => getSrcset(src.value || ""));

const show_images = computed(() => (product.value.images?.edges.length > 1 ));
const has_more_than_one_image = computed(() => (product.value.images?.edges.length > 2 ));
const images = computed(() => product.value.images?.edges);

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

  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);

});
</script>

<style >

.container {
  max-width: 1000px !important;
}

p a,
.artist a {
  @apply underline;
}
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

.metadata {
  white-space: pre-wrap;
}

.carousel {
  @apply relative bg-white pt-8 pb-4 ;
}

.carousel__item {
  @apply flex items-center justify-center p-6;
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