<template>
  <section class="pb-8">
    <Html>
      <Head>
        <Title>Catalog | Issue Press</Title>
        <Meta name="description" content="Browse the complete catalog of projects published by Issue Press since 2011." />
        <Meta property="og:title" content="Catalog | Issue Press" />
        <Meta property="og:site_name" content="Issue Press" />
        <Meta property="og:type" content="article" />
        <Meta property="og:url" content="https://issue.press/catalog" />          
        <Meta property="og:image" content="/issue-press.png" />
        <Meta name="twitter:card" content="summary" />
        <Meta name="twitter:site" content="@issuepress" /> 
      </Head>
    </Html>
    <div class="collection-header text-center pb-0">
        <h1 class="">Catalog</h1>
        <div class="w-full flex justify-center sm:justify-between px-4">
            <div></div>
            <div class="catalog-toggle-buttons ">
                <button 
                    @click="setTable"
                    @keyup.enter="setTable"
                    :class="table_class"
                >
                    <TableIcon class="inline w-5" />
                </button>
                <button 
                    @click="setGrid"
                    @keyup.enter="setGrid"
                    :class="grid_class"
                >
                    <ViewGridIcon class="inline w-5" />
                </button>
            </div>
        </div>

    </div>
    <component 
        :is="currentView"
        collectionHandle="all"
        :numberProducts="12"
        catalog-item
        class="py-4"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import TableIcon from "@heroicons/vue/solid/TableIcon.js";
import ViewGridIcon from "@heroicons/vue/solid/ViewGridIcon.js";
import { useColorStore } from "~/stores/colors";

const currentView = ref("ProductTable");
const table_class = ref("");
const grid_class = ref("");
const colorStore = useColorStore();

function setGrid() {
    currentView.value = "FeaturedProducts";
    table_class.value = "";
    grid_class.value = "active"
}

function setTable() {
    currentView.value = "ProductTable";
    grid_class.value = "";
    table_class.value = "active";
}


onMounted(() => {
    colorStore.setGlobalColor();
    document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});

</script>

<style scoped>
    .catalog-toggle-buttons {
        @apply flex gap-1 justify-center pt-4;
    }
    .catalog-toggle-buttons button {
        @apply flex items-center justify-center w-8 h-8 border border-black;
    }
    .catalog-toggle-buttons button:hover {
        border-color: var(--global-color);
    }
    .catalog-toggle-buttons button.active {
        @apply bg-black;    
    }
    .catalog-toggle-buttons button.active svg {
        fill: #FFFFFF;
    }
    .catalog-toggle-buttons button.active:hover {
        @apply border-black
    }
</style>