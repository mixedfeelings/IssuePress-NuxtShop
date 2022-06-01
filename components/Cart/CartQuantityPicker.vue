<template>
    <div class="quantity-toggle">
    <button @click="decrement()">-</button>
    <input 
        type="text" 
        :value="modelValue" 
        readonly 
        class="w-auto"
    >
    <button @click="increment()">+</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

const props = defineProps<{
  id: string;
  modelValue: number;
}>();

const cartQuantity = ref(props.modelValue);
const id = props.id;


const updateItem = () => cartStore.cartLinesUpdate(id, cartQuantity.value);
const removeItem = () => cartStore.cartLinesRemove(id);

function increment() {
    cartQuantity.value++;
    updateItem();
}

function decrement() {
    if (cartQuantity.value === 1) {
        removeItem();
    } else {
        this.cartQuantity--
        updateItem();
    } 
}
</script>

<style scoped >

    .quantity-toggle {
        @apply flex overflow-hidden items-center font-semibold h-4;
    }   
        input {
            @apply font-semibold text-lg text-center h-4 w-8 border-none;
        }

        .dark input {
            @apply bg-darkest text-natural
        }
        
        button {
            @apply flex bg-transparent font-semibold items-center w-4 h-4 text-xl items-center justify-center rounded-full cursor-pointer;
        }

        button:hover {
            color: var(--global-color)
        }
    
</style>