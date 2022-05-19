<template>
  <div class="collection-header" >
    <h1>{{ title }}</h1>
    <div v-if="description" v-html="description" class="description "></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>

<style>

.collection-header {
  @apply flex flex-col py-8 justify-center;
}

.collection-header h1 {
  @apply text-3xl font-bold font-serif text-center;

}
.collection-header .description {
  @apply leading-relaxed text-sm mt-2 text-center;
}

.collection-header .description a {
 @apply underline ;
}
</style>
