<template>
<div class="form-item " >
    <label>{{name}} <span v-if="required" class="required">*</span></label>
    <div class="checkbox-wrapper multi grid sm:flex text-xs sm:text-sm  grid-cols-2">
        <CheckBox
            v-for="option in options"
            :checked="value.includes(option.id)"
            :fieldId="option.id"
            :label="option.name"
            :key="option"
            @update:checked="check(option.id, $event)"
            :post-label="option.postLabel"
            :color="color"
        />
    </div>
</div>


</template>
<script setup lang="ts" >

const props = defineProps<{
    value: Array<string>;
    options: Array<string>;
    name?: string;
    required?: boolean;
    color?: boolean;
}>();

const emit = defineEmits(['update:value'])

const { options, name, value } = toRefs(props);

  const check = (optionId, checked) => {    // copy the value Array to avoid mutating props
    let updatedValue = [...props.value];    // remove name if checked, else add name
    if (checked) {
      updatedValue.push(optionId);
    } else {
      updatedValue.splice(updatedValue.indexOf(optionId), 1);
    }    // emit the updated value
    emit("update:value", updatedValue);
  };

</script>
