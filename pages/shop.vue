<template>
  <div class="py-8">
    <Html>
      <Head>
        <Title>Shop | Issue Press</Title>
        <Meta name="description" content="Shop the collection at Issue Press" />
        <Meta property="og:title" content="Shop | Issue Press" />
        <Meta property="og:site_name" content="Issue Press" />
        <Meta property="og:type" content="website" />
        <Meta property="og:url" content="https://issue.press/shop" />          
        <Meta property="og:image" content="/issue-press.png" />
        <Meta name="twitter:card" content="summary" />
        <Meta name="twitter:site" content="@issuepress" /> 
      </Head>
    </Html>
    <div class="text-center">
        <h1 class="font-serif text-3xl ">Shop</h1>
    </div>
    <div class="py-6">
      <FeaturedCollection
          collectionHandle="publications"
          :numberProducts="8"
          title="Publications"
      />
      <FeaturedCollection
          collectionHandle="prints"
          :numberProducts="8"
          title="Prints"
      />
      <FeaturedCollection
          collectionHandle="multiples"
          :numberProducts="8"
          title="Multiples"
      />
    </div>
  </div>
</template>

<script setup>
import { useColorStore } from "~/stores/colors";

const colorStore = useColorStore();

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
  document.documentElement.style.setProperty('--global-text-color',`var(--color-${colorStore.globalTextColor})`);

});

</script>
