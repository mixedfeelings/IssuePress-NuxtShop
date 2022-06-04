<template>
  <div class="form-item">
     <label v-if="props.name" class="label" :for="props.name" :aria-label="props.name">{{props.name}}</label>  
     <div :class="`checkbox-wrapper ${multi ? 'multi' : ''}`">
        <label
            v-for="(option, i) of options" :key="i"
            :for="option.key"
            :class="checkbox_class(option)" 
        >
            <div class="circle" /> {{option.replace(/-/g, ' ')}}
            <input class="hidden" type="checkbox"
                :id="option"
                :value="option"
                v-model="picked"
                @change="isBoolean? updateValue($event.target.checked) : updateValue($event.target.value)"
            />
        </label>
     </div>   

  </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue';

const uuid = ref(0);
const picked = ref([]);
const props = defineProps<{
    modelValue: Array<string> | boolean | string;
    options: Array<string>;
    name?: string;
    multi?: boolean;
    isBoolean?: boolean;
}>();

const { modelValue, options, name, multi } = toRefs(props);

const emit = defineEmits(['update:modelValue'])

function updateValue(value) {
  emit('update:modelValue', value)
}

function isChecked(value) {
    return this.picked.includes(value);
}

function checkbox_class(option) {
    return `checkbox ${option} ${this.isChecked(option) ? 'selected' :''}`;
}

//:style="`background-color: var(--color-${option})`"
</script>
<style scoped>
.form-item .checkbox-wrapper.multi {
    @apply flex flex-wrap gap-2;
}

.checkbox {
    @apply gap-2 font-normal text-base font-mono items-center cursor-pointer inline-flex p-0;
}

.multi .checkbox {
    @apply p-2 rounded text-sm font-normal capitalize flex gap-2 items-center bg-gray-100 font-mono bg-white;
}

.circle {
    @apply w-3 h-3 bg-transparent border-2 border-black rounded-full flex items-center justify-center overflow-hidden;
    min-width: .75rem;
}

.selected .circle {
    @apply bg-black;
}

.dark .multi .checkbox {
    @apply text-natural bg-darkest;
}

.dark .circle {
    @apply border-natural;
}

.dark .selected .circle {
    @apply bg-natural;
}

</style>
