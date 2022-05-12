<template>
  <header
    class="flex flex-col justify-center  border-b-2 border-black my-8 pb-8"
  >
    <h1 class="text-3xl font-bold">{{ title }}</h1>
    <div v-if="description" v-html="description" class="text-sm mt-1"></div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>
