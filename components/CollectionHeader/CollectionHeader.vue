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
