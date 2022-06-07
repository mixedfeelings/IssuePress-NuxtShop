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
