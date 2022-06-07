<template>
    <section>
        <Html>
            <Head>
                <Title>Printing | Issue Press</Title>
                <Meta name="description" content="Learn more about custom Risograph printing with Issue Press." />
                <Meta property="og:title" content="Paper | Issue Press" />
                <Meta property="og:site_name" content="Issue Press" />
                <Meta property="og:type" content="article" />
                <Meta property="og:url" content="https://issue.press/printing" />
                <Meta property="og:image" content="/issue-press.png" />
                <Meta name="twitter:card" content="summary" />
                <Meta name="twitter:site" content="@issuepress" />  
            </Head>
        </Html>
        <PrintDocs>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="image-caption text-xs ">
                    <img src="/images/printing/Issue_Press_printing.jpg" class="lg:order-last" />
                    <div class="pt-1">
                        Excerpt from <em class="underline"><NuxtLink to="/item/cabin-time-archipelago">Cabin-Time: Archipelago</NuxtLink></em>. Photo by <a href="https://instagram.com/jaimekjohnson" class="underline" target="_blank">Jaimé Johnson</a>
                    </div>
                </div>
                <div class="lg:order-first" >
                    <h2 class="text-2xl font-serif pb-6">Printing with Issue Press</h2>
                    <p>While Issue Press is primarily a publishing project, that practice is partially financed through the offer of Risograph printing of exceptional quality.</p>
                    <p>Issue Press is run by one person (hi!) in the margins of a completely unrelated day job and life, so what I may lack in speed I hope to make up for in above-average attention to detail and focus on craft.</p>
                    <p>I am not able to accomodate projects on rushed timelines, but luckily there are now many, many Risograph printers operating around the world and I recommend checking out <a href="https://stencil.wiki/atlas" target="_blank">The Atlas of Modern Risography</a>, a resource I built and maintain to help connect people to the burgeoning worldwide Risograph community.</p>
                    <p>If you are interested in Risograph printing with Issue Press, please peruse the information and guidelines in this section and <NuxtLink to="/printing/request-quote">request a quote</NuxtLink>.</p>
                    
                    <h3 class="font-serif md:hidden pt-4 pb-2">Table of Contents</h3>
                    <NuxtLink
                        v-for="link in printNavLinks"
                        :key="link.label"
                        :to="link.path"
                        class="block py-1 text-sm md:hidden underline"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </div>
            </div>
            <div class="text-sm border-t-1 mt-4 pt-4 font-mono">
                <p>Issue Press offers free flyer/poster printing for social justice and anti-racist initiatives, especially in my hometown of Grand Rapids, MI. To learn more, please email me at info@issue.press</p>
            </div>
        </PrintDocs>
    </section>

</template>
<script setup lang="ts">
import { printNavLinks } from "~/constants";
import { useColorStore } from "~/stores/colors";

const colorStore = useColorStore();

onMounted(() => {
  colorStore.setGlobalColor();
  document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
});
</script>