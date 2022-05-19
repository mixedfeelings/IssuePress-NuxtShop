<template>
  <div
    class="flex flex-col py-8 justify-center"
  >
    <h1 class="text-3xl font-bold font-serif text-center">{{ title }}</h1>
    <div v-if="description" v-html="description" class="text-sm mt-1 text-center"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>
