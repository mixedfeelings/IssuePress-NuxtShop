<template>
    <section>
        <Html>
            <Head>
                <Title>File Prep | Issue Press</Title>
                <Meta name="description" content="Learn more about prepping files for printing with Issue Press."/>
                <meta property="og:title" content="File Prep | Issue Press" />
                <meta property="og:site_name" content="Issue Press" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://issue.press/printing/file-prep" />
                <meta property="og:image" content="/images/issue-press.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@issuepress" />  
            </Head>
        </Html>
        <PrintDocs>
            <h2 class="text-2xl font-serif pb-6">File Prep</h2>
            <p>For any project, please provide both print files and a low-res color composite to use as a guide. Files should be <a href="https://www.youtube.com/watch?v=_y_6xFTgxtw" target="_blank">channel separated</a> (not layer separated!) color PDFs formatted in normal reading order (front cover, inside cover, page 1, page 2, etc.) as pages not spreads.</p>
            <p>If the project is full bleed, include at least 1/8" bleed area but no additional crop marks and margins, they will be added when the file is setup for printing.</p>
            <p>When exporting, I really recommend using lossless ZIP compression over lossy JPG compression because JPG has a tendency to add a lot of gross digital noise that the RISO definitely WILL print. To make things easier, feel free to use <a href="/resources/IP_PDF.zip" taget="_blank">these settings</a> when exporting your PDF. </p>
            <p>Remember to make important details like text and outlines pure black (#000000), but avoid large patches of pure black because the Risograph does not handle areas like these very well. Please use 70% - 90% value (depending on the size of the area and ESPECIALLY if its going to be full bleed).</p>
            <p>Please provide raster images at 600 dpi if possible, 300 dpi at a minimum.</p>
            <p>For type and vector images and line art, do not flatten your PDFs - they will print better if you don’t! It is 100,000% absolutely recommended that you DO NOT USE PHOTOSHOP TO LAYOUT TEXT. You will likely be unsatisfied with the result as it was not designed for printing text and does some weird things to the text vectors. Instead I recommend using InDesign to combine text with your Photoshop raster and Illustrator vector art.</p>
            <p>If needed, I am happy to assist with the preperation of a print-ready color-separated file at the rate of $35/hr. </p>
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