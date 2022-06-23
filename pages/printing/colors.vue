<template>
    <section>
        <Html>
            <Head>
                <Title>Ink Colors | Issue Press</Title>
                <Meta name="description" content="Learn more about Risograph ink and the available colors at Issue Press." />
                <Meta property="og:title" content="Ink Colors | Issue Press" />
                <Meta property="og:site_name" content="Issue Press" />
                <Meta property="og:type" content="article" />
                <Meta property="og:url" content="https://issue.press/printing/paper" />
                <Meta property="og:image" content="/issue-press.png" />
                <Meta name="twitter:card" content="summary" />
                <Meta name="twitter:site" content="@issuepress" />  
            </Head>
        </Html>
        <PrintDocs>
            <h2 class="text-2xl font-serif pb-6">Ink Colors</h2>
            <p>Unlike copy machines, Risograph duplicators use liquid ink similar to offset press. They are applied to the paper via an ink cylinder, or "drum," with a thin stencil wrapped around them. For more information on the technical process, please consult the <NuxtLink to="/printing/intro-to-riso">Introduction to Risograph Printing</NuxtLink> page.</p>   
            <p>Risograph ink is vegetable-based, either Soybean oil or Rice Bran oil. Alongside the great ecological benefit of using these natural waste materials, it does present some technical challenges. Soy and Rice-based inks cannot be cured by heat or evaporation like oil-based offset inks, and only dry through absorption into uncoated paper. This limits the type of paper that can be used in Risograph printing. It also means that that the ink can take a long time to dry, and may not be fully set for days or even weeks after being printed. On some papers they can still be smudged (with some effort) months or even years later! One of the many charms of the process.</p>
            <p>Each color requires a dedicated drum, and are only able to be printed one or two colors at a time depending on the machine. At Issue Press, I print primarily with a Risograph MZ 790U, which is a two-color duplicator. </p>
            <p>Issue Press currently stocks 27 drums:</p>
            <PrintDocsInkDisplay 
                v-for="ink in InkList" 
                :key="ink.id"
                :ink="ink"
            ></PrintDocsInkDisplay>
        </PrintDocs>
    </section>

</template>
<script setup lang="ts">
import { InkList } from "~/constants"
import { useColorStore } from "~/stores/colors";

const colorStore = useColorStore();

onMounted(() => {
    colorStore.setGlobalColor();
    document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
    document.documentElement.style.setProperty('--global-text-color',`var(--color-${colorStore.globalTextColor})`);

});
</script>

<style scoped>
.color-wrapper {
    @apply py-2;
}

.color-wrapper .color-ramp {
    @apply flex text-white w-full block h-12 font-mono;
}

.color-wrapper .color-ramp .p100,
.color-wrapper .color-ramp .p75,
.color-wrapper .color-ramp .p50,
.color-wrapper .color-ramp .p25 {
    @apply p-2 flex justify-end items-end;
}

.color-wrapper .color-ramp .p100 span,
.color-wrapper .color-ramp .p75 span, 
.color-wrapper .color-ramp .p50 span,
.color-wrapper .color-ramp .p25 span{
    @apply leading-none;
}

.color-wrapper .color-ramp .p100 {
    @apply w-1/2;
}

.color-wrapper .color-ramp .p75,
.color-wrapper .color-ramp .p50,
.color-wrapper .color-ramp .p25 {
    @apply w-2/12 bg-white;
}


.color-wrapper .color-ramp .p75 {
    @apply bg-opacity-25;
}

.color-wrapper .color-ramp .p50 {
    @apply bg-opacity-50;
}

.color-wrapper .color-ramp .p25 {
    @apply bg-opacity-75;
}


.color-wrapper.white .color-ramp .p100 {
   @apply bg-opacity-90 bg-white;
}

.color-wrapper.white .color-ramp .p75 {
    @apply bg-opacity-75;
}

.color-wrapper.white .color-ramp .p50 {
    @apply bg-opacity-50;
}

.color-wrapper.white .color-ramp .p25 {
    @apply bg-opacity-25;
}

.color-info {
    @apply pt-1 flex gap-4 items-center divide-x divide-gray-300;
}

.color-info .pantone,
.color-info .hex,
.color-info .price {
    @apply text-xs pl-4;
}

.fluorescent-yellow .color-ramp, 
.white .color-ramp, 
.yellow .color-ramp {
    @apply text-black;
}

.dark .color-wrapper.white .color-ramp {
    @apply bg-darker;
}

</style>