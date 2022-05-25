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
        Issue Press is a tiny publisher and Risograph print shop operated by George Wietor in Grand Rapids, Michigan. Since 2010, it has worked with an elastic mandate to publish captivating works by artists of all mediums that trade in humor, history, and exploration of place. 
      </p>  
      <p>
        In addition to publishing, Wietor has initiated several side projects dedicated to the growth of the international Riso community, including: <a href="https://stencil.wiki">stencil.wiki</a>; <a href="https://stencil.wiki/atlas">An Atlas of Modern Risography</a>; and with Matt Davis of <a href="https://perfectly-acceptable.com">Perfectly Acceptable Press</a>, Wietor is a cofounder of the <a href="http://risograph.org">North American Risograph Conference (NARC)</a>, a gathering of Riso devotees held biannually in Chicago, Illinois.  
      </p>
    </section>
    <section class="bg-natural font-sans py-8">
      <div class="flex flex-col md:flex-row  md:container md:mx-auto">
        <div class="w-full md:w-1/2 px-6 pb-4 md:pb-0 flex flex-col items-center justify-center">
            <img src="https://cdn.shopify.com/s/files/1/0268/1772/4598/files/issue-press_bergen-art-book-fair-2022.jpg?v=1653453757" height="auto" width="100%"/>
            <div class="text-center font-mono text-sm px-6">Issue Press at Bergen Art Book Fair 2022</div>
        </div>
        <div class="w-full flex flex-col lg:flex-row px-6">
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
          <div class="lg:pl-6">
            <!-- Begin MailChimp Signup Form -->
            <div id="mc_embed_signup" class="w-full text-center md:text-left mt-6 lg:mt-0">
              <form action="https://issue-press.us2.list-manage.com/subscribe/post?u=4804e7056fcf0c786d917a302&amp;id=a733fd0da9" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate w-full" target="_blank">
                <h3 class="font-serif text-xl">Mailing List</h3>
                <p>Infrequent, but fun! </p>
                <div class="flex gap-1 justify-center md:justify-start  ">
                  <div class="mc-field-group">
                    <input type="email" value="Email address" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Email address':this.value;" name="EMAIL" class="required email p-4 border border-black border-2" id="mce-EMAIL">
                  </div>
                  <div id="mce-responses" class="clear">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                  </div>
                  <input type="submit" value="Go" name="subscribe" id="mc-embedded-subscribe" class="button px-6 py-4 text-white bg-black cursor-pointer font-serif">
                </div>

              </form>
            </div>
            <!--End mc_embed_signup-->
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