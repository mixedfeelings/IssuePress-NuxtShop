<template>
    <section>
        <Html>
            <Head>
                <Title>Printing | Issue Press</Title>
            </Head>
        </Html>
        <PrintDocs>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="image-caption text-xs">
                    <img src="/images/printing/Issue_Press_printing.jpg" class="lg:order-last" />
                    photo by <a href="https://instagram.com/jaimekjohnson" class="underline" target="_blank">Jaimé Johnson</a>
                </div>
                <div class="lg:order-first" >
                    <h2 class="text-2xl font-serif pb-6">Printing with Issue Press</h2>
                    <p>While Issue Press is primarily a publishing project, that practice is partially financed through the offer of Risograph printing of exceptional quality.</p>
                    <p>Issue Press is run by one person in the margins of a completely unrelated day job (hi!), so what I may lack in speed I hope to make up for in above-average attention to detail and focus on craft.</p>
                    <p>I am not able to accomodate projects on rushed timelines, but luckily there are no many, many Risograph printers operating around the world at various capacities and I recommend checking out <a href="https://stencil.wiki/atlas" target="_blank">The Atlas of Modern Risography</a>, a resource built and maintained by me to help connect people to the burgeoning worldwide Risograph community.</p>
                    <p>If you are further interested in Risograph printing with Issue Press, please peruse the information and guidelines in this section and <NuxtLink to="/printing/request-quote">request a quote</NuxtLink>.</p>
                </div>
            </div>
            <div class="text-sm border-t-1 mt-4 pt-4 font-mono">
                <p>Issue Press offers free flyer/poster printing for social justice and anti-racist initiatives, especially in my hometown of Grand Rapids, MI. To learn more, please email us at info@issue.press</p>
            </div>
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