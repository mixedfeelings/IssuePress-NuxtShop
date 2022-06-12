<template>
    <div class="form-item paper-selector">
        <label>{{name}} <span v-if="required" class="required">*</span></label>
        <SelectField v-model="selected_paper" :options="filtered_papers" @change="clearSelectedVariant()"></SelectField>
        <transition name="fade">
            <RadioButtons v-if="has_variants" v-model:value="selected_variant" :options="selected_variants"  @change="handleChange(selected_variant)"></RadioButtons>
        </transition>
        <transition name="fade">    
            <TextField v-if="selected_paper == 'Other'" v-model="selected_variant" name="Other Paper Stock" @change="handleChange(selected_variant)" required placeholder="brand, line, weight, type, & color "></TextField>
        </transition>
        <p class="message pt-2 text-sm">Issue Press only keeps <strong>Domtar Cougar Smooth</strong> paper in-house, all other stocks are special ordered on a per-project basis.</p>
    </div>
</template>
<script setup lang="ts">
import { PaperList }  from "~/constants"

const props = defineProps<{
    name: string;
    type?: string;
    required?: boolean;
}>();

const selected_paper = ref(null);
const selected_variant = ref(null);
const emit = defineEmits(['update:value'])


const filtered_papers = computed (() => {
    if (props.type) {
        return PaperList.filter(item => {
            return item.type.includes(props.type);
        });
    } else {
        return PaperList;
    }
})

const selected_variants = computed(() => {
    if (selected_paper.value) {
        let ls = PaperList.filter(item => {
            return item.name.includes(selected_paper.value); 
        });
        return ls[0].variants;
    }
});

const has_variants = computed(() => {
    if (selected_variants.value?.length > 1 ) {
        return true;
    } else if (selected_variants.value?.length == 1) {
        selected_variant.value = selected_variants.value[0]?.name;
        handleChange(selected_variant);
    }
});

function clearSelectedVariant() {
    selected_variant == null;
}

function handleChange(value) {
    emit('update:value', value);
}

</script>

