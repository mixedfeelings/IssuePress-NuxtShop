<template>
    <div class="color-wrapper" :class="`${ink.id} `" >
        <div class="color-ramp" :class="`${lightOrDark(ink.rgb)}`" :style="ink.rgb ? `background-color: rgb(${ink.rgb});` : '' ">
            <div class="color-ramp-inner">
                <div class="p100">
                    <div class="color-info desktop-only">
                        <div v-if="ink.name" class="name font-serif"><NuxtLink :to="`/collections/${formatText(ink.name)}`">{{ink.name}}</NuxtLink></div>
                        <div class="color-info-meta">
                            <div v-if="ink.pantone" class="pantone">{{ink.pantone}}</div>
                            <div v-if="ink.hex" class="hex">{{ink.hex}}</div>
                            <div v-if="ink.postLabel" class="price">{{ink.postLabel}}</div>
                        </div>

                    </div>
                </div>
                <div class="p75"><span>75%</span></div>
                <div class="p50"><span>50%</span></div>
                <div class="p25"><span>25%</span></div>
            </div>
        </div>
        <!-- <div class="color-info mobile-only">
            <div v-if="ink.name" class="name font-serif">{{ink.name}}</div>
            <div v-if="ink.pantone" class="pantone">{{ink.pantone}}</div>
            <div v-if="ink.hex" class="hex">{{ink.hex}}</div>
            <div v-if="ink.postLabel" class="price">{{ink.postLabel}}</div>
        </div> -->
    </div>    
</template>
<script setup lang="ts">
    import { lightOrDark } from "~/utils/colors";
    import { slugify } from "~/utils/strings";


    function formatText(text: string) {
        return slugify(text);
    }

    const props = defineProps<{
        ink: {
            name: string;
            pantone: string;
            hex: string;
            postLabel: string;
            rgb: string;
        };
    }>();
</script>
<style scoped>
.color-wrapper {
    @apply py-2;
}

.color-wrapper .color-ramp .color-ramp-inner  {
    @apply flex w-full block font-mono;
}

.color-wrapper .color-ramp .p100 {
    @apply p-3 flex flex-col;
}

.color-wrapper .color-ramp .p75,
.color-wrapper .color-ramp .p50,
.color-wrapper .color-ramp .p25 {
    @apply p-3 flex justify-end items-end w-20;
}

.color-wrapper .color-ramp .p100 span,
.color-wrapper .color-ramp .p75 span, 
.color-wrapper .color-ramp .p50 span,
.color-wrapper .color-ramp .p25 span{
    @apply leading-none;
}

.color-wrapper .color-ramp .p100 {
    @apply w-full;
}

.color-wrapper .color-ramp .p75,
.color-wrapper .color-ramp .p50,
.color-wrapper .color-ramp .p25 {
    @apply bg-white;
}


.color-wrapper .color-ramp .p75 {
    @apply bg-opacity-25;
}

.color-wrapper .color-ramp .p50 {
    @apply bg-opacity-50;
}

.color-wrapper .color-ramp .p25 {
    @apply bg-opacity-75;
}


.color-wrapper.white .color-ramp .p100 {
   @apply bg-opacity-90 bg-white;
}

.color-wrapper.white .color-ramp .p75 {
    @apply bg-opacity-75;
}

.color-wrapper.white .color-ramp .p50 {
    @apply bg-opacity-50;
}

.color-wrapper.white .color-ramp .p25 {
    @apply bg-opacity-25;
}

.color-info {
    @apply flex gap-4 divide-x items-center ;
}

.color-ramp .color-info .color-info-meta {
    @apply w-full flex;
}

.color-ramp .color-info {
    @apply flex-col justify-start gap-x-4 divide-x-0 gap-y-1 items-start w-full;
}

.color-info .pantone,
.color-info .hex,
.color-info .price {
    @apply text-xs pr-4;
}

.color-wrapper.white .color-ramp-inner{
    @apply bg-gray-300;
}

.dark .color-wrapper.white .color-ramp-inner{
    @apply bg-darker;
}
</style>
