<template>
  <div class="form-item">
     <label class="label" :for="props.name" :aria-label="props.name">{{props.name}} <span v-if="required" class="required">*</span></label>     
    <select
      class="form-select bg-clip-padding bg-no-repeat appearance-none "
      @change="updateValue($event.target.value)"
      v-model="selected"
      :required="required"
    >
      <option disabled>Select</option>
      <option
        v-for="option in props.options"
        :key="option.id"
        :index="options.id"
        :value="option.name"
        :selected="selected"
      >
         {{ option.name }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue';

const uuid = ref(0);

const props = defineProps<{
    modelValue: any;
    options: Array<string>;
    name?: string;
    required?: boolean;
}>();

const { modelValue, options, name } = toRefs(props);

const selected = props.modelValue || "Select";

const emit = defineEmits(['update:modelValue'])

function updateValue(value) {
  emit('update:modelValue', value)
}

</script>