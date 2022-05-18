<template>
  <div
    class="flex flex-col py-8"
  >
    <h1 class="text-3xl font-bold">{{ title }}</h1>
    <div v-if="description" v-html="description" class="text-sm mt-1"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>
