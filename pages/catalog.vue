<template>
  <section class="pb-8">
    <Html>
      <Head>
        <Title>Catalog | Issue Press</Title>
        <Meta name="description" content="description" />
      </Head>
    </Html>
    <div class="collection-header text-center pb-0">
        <h1 class="">Catalog</h1>
        <div class="buttons flex gap-1 justify-center pt-4 ">
            <button 
                class="flex items-center justify-center w-8 h-8 border border-black"
                @click="setTable"
                @keyup.enter="setTable"
            >
                <TableIcon
                    class="inline w-5"
                />
            </button>
            <button 
                class="flex items-center justify-center w-8 h-8 border border-black"
                @click="setGrid"
                @keyup.enter="setGrid"
            >
                <ViewGridIcon
                    class="inline w-5"
                    />
            </button>
        </div>
    </div>
    <component 
        :is="currentView"
        collectionHandle="all"
        :numberProducts="12"
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
const colorStore = useColorStore();

function setGrid() {
    currentView.value = "FeaturedProducts";
}

function setTable() {
    currentView.value = "ProductTable";
}

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});

</script>

<style>
    button.active {
        @apply bg-black;    
    }
    button.active svg {
        fill: #FFFF;
    }
    button:hover {
        border-color: var(--global-color);
    }
</style>