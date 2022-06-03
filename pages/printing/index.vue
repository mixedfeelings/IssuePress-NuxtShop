<template>
    <section>
        <Html>
            <Head>
                <Title>Printing | Issue Press</Title>
            </Head>
        </Html>
        <div class="px-6 my-8 font-sans text-base md:text-lg lg:text-xl md:leading-10 ">
            <h1 class="text-3xl font-serif text-center mb-4">Printing</h1>
        </div>
        <div class=" px-6 py-8">
            <QuoteForm />
            <div>

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
