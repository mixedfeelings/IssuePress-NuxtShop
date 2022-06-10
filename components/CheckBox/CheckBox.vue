<template>
    <label :for="fieldId" class="checkbox flex gap-2 items-center " :class="{ selected: checked }, color ? `bg-${color}`: ''">
        <input 
            @input="(event) => $emit('update:checked', event.target.checked)"
            :id="fieldId"
            :value="label"
            :checked="checked"
            type="checkbox"
            hidden 
        /> 
            <div class="square" /> {{label}} <span v-if="postLabel" class="post-label">{{postLabel}}</span>
    </label>
</template>
<script setup lang="ts">
const props = defineProps<{
    fieldId: string,
    label?: string,
    checked: boolean,
    postLabel?: string,
    color?: string;
}>();

const { fieldId, label, checked, postLabel} = toRefs(props);
</script>
