<template>
    <section>
        <Html>
            <Head>
                <Title>Printing | Issue Press</Title>
            </Head>
        </Html>
        <div class="pt-6 px-6 font-sans text-base md:text-lg lg:text-xl md:leading-10 md:border-b-2">
            <h1 class="text-3xl font-serif text-center mb-6 pb-2">Printing</h1>
        </div>
        <div class="print-docs flex flex-col md:flex-row ">
            <aside class="w-full md:w-1/4 desktop-only px-6 py-8 sticky border-x-2">
                <ul>
                    <li class="text-xl">Printing with Issue Press</li>
                    <li>Introduction to RISO</li>
                    <li>Another Heading</li>
                    <li>More Stuff...</li>
                    <li>Equipment List</li>
                    <li>Request a Quote</li>
                </ul>
            </aside>
            <div class="w-full md:w-3/4 px-6 py-8">
                <QuoteForm />
            </div>
        </div>

    </section>

</template>
<script setup lang="ts">
import { useColorStore } from "~/stores/colors";

const colorStore = useColorStore();

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});
</script>

<style scoped>

 .print-docs ul {
     @apply flex flex-col ;
 } 
 .print-docs li {
        @apply py-2 font-serif; 
    }


</style>