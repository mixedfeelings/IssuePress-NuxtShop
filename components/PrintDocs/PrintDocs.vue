<template>
    <section>
        <div class="print-doc-header pt-6 px-6 font-sans text-base md:text-lg lg:text-xl md:leading-10 sm:border-b-2">
            <h1 class="text-3xl font-serif text-center mb-6 pb-2">Printing</h1>
        </div>
        <div class="print-docs flex flex-col sm:flex-row flex-grow flex-1 ">
            <aside class="w-full sm:w-1/4 desktop-only px-6 py-8 sticky border-r-2 flex-auto text-sm md:text-base">
                <ul>
                    <li><NuxtLink to="/printing">Printing with Issue Press</NuxtLink></li>
                    <li><NuxtLink to="/printing/intro-to-riso">Introduction to Risograph Printing</NuxtLink></li>
                    <li><NuxtLink to="/printing/colors">Ink Colors</NuxtLink></li>
                    <li><NuxtLink to="/printing/paper">Paper Options</NuxtLink></li>
                    <li><NuxtLink to="/printing/file-prep">File Prep</NuxtLink></li>
                    <li><NuxtLink to="/printing/request-quote">Request a Quote</NuxtLink></li>
                </ul>
            </aside>
            <div class="w-full sm:w-3/4 px-6 py-8">
                <slot></slot>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
</script>

<style scoped>

.print-docs {
    @apply h-auto;
}

.print-docs a {
    @apply underline;
}

.print-docs a:hover,
 .print-docs li a {
    @apply no-underline;
}
 .print-docs ul {
     @apply flex flex-col ;
 } 
 .print-docs li {
        @apply py-2 font-serif;
}

.print-docs .router-link-active {
    color: var(--global-color);
}

.dark .print-doc-header,
.dark .print-docs aside {
    @apply border-darker;
}

</style>
