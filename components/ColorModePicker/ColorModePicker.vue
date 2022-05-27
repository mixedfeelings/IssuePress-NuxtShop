<template>
    <button class="flex items-center justify-center mr-3 md:mr-1 mb-px" @click="changeColorMode">
        <MoonIcon v-if="colorMode == 'light'" class="h-5" />
        <SunIcon v-else class="h-5" />
    </button>
</template>

<script setup lang="ts">
import MoonIcon from "@heroicons/vue/solid/MoonIcon.js";
import SunIcon from "@heroicons/vue/solid/SunIcon.js";

    const colorMode = useColorMode();
    function changeColorMode() {
        if (colorMode.value == "dark") {
            colorMode.value = "light";
            console.log(colorMode.value);
        } else if (colorMode.value == "light") {
            colorMode.value = "dark";
            console.log(colorMode.value);
        }
        
    }
</script>