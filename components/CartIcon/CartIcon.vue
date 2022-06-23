<template>
  <button
    class="cart-icon flex items-center justify-end relative "
    aria-label="Cart"
    @click="handleClick"
    @keyup.enter="handleClick"
  >
    <ShoppingCartIcon class="w-6" aria-hidden />
    <div v-if="count > 0 " class="badge" :class="count > 9 ? 'small' :'' ">{{count}}</div>
  </button>
</template>

<script setup lang="ts">
import ShoppingCartIcon from "@heroicons/vue/solid/esm/ShoppingCartIcon.js";
import { useShopStore } from "~/stores/shop";
import { useCartStore } from "~/stores/cart";


const shopStore = useShopStore();
const cartStore = useCartStore();

const count = computed (() => { return cartStore.lineItems.reduce((r, a) => (r += (+a.node.quantity ?? 0) ), 0)}
);

function handleClick() {
  cartStore.toggleCart();
  shopStore.toggleMenu(false);
}
</script>
<style scoped>
.badge {
   @apply absolute rounded-full flex items-center justify-center font-bold bg-white tracking-tighter ;
   background-color: var(--global-color);
   color: var(--global-text-color);
   padding: .1rem;
   width: 1.5rem;
   height: 1.5rem;
   border: white 2px solid;
   text-shadow: 1px;
   font-size: .75rem; 
   top: -.625rem;
   right: -.875rem;
}

.dark .badge {
  @apply border-darkest;
}
.badge.small {
  font-size: .625rem;
}

</style>
