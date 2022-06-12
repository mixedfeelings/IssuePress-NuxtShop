<template>
    <label 
        :for="fieldId" 
        class="checkbox " 
        :class="check_class"
        :style="rgb ? `background-color: rgb(${rgb});` : '' "
    >
        <input 
            @input="(event) => $emit('update:checked', event.target.checked)"
            :id="fieldId"
            :value="label"
            :checked="checked"
            type="checkbox"
            hidden 
        > 
            <div class="square" ></div> {{label}} <span v-if="postLabel" class="post-label">{{postLabel}}</span>
    </label>
</template>
<script setup lang="ts">
    import { lightOrDark } from "~/utils/colors";

    const props = defineProps<{
        fieldId: string,
        label?: string,
        checked: boolean,
        postLabel?: string,
        rgb?: string;
    }>();

    const { fieldId, label, checked, postLabel} = toRefs(props);

    const check_class = computed (() => {
        let bc = `${props.fieldId} `;
        if (props.rgb) {
            bc +=  `color ${lightOrDark(props.rgb)} `;
        }
        if (props.checked) { 
            bc += "selected ";
        }
        return bc;
    });

</script>
