<template>
  <header
    class="header sticky block top-0 w-full z-10 height-ease" :class="isSticky ? 'h-12 shadow-md ' : 'h-16 shadow-none'"
  >
    <div class="header-inner flex items-center bg-white pl-4 pr-6 w-full h-full">
      <Hamburger class="md:hidden mr-4" />
      <Logo />
      <Navigation class="md:ml-4" />
      <div class="flex items-center ml-auto">
        <ColorModePicker />
        <SocialMedia class="px-4 lg:px-6 desktop-only" />
        <CartIcon />
    </div>

    </div>

  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSticky = ref(false);
const scrollPosition = ref(0);

function handleScroll(){
  scrollPosition.value = window.scrollY;
  if(scrollPosition.value >= 30 ){
      isSticky.value = true;
  }else{
      isSticky.value = false;
  }
}

onBeforeMount(() => {
    if (process.client) {
      window.addEventListener('scroll', handleScroll);
    }
});
onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('scroll', handleScroll);
    }
});

</script>

<style scoped>
  .header {
      -webkit-transition: height 1s ease;
      -moz-transition: height 1s ease;
      -o-transition: height 1s ease;
      -ms-transition: height 1s ease;
      transition: height 1s ease;
  }

  .light .header {
    @apply bg-white;
  }

</style>
