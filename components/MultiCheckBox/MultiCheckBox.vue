<template>
<div class="form-item " >
    <label>{{name}} <span v-if="required" class="required">*</span></label>
    <div class="checkbox-wrapper multi grid sm:flex text-xs sm:text-sm  grid-cols-2">
        <CheckBox
            v-for="option in options"
            :checked="value.includes(option.id)"
            :fieldId="getItemId(option.id)"
            :label="option.name"
            :key="option"
            @update:checked="check(option.id, $event)"
            :post-label="option.postLabel"
            :color="option.id"
        ></CheckBox>
    </div>
</div>


</template>
<script setup lang="ts" >


const props = defineProps<{
    value: any;
    options: Array<any>;
    name?: string;
    required?: boolean;
    color?: boolean;
}>();


const uuid = ref("");
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


    function getItemId(item) {
        // name is optional so set an id that works with multiple r-checkboxes on page
        return this.uuid + "-" + item;
    }

    function makeUUID(length) {
        let result = "";
        let characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
            );
        }
        uuid.value += result;
    }

    onMounted(() => {
        makeUUID(5);
    });

</script>
