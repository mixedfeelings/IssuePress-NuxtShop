<template>
  <div class="form-item">
    <label class="label" :for="props.name" :aria-label="props.name">{{props.name}} <span v-if="required" class="required">*</span></label>
    <input
      :id="uuid"
      :ref="props.name" 
      :type="props.type" 
      :name="props.name" 
      :step="props.step"
      v-bind:value="props.modelValue"
      v-on:input="updateValue($event.target.value)"
      :placeholder="props.placeholder"
      :required="required"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue';

const uuid = ref(0);

const props = defineProps<{
    modelValue: any;
    placeholder?: string;
    name?: string;
    type?: string;
    step?: number;
    required?: boolean;
}>();

const { modelValue, placeholder, name, type, step, } = toRefs(props);

const emit = defineEmits(['update:modelValue'])

function updateValue(value) {
  emit('update:modelValue', value)
}

</script>
