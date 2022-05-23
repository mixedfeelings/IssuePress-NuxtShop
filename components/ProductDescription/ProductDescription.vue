<template>
  <div v-html="description"  />
</template>

<script setup lang="ts">
const props = defineProps<{
  description: string;
}>();

const { description } = toRefs(props);
</script>
