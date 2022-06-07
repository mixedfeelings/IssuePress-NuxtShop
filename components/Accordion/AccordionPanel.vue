<template>
    <div class="accordion-wrapper" >
        <div v-if="props.title" class="accordion-header" >
            <h3 class="w-full">
                <button
                    type="button" 
                    :aria-expanded="panelOpen"
                    :id="`${panelTitle}-button`"
                    :aria-controls="`${panelTitle}-region`"
                    @click="handleClick"
                    @keyup.enter="handleClick"
                    class="flex w-full items-center justify-between"
                >
                    <div class="flex flex-col md:flex-row gap-x-6 justify-start items-start md:items-center ">
                        <div class="accordion-title">{{props.title}}</div>
                        <slot name="post-title"></slot>
                    </div>
                    <DownIcon v-if="!panelOpen" class="w-6 h-6" aria-hidden />
                    <UpIcon v-else class="w-6 h-6" aria-hidden />
                </button>
            </h3>       
        </div>
        <div 
            :id="`${panelTitle}-region`" 
            role="region" 
            :aria-labelledby="`${panelTitle}-button`"
            class="accordion-content"
            :class="{ isOpen: panelOpen }"
        >
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
    import UpIcon from "@heroicons/vue/solid/esm/ChevronUpIcon.js";
    import DownIcon from "@heroicons/vue/solid/esm/ChevronDownIcon.js";
    import { slugify } from "~/utils/strings";

    const panelOpen = ref(false);
    const props = defineProps<{
        title?: string;
    }>();

    const panelTitle = computed(() => slugify(props.title));

    function handleClick() {
        panelOpen.value = !panelOpen.value;
    }
</script>

<style scoped >
    .accordion-wrapper {
        @apply bg-gray-100 mb-[2px];
    }

    .accordion-wrapper .accordion-header button {
        @apply flex p-4 justify-between cursor-pointer;
    }

    .accordion-wrapper .accordion-header .accordion-title {
        @apply text-base font-bold font-serif;
    }

    .accordion-wrapper .accordion-content { 
        @apply hidden px-4 pb-4;
        transition: 150ms ease-out;
    }

    .dark .accordion-wrapper {
        @apply bg-darker;
    }
</style>