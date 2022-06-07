<template>
    <form 
        name="Quotes" 
        netlify-honeypot="bot-field"
        data-netlify="true"        
        action="/"
        method="POST"
        class="flex flex-col pb-6"
    >

        <input type="hidden" name="form-name" value="Quotes" />
        <input value="/printing/request-quote" name="location" type="hidden" />

          <p class="hidden">
            <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
        </p>

        <fieldset legend="Basic Info">
            <h3>Basic Info</h3>
            <TextField v-model="project.name" name="Project Name" required class="col-span-2" placeholder="My kickass zine, print, or whatever!"/>
            <TextField v-model="project.submitterName" name="Your Name" placeholder="Noboru Hayama" />
            <TextField v-model="project.submitterEmail" name="Your Email" placeholder="info@issue.press" />
            <SelectField v-model="project.type" :options="['Publication','Print','Other']" name="Project Type" />   
            <SelectField v-model="project.quantity" :options="['50','100','250','500']" name="Quantity" />
        </fieldset>
        <transition name="fade">
            <fieldset legend="Publication Specs" v-if="project.type == 'Publication'">
                <h3>Publication Specs</h3>
                <TextField v-model="project.publication.pages" name="Pages" type="number" :step="4" />
                <SelectField v-model="project.publication.finishedSize" :options="['4 x 5', '5 x 7','5 x 8', '7 x 10', '8 x 10']" name="Finished Size" />
                <SelectField v-model="project.publication.binding.type" :options="['Staple','Perfect','Wire-O','Spiral','None']" name="Binding Type" />
                <div>
                    <TextField v-if="project.publication.binding.type == 'Wire-O' || project.publication.binding.type == 'Spiral' " v-model="project.publication.binding.color" name="Color" placeholder="Enter your preferred color" />
                    <SelectField v-if="project.publication.binding.type == 'Staple'" v-model="project.publication.binding.stapleColor" :options="['Silver','Flat Gold','Black','Red','Orange','Yellow','Green','Blue','Pink']" name="Color" />
                </div>
                <CheckBox v-model="project.publication.cover.plusCover" :options="['Seperate cover?']" is-boolean class="col-span-2" />
                <transition name="fade">
                    <fieldset v-if="project.publication.cover.plusCover" legend="Cover options" class="col-span-2">
                        <h4>Cover Options</h4>
                        <TextField v-model="project.publication.cover.stock" name="Cover Stock" class="col-span-2 " placeholder="e.g. 65#c Vellum Bristol Cream"/>
                        <CheckBox v-model="project.publication.cover.outsideInkColors" name="Outside Cover Ink Colors" :options="inkColors" class="col-span-2" multi />
                        <CheckBox v-model="project.publication.cover.isDoubleSided" :options="['Printed Inside Cover?']" is-boolean class="col-span-2" />
                        <transition name="fade">
                            <CheckBox v-if="project.publication.cover.isDoubleSided" v-model="project.publication.cover.insideInkColors" name="Inside Cover Ink Colors" :options="inkColors" class="col-span-2" multi />
                        </transition>
                        <CheckBox v-model="project.publication.cover.isLaminated" :options="['Matte Lamination?']" is-boolean class="col-span-2" />
                    </fieldset>                    
                </transition>
                <fieldset legend="Interior Options" class="col-span-2">
                    <h4>Self-cover / Interior Options</h4>
                    <TextField v-model="project.publication.interior.stock" class="col-span-2 " name="Paper Stock" placeholder="e.g. 70#t Domtar Cougar Natural" />
                    <CheckBox v-model="project.publication.interior.inkColors" name="Ink Colors" :options="inkColors" class="col-span-2" multi />
                    <TextField v-model="project.publication.interior.stock" class="col-span-2 " name="Ink Notes" placeholder="e.g. 2-color throughout OR Aqua on center-fold only, etc." />
                </fieldset>
                <CheckBox v-model="project.isRounded" :options="['Rounded Corners?']" is-boolean class="col-span-2" />
                <transition name="fade">
                    <SelectField v-if="project.isRounded" v-model="project.cornerRadius" :options="['1/4','1/8']" name="Corner Radius" />
                </transition>
            </fieldset>
        </transition>
        <transition name="fade">
            <fieldset legend="Print Specs" v-if="project.type == 'Print'" >
                <h3>Print Specs</h3>
                <TextField v-model="project.print.stock" name="Paper Stock" class="col-span-2" placeholder="e.g. 80#c French Paper Co. Speckletone True White" />
                <CheckBox v-model="project.print.frontInkColors" name="Front Ink Colors" :options="inkColors" class="col-span-2" multi />
                <CheckBox v-model="project.print.isDoubleSided" :options="['Double sided?']" is-boolean class="col-span-2" />
                <transition name="fade">
                    <CheckBox v-if="project.print.isDoubleSided" v-model="project.print.backInkColors" name="Back Ink Colors" :options="inkColors" class="col-span-2" multi />
                </transition>
                <CheckBox v-model="project.isRounded" :options="['Rounded Corners?']" is-boolean class="col-span-2" />
                <transition name="fade">
                    <SelectField v-if="project.isRounded" v-model="project.cornerRadius" :options="['1/4','1/8']" name="Corner Radius" />
                </transition>
            </fieldset>
        </transition>
        <transition name="fade">
            <fieldset legend="Print Specs" v-if="project.type == 'Other'" >
                <h3>Other Project Specs</h3>
                <div class="form-item col-span-2">
                    <label for="Description" aria-label="Description">Description</label>
                    <textarea v-model="project.other.description" name="Description" placeholder="Please describe youe project thoroughly" />
                </div>
                <CheckBox v-model="project.other.inkColors" name="Ink Colors" :options="inkColors" class="col-span-2" multi />
                <CheckBox v-model="project.isRounded" :options="['Rounded Corners?']" is-boolean class="col-span-2" />
                <transition name="fade">
                    <SelectField v-if="project.isRounded" v-model="project.cornerRadius" :options="['1/4','1/8']" name="Corner Radius" />
                </transition>
            </fieldset>
        </transition>
        <fieldset>
            <h3>Final Details</h3>
            <div class="form-item col-span-2">
                <label for="file">Sample Image</label>
                <input name="file" type="file"/>
            </div>
            <div class="form-item col-span-2">
                <label for="Notes / Additional info" aria-label="Notes / Additional info">Description</label>
                <textarea v-model="project.other.description" name="Notes / Additional info" placeholder="..." />
            </div>
            <TextField v-model="project.dueDate" name="Due Date" type="date"/>
            <SelectField v-model="project.delivery.type" :options="['Local pickup in Grand Rapids, MI','Ship']" name="Delivery" />
            <transition name="fade">
                <div v-if="project.delivery.type == 'Ship'" class="form-item col-span-2">
                    <label for="Address" aria-label="Address">Address</label>
                    <textarea v-model="project.delivery.address" name="Address" rows="3" placeholder="Issue Press&#10;314 Straight SW&#10;Grand Rapids, MI &#10;" class="whitespace-pre-wrap" />
                </div>            
            </transition>
            <TextField v-model="project.experience" name="Describe your experience with Riso Printing" class="col-span-2" placeholder="..."/>
            <TextField v-model="project.referral" name="How'd You Find us?" class="col-span-2" placeholder="Funny story, actually..."/>
        </fieldset>
        <div class="flex flex-col md:flex-row justify-center md:justify-between w-full items-center py-4">
            <h3 class="py-2">Phew... You made it to the end!</h3>
            <input type="submit" value="Submit" class="submit-button">
        </div>
    </form>

</template>
<script setup lang="ts">
    import { ref, toRefs } from 'vue';

    const inkColors = ['aqua','black','blue','burgundy','copper','coral','cornflower','flat-gold','fluorescent-orange','fluorescent-pink','fluorescent-red','fluorescent-yellow','green','kelly-green','light-gray','metallic-gold','mint','moss','orange','orchid','risofederal-blue','scarlet','sunflower','white','yellow'];

    const project = ref({
        name: null,
        submitterName: null,
        submitterEmail: null,
        experience: null,
        notes: null,
        type: null,
        quantity: 100,
        isRounded: false,
        cornerRadius: null,
        dueDate: null,
        delivery: {
            type: null,
            address: null,
        },
        publication: {
            finishedSize: '5 x 7',
            pages: 16,
            binding: {
                type: 'Staple',
                stapleColor: 'Silver',
                color: null,
                roundedCorners: null,
            },
            cover: {
                plusCover: false,
                isDoubleSided: false,
                isLaminated: false,
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
            backInkColors: [],
            frontInkColors: [],
            isDoubleSided: false,
            scores: null,
            stock: null,
        },
        other: {
            description: null,
            inkColors: [],

        }

    });

</script>