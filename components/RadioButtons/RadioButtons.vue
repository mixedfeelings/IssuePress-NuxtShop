<template>
    <div class="form-item radio-buttons lg:grid-columns-3">
        <label 
            v-for="option in options" 
            :key="option.id"
            :for="`${listUUID}-${option.id}`" 
            class="radio-button " 
            :class="button_class(option)" 
            :style="option.rgb ? `background-color: rgb(${option.rgb});` : '' "
        >
            <input  
                type="radio"
                @change="$emit('update:value', option.longName ? option.longName :option.id)" 
                :id="`${listUUID}-${option.id}`"
                :value="option.id"
                v-model="picked"
                hidden
            >
            <div class="circle"></div> {{option.name}} <span v-if="option.postLabel" class="post-label">{{option.postLabel}}</span>
        </label>  
    </div>    
</template>
<script setup lang="ts">
    import { makeUUID } from "~/utils/strings";
    import { lightOrDark } from "~/utils/colors";

    const picked = ref(null);
    const listUUID = ref(null);

    const props = defineProps<{
        options: any;
    }>();

    function button_class(option) {
        let bc = "";
        if (option.rgb) {
            bc +=  `color ${lightOrDark(option.rgb)} `;
        }
        if (picked.value == option.id){ 
            bc += "selected ";
        }
        return bc;
    };

    onMounted(() => {
        listUUID.value = makeUUID(5);
        picked.value = null;
    });


</script>