<template>
    <section>
        <Html>
            <Head>
                <Title>Request a Quote | Issue Press</Title>
            </Head>
        </Html>
        <PrintDocs>
            <h2 class="text-2xl font-serif pb-6">Request a Quote</h2>
            <QuoteForm/>
        </PrintDocs>
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