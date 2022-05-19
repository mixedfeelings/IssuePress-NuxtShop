<template :key="handle">
<div class="bg-natural">
  <div v-if="product">
      <Html>
        <Head v-if="product?.title && product?.description">
          <Title>{{ product.title }} | Issue Press</Title>
          <Meta name="description" :content="product.description" />
        </Head>
      </Html>

    <carousel v-if="show_images" :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
      <slide v-for="(image, index) in images" key="index">
        <div class="carousel__item">
          <img 
            :src="image.node.url" 
            @click="onImageClick(index)"
            class="cursor-pointer"
          />
        </div>       
      </slide>
      <template #addons>
        <navigation v-if="has_more_than_one_image"/>
        <pagination v-if="has_more_than_one_image"/>
      </template>
    </carousel>
    <section class="py-6 md:py-8 px-6 bg-natural">
      <div class="container mx-auto">
      <div v-if="sku" v-text="sku" class="pb-2" />
      <ProductTitle
        tag="h1"
        :title="product.title"
        variant="product"
        class="text-2xl md:text-3xl lg:text-4xl font-serif tracking-wide mb-2"
      />
      <div v-if="artist" class="artist text-base md:text-lg my-1 font-mono">
        by <a :href="`/artists/${formatText(artist)}`">{{artist}}</a>
      </div>

      <div class="flex items-center gap-6 flex-wrap pt-4">
        <ProductPrice
          :priceRange="product.priceRange"
          :compareAtPriceRange="product.compareAtPriceRange"
        />
        <ProductVariants  label="Select option" :variants="variants" :default-variant="default_variant" />
        <ProductAddToCart />
      </div>

      <div class="text-base md:text-2xl pt-6">
        <ProductDescription :description="product.descriptionHtml" class="leading-relaxed" />
        <div class="metadata pt-2 font-mono whitespace-pre-wrap ">
          <div v-if="year" v-text="year" />
          <div v-if="metadata" v-text="metadata" />
        </div>
      </div>

      </div>

    </section>
  </div>  
  <div v-else></div>
  <div v-if="error">Error</div>
      <div v-if="show_modal" class="modal flex flex-col bg-white z-20 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center h-screen w-screen overlflow-hidden bg-fixed">      
        <button
          class="flex items-center justify-center z-20 absolute top-4 right-4"
          aria-label="close"
          @click="toggleModal()"
          @keyup.enter="toggleModal()"
        >
        <CloseIcon class="close-icon w-6" aria-hidden />
      </button>
      <carousel v-if="show_images" ref="myCarousel" :wrap-around="true">
        <slide v-for="(image, index) in images" key="index">
          <div class="p-6" >
            <img 
              :src="image.node.url" 
              style="max-height: 90vh"
            />
          </div>       
        </slide>
        <template #addons>
          <navigation v-if="has_more_than_one_image"/>
        </template>
      </carousel>

    </div>
</div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import CloseIcon from "@heroicons/vue/solid/XIcon.js";
import { useQuery, useResult } from "@vue/apollo-composable";
import { breakpointsTailwind } from "@vueuse/core";
import { getSrcset } from "~/utils/images";
import { productByHandle } from "~/apollo/queries/productByHandle";
import { productVariantsByHandle } from "~/apollo/queries/productVariantsByHandle";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { useColorStore } from "~/stores/colors";
import { slugify } from "~/utils/strings";

function formatText(text: string) {
  return slugify(text);
}


const myCarousel = ref(null);
const show_modal = ref(false);


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


function onImageClick(i: number) {
  this.toggleModal();
  nextTick(() => {
    this.myCarousel.slideTo(i);
  });
};

function toggleModal() {
  this.show_modal = !this.show_modal;
}

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
  @apply relative pb-4  ;
}

.carousel__item {
  @apply flex items-center justify-center px-4 py-8 bg-white w-full h-full ;
  min-height: 200px;
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

button.carousel__pagination-button {
  opacity: .4;
}

button.carousel__pagination-button.carousel__pagination-button--active {
  @apply opacity-100;
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

.close-icon:hover {
  fill: var(--global-color); 
}

/* .fullWidthImage {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
} */
</style>