<template>
    <label :for="fieldId" class="checkbox flex gap-2 items-center " :class="{ selected: checked }, color ? `bg-${fieldId}`: '' ">
        <input 
            @input="(event) => $emit('update:checked', event.target.checked)"
            :id="fieldId"
            :checked="checked"
            type="checkbox"
            hidden 
        /> 
            <div class="circle" /> {{label}} <span v-if="postLabel" class="post-label">{{postLabel}}</span>
    </label>
</template>
<script setup lang="ts">
const props = defineProps<{
    fieldId: string,
    label?: string,
    checked: boolean,
    postLabel?: string,
    color?: boolean;
}>();

const { fieldId, label, checked, postLabel} = toRefs(props);
</script>
