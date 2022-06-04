<template>
    <form class="flex flex-col">
        <h2 class="text-2xl text-center font-serif py-6 ">Print Request Form</h2>
        <fieldset legend="Basic Info">
            <h3>Basic Info</h3>
            <TextField v-model="project.name" name="Project Name" required class="col-span-2" placeholder="My kickass zine, print, or whatever!"/>
            <TextField v-model="project.submitterName" name="Your Name" placeholder="Noboru Hayama" />
            <TextField v-model="project.submitterEmail" name="Your Email" placeholder="info@issue.press" />
            <SelectField v-model="project.type" :options="['Publication','Print']" name="Project Type" />   
            <SelectField v-model="project.quantity" :options="['50','100','250','500']" name="Quantity" />
        </fieldset>
        <fieldset legend="Publication Specs" v-if="project.type == 'Publication'">
            <h3>Publication Specs</h3>
            <TextField v-model="project.publication.pages" name="Pages" type="number" :step="4" />
            <SelectField v-model="project.publication.finishedSize" :options="['4 x 5', '5 x 7','5 x 8', '7 x 10', '8 x 10']" name="Finished Size" />
            <SelectField v-model="project.publication.binding.type" :options="['Staple','Perfect','Wire-O','Spiral','None']" name="Binding Type" />
            <div>
            <SelectField v-if="project.publication.binding.type == 'Staple'" v-model="project.publication.binding.stapleColor" :options="['Silver','Flat Gold','Black','Red','Orange','Yellow','Green','Blue','Pink']" name="Color" />
            <TextField v-if="project.publication.binding.type == 'Wire-O' || project.publication.binding.type == 'Spiral' " v-model="project.publication.binding.color" name="Color" placeholder="Enter your preferred color"/>
            </div>
            <CheckBox v-model="project.publication.cover.plusCover" :options="['Seperate cover?']" is-boolean class="col-span-2" />

            <TextField v-if="project.publication.cover.plusCover" v-model="project.publication.cover.stock" name="Cover Stock" class="col-span-2 " placeholder="e.g. 65#c Vellum Bristol Cream"/>
            <CheckBox v-if="project.publication.cover.plusCover" v-model="project.publication.cover.outsideInkColors" name="Outside Cover Ink Colors" :options="inkColors" class="col-span-2" multi />
            <CheckBox v-if="project.publication.cover.plusCover" v-model="project.publication.cover.insideInkColors" name="Inside Cover Ink Colors" :options="inkColors" class="col-span-2" multi />

            
            <TextField v-model="project.publication.interior.stock" class="col-span-2 " name="Interior Paper Stock" placeholder="e.g. 70#t Domtar Cougar Natural" />
            <CheckBox v-model="project.publication.interior.inkColors" name="Interior Ink Colors" :options="inkColors" class="col-span-2" multi />
        </fieldset>
        <fieldset legend="Print Specs" v-else-if="project.type == 'Print'" >
            <h3>Print Specs</h3>
            <TextField v-model="project.print.stock" name="Paper Stock" class="col-span-2 md:col-span-1" />
        </fieldset>
        <fieldset legend="Final Details">
            <h3>Final Details</h3>
            <TextField v-model="project.notes" name="Notes / Additional Details" class="col-span-2" placeholder="..."/>
            <TextField v-model="project.dueDate" name="Due Date" type="date"/>
            <SelectField v-model="project.delivery.type" :options="['Local pickup in Grand Rapids, MI','Ship']" name="Delivery Method" />
            <TextField v-model="project.referral" name="How'd You Find us?" class="col-span-2" placeholder="Funny story, actually..."/>
        </fieldset>
        <fieldset legend="submit" class="text-center">
            <h3>Phew... you made it!</h3>
            <button>Submit</button>
        </fieldset>


    </form>

</template>
<script setup lang="ts">
    import { ref, toRefs } from 'vue';
    import { useColorStore } from "~/stores/colors";
    const colorStore = useColorStore();

    const inkColors = ['aqua','black','blue','burgundy','copper','coral','cornflower','flat-gold','fluorescent-orange','fluorescent-pink','fluorescent-red','fluorescent-yellow','green','kelly-green','light-gray','metallic-gold','mint','moss','orange','orchid','risofederal-blue','scarlet','sunflower','white','yellow'];

    const project = ref({
        name: null,
        submitterName: null,
        submitterEmail: null,
        notes: null,
        type: null,
        quantity: 100,
        dueDate: null,
        delivery: {
            type: 'Ship',
            zipcode: null,
        },
        publication: {
            finishedSize: '5 x 7',
            pages: 16,
            binding: {
                type: 'Staple',
                stapleColor: 'Silver',
                color: null,
            },
            cover: {
                plusCover: null,
                doubleSided: false,
                stock: null,
                outsideInkColors: [],
                insideInkColors: [],
            },
            interior: {
                stock: null,
                inkColors: [],
            },
        },
        print: {
            stock: null
        },

    });

</script>

<style>

fieldset {
   @apply flex flex-col border-b-2 grid gap-6 grid-cols-2 mb-6 ;
   padding: 1.5rem 0 !important;
}

fieldset:last-child {
    @apply border-b-0;
}
fieldset h3 {
    @apply text-xl text-center font-serif col-span-2;
}

.form-item {
  @apply flex flex-col my-2;
}

.form-item label {
  @apply font-bold text-lg font-sans pb-1;
}
.form-item input,
.form-item select {
  @apply border p-4 bg-white font-mono bg-gray-100;
}

.dark .form-item input,
.dark .form-item select {
    @apply bg-darker border-darker text-natural;
}

.dark .form-section {
    @apply border-darker;
}
</style>