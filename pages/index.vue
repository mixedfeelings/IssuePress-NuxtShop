<template>
  <section class="py-8">
    <Html>
      <Head>
        <Title>Issue Press</Title>
        <Meta name="description" :content="description" />
      </Head>
    </Html>


    <!-- <template>
  <ColorScheme placeholder="..." tag="span">
    Color mode: <b>{{ $colorMode.preference }}</b>
    <span v-if="$colorMode.preference === 'system'">(<i>{{ $colorMode.value }}</i> mode detected)</span>
  </ColorScheme>
</template> -->

    <FeaturedProducts
      collectionHandle="in-stock"
      :numberProducts="12"
    />

  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useShopStore } from "~/stores/shop";
import { useColorStore } from "~/stores/colors";

const colorStore = useColorStore();
const colorMode = useColorMode()

const shopStore = useShopStore();
const { description } = storeToRefs(shopStore);

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});

</script>
