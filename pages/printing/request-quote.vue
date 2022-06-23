<template>
    <section>
        <Html>
            <Head>
                <Title>Request a Quote | Issue Press</Title>
                <Meta name="description" content="Request a quote for custom Risograph printing with Issue Press." />
                <Meta property="og:title" content="Request a Quote | Issue Press" />
                <Meta property="og:site_name" content="Issue Press" />
                <Meta property="og:type" content="article" />
                <Meta property="og:url" content="https://issue.press/printing/request-quote" />
                <Meta property="og:image" content="/issue-press.png" />
                <Meta name="twitter:card" content="summary" />
                <Meta name="twitter:site" content="@issuepress" />         
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
    document.documentElement.style.setProperty('--global-text-color',`var(--color-${colorStore.globalTextColor})`);
});
</script>
