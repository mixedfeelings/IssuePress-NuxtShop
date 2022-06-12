<template>
    <div class="form-item " >
        <label>{{name}} <span v-if="required" class="required">*</span></label>
        <div class="checkbox-wrapper multi grid sm:flex text-xs sm:text-sm grid-cols-2">
            <CheckBox
                v-for="option in options"
                :checked="value.includes(option.name)"
                :fieldId="`${listUUID}-${option.id}`"
                :label="option.name"
                :key="option"
                @update:checked="check(option.name, $event)"
                :post-label="option.postLabel"
                :rgb="option.rgb"
            ></CheckBox>
        </div>
    </div>
</template>
<script setup lang="ts" >
    import { makeUUID } from "~/utils/strings";

    const props = defineProps<{
        value: any;
        options: Array<any>;
        name?: string;
        required?: boolean;
        color?: boolean;
    }>();

    const listUUID = ref("");
    const emit = defineEmits(['update:value'])

    const check = (optionId, checked) => {    // copy the value Array to avoid mutating props
        let updatedValue = [...props.value];    // remove name if checked, else add name
        if (checked) {
            updatedValue.push(optionId);
        } else {
            updatedValue.splice(updatedValue.indexOf(optionId), 1);
        }    // emit the updated value
        emit("update:value", updatedValue);
    };

    onMounted(() => {
        listUUID.value = makeUUID(5);
    });

</script>
