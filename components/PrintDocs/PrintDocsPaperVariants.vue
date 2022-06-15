<template>
    <div class="paper-variant-grid">
        <h3>Colors:</h3>
        <div 
            v-for="variant in filtered_variants" 
            :key="variant.id" class="paper-variant" 
            :class="`${lightOrDark(variant.rgb)}`"  
            :style="variant.rgb ? `background-color: rgb(${variant.rgb});` : '' "
        >
            {{variant.name}}
        </div>
    </div>
</template>

<script setup lang="ts">
import { PaperList }  from "~/constants"
import { lightOrDark } from "~/utils/colors";


const props = defineProps<{
    paperId: string;
}>();

const filtered_variants = computed (() => {
    if (props.paperId) {
        let fv = PaperList.filter(item => {
            return item.id.includes(props.paperId);
        });
        return fv[0].variants;
    }
})

</script>

<style scoped>
.paper-variant-grid {
    @apply grid gap-2 grid-cols-2 mt-4;
}

.paper-variant-grid h3 {
    @apply col-span-2 font-bold;
}
.paper-variant-grid .paper-variant {
    @apply p-4
}

@media (min-width: 640px) {
    .paper-variant-grid {
        @apply grid-cols-3 ;
    }

    .paper-variant-grid h3 {
        @apply col-span-3;
    }
}
</style>