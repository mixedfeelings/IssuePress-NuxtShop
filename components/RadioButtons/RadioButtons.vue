<template>
    <div class="form-item radio-buttons lg:grid-columns-3">
        <label 
            v-for="option in options" 
            :for="getItemId(option.id)" 
            class="radio-button " 
            :class="{ selected: picked == option.id }, {color: option.rgb}, lightOrDark(option.rgb)" 
            :style="option.rgb ? `background-color: rgb(${option.rgb});` : '' "
        >
            <input  
                type="radio"
                @change="$emit('update:value', option.longName ? option.longName :option.id)" 
                :id="getItemId(option.id)"
                :value="option.id"
                v-model="picked"
                hidden
            />
        <div class="circle" /> {{option.name}} <span v-if="option.postLabel" class="post-label">{{option.postLabel}}</span>
        </label>  
    </div>    
</template>
<script setup lang="ts">
    const picked = ref(null);
    const uuid = ref("");
    const emit = defineEmits(['update:value'])

    const props = defineProps<{
        options: Array<Object>;
    }>();

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


function lightOrDark(color) {
        color = `rgba(${color},1)`
        // Variables for red, green, blue values
        var r, g, b, hsp;
        // Check the format of the color, HEX or RGB?
        if (color.match(/^rgb/)) {
            // If RGB --> store the red, green, blue values in separate variables
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            r = color[1];
            g = color[2];
            b = color[3];
        }
        else {
            // If hex --> Convert it to RGB: http://gist.github.com/983661
            color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));
            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
        }
        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
        );
        // Using the HSP value, determine whether the color is light or dark
        if (hsp>127.5) {
            return 'light-option';
        }
        else {
            return 'dark-option';
        }
    }


    onMounted(() => {
        makeUUID(5);
        picked.value = null;
    });


</script>