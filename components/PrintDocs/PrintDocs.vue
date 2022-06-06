<template>
    <section>
        <div class="print-docs-header">
            <Chevron class="md:hidden m-4 absolute left-0" />
            <h1 class="text-3xl font-serif text-center mb-6 py-2 ">Printing</h1>
        </div>
        <div class="print-docs flex flex-col md:flex-row">
            <PrintNavigation />
            <div class="print-docs-body w-full md:w-3/4">
                <slot></slot>
            </div>
        </div>
    </section>
</template>

<style scoped>

.print-docs-header {
    @apply relative pt-6 px-6 border-b-2;
}

.print-docs .print-docs-body {
    @apply bg-transparent p-6;
}

.dark .print-docs-header,
.dark .print-docs-body,
.dark .print-docs aside {
    @apply border-darker bg-darkest;
}


</style>
