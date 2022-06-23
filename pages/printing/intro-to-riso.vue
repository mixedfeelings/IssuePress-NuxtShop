<template>
    <section>
        <Html>
            <Head>
                <Title>Introduction to Risograph Printing | Issue Press</Title>
                <Meta name="description" content="Learn more about the Risograph printing process." />
                <Meta property="og:title" content="Introduction to Risograph Printing | Issue Press" />
                <Meta property="og:site_name" content="Issue Press" />
                <Meta property="og:type" content="article" />
                <Meta property="og:url" content="https://issue.press/printing/intro-to-riso" />
                <Meta property="og:image" content="/issue-press.png" />
                <Meta name="twitter:card" content="summary" />
                <Meta name="twitter:site" content="@issuepress" />  
            </Head>
        </Html>
        <PrintDocs>
            <h2 class="text-2xl font-serif pb-6">Introduction to Risograph Printing</h2>
            <p>Bridging the gap between photocopier and offset printing, Risograph digital duplicators have traditionally been used in offices to do large print runs of one or two color documents.</p>
            <p>The Risograph digital duplicator works by transferring an image (either from a digital file or from the glass top) to a thin stencil. The stencil is then wrapped around a single color drum filled with liquid ink. The ink is pushed through the master and on to the paper (which runs flat through machine) while the drum rotates at high speed.</p>
            <p>This promotional video from the RISO corporation actually does a great job quickly explaining many of the basic technical details of the process:</p>
            <div class="video-wrapper relative mb-4">
                <div style="padding-top: 56.25%" />
                <iframe class="absolute h-full w-full top-0 bottom-0 left-0 right-0" width="100%" height="100%" src="https://www.youtube.com/embed/ofIh4EtGVno" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p>Olivia from <a href="https://oliviaandpindot.com/" target="_blank">Pindot Press</a>, a print shop in Oakville, ON, also created <a href="https://www.youtube.com/watch?v=1rfwKuXIhcE" target="_blank">this great intro video</a> that delves deeper into the use of Risograph duplicators for artist. I <em>highly</em> recommend this video to all newcomers to the process.</p>
            <p></p>
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
