<template>
    <section>
        <div class="print-docs-header">
            <Chevron class="md:hidden my-2 mx-4 absolute right-0" />
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
