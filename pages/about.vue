<template>
  <div>
    <Html>
      <Head>
        <Title>About Page</Title>
        <Meta name="description" content="Lorem ipsum" />
      </Head>
    </Html>
    <section class="px-6 my-8 font-serif text-lg md:text-2xl lg:text-3xl md:leading-10 lg:leading-12 text-center md:text-left">
      <p>
        Issue Press is a tiny publisher and Risograph print shop operated by George Wietor in Grand Rapids, MI, USA. Since 2010, it has worked with an elastic mandate to publish captivating works by artists of all mediums that trade in humor, history, and exploration of place. 
      </p>  
      <p>
        In addition to publishing, Wietor has initiated several side projects dedicated to the growth of the international Riso community, including: <a href="https://stencil.wiki">stencil.wiki</a>; <a href="https://stencil.wiki/atlas">An Atlas of Modern Risography</a>; and with Matt Davis of <a href="https://perfectly-acceptable.com">Perfectly Acceptable Press</a>, Wietor is a cofounder of the <a href="http://risograph.org">North American Risograph Conference (NARC)</a>, a gathering of Riso devotees held biannually in Chicago, Illinois.  
      </p>
    </section>
    <section class="bg-natural font-sans py-8">
      <div class="flex flex-col md:flex-row  md:container md:mx-auto">
        <div class="w-full md:w-1/3 px-6 pb-4 md:pb-0 flex flex-col items-center justify-center">
            <img src="/images/issue-press_bergen-art-book-fair-2022.jpg" height="auto" width="100%"/>
            <div class="text-center font-mono text-sm px-6">Issue Press at Bergen Art Book Fair 2022</div>
        </div>
        <div class="w-full md:w-3/5 px-6">
          <div class="flex flex-col items-center md:items-start h-full ">
            <div class="text-base md:text-lg lg:text-2xl text-center md:text-left">
              <h3 class="font-semibold font-serif">Issue Press</h3>
                Tanglefoot Building<br/>
                314 Straight Ave. SW<br/>
                Grand Rapids, MI 49504<br/>
                USA<br/>
                <br/>
                info@issue.press<br/>
                <br/>
                <em>Studio open by appointment only.</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { useColorStore } from "~/stores/colors";

  const colorStore = useColorStore();

  onMounted(() => {
    colorStore.setGlobalColor();
    document.documentElement.style.setProperty('--global-color',`var(--color-${colorStore.globalColor})`);
  });
</script>