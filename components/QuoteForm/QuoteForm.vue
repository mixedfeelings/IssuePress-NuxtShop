<template>
    <form 
        name="Quotes" 
        @submit.prevent="handleSubmit()"
        class="flex flex-col pb-6"
    >
        <div  class="flex justify-center w-full">
            <ConfettiExplosion 
                v-if="explodeVisible"
                :colors="['var(--color-yellow)','var(--color-scarlet)','var(--color-blue)','var(--color-kelly-green)','var(--color-fluorescent-pink)']"
            />
        </div>
        <ul v-if="errors.length > 0" class="errors-box p-4 border">
            <li v-for="error in errors">
                {{error}}
            </li>
        </ul>
        {{SuccessMessage}}
        

        <input type="hidden" name="form-name" value="Quotes" />
        <input value="/printing/request-quote" name="location" type="hidden" />

          <p class="hidden">
            <label>
            Don’t fill this out if you’re human: <input name="bot-field" v-model="formData.botField"/>
            </label>
        </p>

        <fieldset legend="Basic Info">
            <h3>Basic Info</h3>
            <TextField v-model="formData.name" name="Project Name" required class="col-span-2" placeholder="My kickass zine, print, or whatever!" />
            <TextField v-model="formData.submitterName" name="Your Name" placeholder="Noboru Hayama" required />
            <TextField v-model="formData.submitterEmail" name="Your Email" placeholder="info@issue.press" required />
            <SelectField v-model="formData.type" :options="projectTypes" name="Project Type" required />   
            <SelectField v-model="formData.quantity" :options="quantityOptions" name="Quantity" />
            <transition name="fade">
                <TextField v-if="formData.quantity== 'Other'" v-model="formData.otherQuantity" name="Other Quantity" placeholder="4 Billion... JKJKJK!" required class="col-span-2" />
            </transition>
        </fieldset>
        <transition name="fade">
            <fieldset legend="Publication Specs" v-if="formData.type == 'Publication'">
                <h3>Publication Specs</h3>
                <TextField v-model="formData.publicationPages" name="Pages" type="number" :step="4" required />
                <SelectField v-model="formData.publicationFinishedSize" :options="publicationSizes" name="Finished Size" required />
                <transition name="fade">
                    <TextField v-if="formData.publicationFinishedSize== 'Other'" v-model="formData.publicationOtherSize" name="Other Size" required class="col-span-2" />
                </transition>
                <SelectField v-model="formData.publicationBindingType" :options="bindingTypes" name="Binding Type" required />
                <div>
                    <TextField v-if="formData.publicationBindingType == 'Wire-O' || formData.publicationBindingType == 'Spiral' " v-model="formData.publicationBindingColor" name="Color" placeholder="Enter your preferred color" required />
                    <SelectField v-if="formData.publicationBindingType == 'Saddle Stitch (Staple)'" v-model="formData.publicationBindingColor" :options="stapleColor" name="Color" required />
                </div>
                <CheckBox v-model:checked="formData.publicationCoverPlusCover" label="Seperate Cover?" field-id="plusCover" class="col-span-2" />
                <transition name="fade">
                    <fieldset v-if="formData.publicationCoverPlusCover" legend="Cover options" class="col-span-2">
                        <h4>Cover Options</h4>
                        <TextField v-model="formData.publicationCoverStock" name="Cover Stock" class="col-span-2 " placeholder="e.g. 65#c Vellum Bristol Cream" required/>
                        <MultiCheckBox v-model:value="formData.publicationCoverOutsideInkColors" name="Outside Cover Ink Colors" :options="inkColors" class="col-span-2" color required />
                        <CheckBox v-model:checked="formData.publicationCoverIsDoubleSided" label="Printed Inside Cover?" field-id="insideCover" class="col-span-2" />
                        <transition name="fade">
                            <MultiCheckBox v-if="formData.publicationCoverIsDoubleSided" v-model:value="formData.publicationCoverInsideInkColors" name="Inside Cover Ink Colors" :options="inkColors" class="col-span-2" color required />
                        </transition>
                        <CheckBox v-model:checked="formData.publicationCoverIsLaminated" label="Matte lamination?" field-id="lamination" class="col-span-2" />
                    </fieldset>                    
                </transition>
                <fieldset legend="Interior Options" class="col-span-2">
                    <h4>Self-cover / Interior Options</h4>
                    <TextField v-model="formData.publicationInteriorStock" class="col-span-2 " name="Paper Stock" placeholder="e.g. 70#t Domtar Cougar Natural" required />
                    <MultiCheckBox v-model:value="formData.publicationInteriorInkColors" name="Ink Colors" :options="inkColors" class="col-span-2" required color />
                    <TextField v-model="formData.publicationInteriorInkNotes" class="col-span-2 " name="Ink Notes" placeholder="e.g. 2-color throughout OR Aqua on center-fold only, etc." />
                </fieldset>
                <CheckBox v-model:checked="formData.isRounded" label="Rounded Corners?" field-id="roundedCorners" class="col-span-2" />
                <transition name="fade">
                    <SelectField v-if="formData.isRounded" v-model="formData.cornerRadius" :options="cornerRadii" name="Corner Radius" />
                </transition>
            </fieldset>
        </transition>
        <transition name="fade">
            <fieldset legend="Print Specs" v-if="formData.type == 'Print'" >
                <h3>Print Specs</h3>
                <TextField v-model="formData.printStock" name="Paper Stock" class="col-span-2" placeholder="e.g. 80#c French Paper Co. Speckletone True White" required />
                <SelectField v-model="formData.printFinishedSize" :options="printSizes" name="Finished Size" required />
                <transition name="fade">
                    <TextField v-if="formData.printFinishedSize== 'Other'" v-model="formData.printOtherSize" name="Other Size" required />
                </transition>
                <MultiCheckBox v-model:value="formData.printFrontInkColors" name="Front Ink Colors" :options="inkColors" required color />
                <CheckBox v-model:checked="formData.printIsDoubleSided" label="Double Sided?" field-id="doubleSided" class="col-span-2" />
                <transition name="fade">
                    <MultiCheckBox v-if="formData.printIsDoubleSided" v-model:value="formData.printBackInkColors" name="Back Ink Colors" :options="inkColors" class="col-span-2" color required />
                </transition>
                <CheckBox v-model:checked="formData.isRounded" label="Rounded Corners?" field-id="roundedCorners" class="col-span-2" />
                <transition name="fade">
                    <SelectField v-if="formData.isRounded" v-model="formData.cornerRadius" :options="cornerRadii" name="Corner Radius" />
                </transition>
            </fieldset>
        </transition>
        <transition name="fade">
            <fieldset legend="Other Specs" v-if="formData.type == 'Other'" >
                <h3>Other Project Specs</h3>
                <div class="form-item col-span-2">
                    <label for="Description" aria-label="Description">Description <span class="required">*</span></label>
                    <textarea v-model="formData.otherDescription" name="Description" placeholder="Please describe your project thoroughly" required />
                </div>
                <MultiCheckBox v-model:value="formData.otherInkColors" name="Ink Colors" :options="inkColors" class="col-span-2" required color />
                <CheckBox v-model:checked="formData.isRounded" label="Rounded Corners?" field-id="roundedCorners" class="col-span-2" />
                <transition name="fade">
                    <SelectField v-if="formData.isRounded" v-model="formData.cornerRadius" :options="cornerRadii" name="Corner Radius" />
                </transition>
            </fieldset>
        </transition>
        <fieldset>
            <h3>Final Details</h3>
            <TextField v-model="formData.sampleLink" name="Sample Image Link" class="col-span-2" placeholder="https://... File hosted on DropBox, Google Drive, WeTransfer, etc." />
            <div class="form-item col-span-2">
                <label for="additionalNotes" aria-label="Notes / Additional info">Additional Notes / Further Description</label>
                <textarea v-model="formData.notes" name="additionalNotes" placeholder="..." ></textarea>
            </div>
            <TextField v-model="formData.dueDate" name="Due Date" type="date" required/>
            <SelectField v-model="formData.deliveryType" :options="deliveryType" name="Delivery" required />
            <transition name="fade">
                <div v-if="formData.deliveryType == 'Ship'" class="form-item col-span-2">
                    <label for="Address" aria-label="Address">Address</label>
                    <textarea v-model="formData.deliveryAddress" name="Address" rows="3" placeholder="Issue Press&#10;314 Straight SW&#10;Grand Rapids, MI &#10;" class="whitespace-pre-wrap" />
                </div>            
            </transition>
            <TextField v-model="formData.experience" name="Describe your experience with Riso Printing" class="col-span-2" placeholder="..."/>
            <TextField v-model="formData.referral" name="How'd You Find us?" class="col-span-2" placeholder="Funny story, actually..."/>
        </fieldset>
        <div class="flex flex-col md:flex-row justify-center md:justify-between w-full items-center py-4">
            <h3 class="py-2">Phew... You made it to the end!</h3>
            <input type="submit" value="Submit" class="submit-button">
        </div>
    </form>

</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import ConfettiExplosion from "vue-confetti-explosion";

    const errors = ref([]);
    const SuccessMessage = ref(null);
    const explodeVisible = ref(false);

    const projectTypes = ref([
        {name: 'Publication', id:'publication'},
        {name: 'Print', id:'print'},
        {name: 'Other', id:'other'},
    ])

    const quantityOptions = ref([
        {name: '50', id:'50'},
        {name: '100', id:'100'},
        {name: '250', id:'250'},
        {name: '500', id:'500'},
        {name: 'Other', id:'other'},
    ])

    const inkColors = ref([
        {name: "Black", id:"black", postLabel: "$"},
        {name: "Light Gray", id:"light-gray", postLabel: "$"},
        {name: "Burgundy", id:"burgundy", postLabel: "$"},
        {name: "Orchid", id:"orchid", postLabel: "$"},
        {name: "RISO-Federal Blue", id:"risofederal-blue", postLabel: "$"},
        {name: "Blue", id:"blue", postLabel: "$"},
        {name: "Cornflower", id:"cornflower", postLabel: "$"},
        {name: "Aqua", id:"aqua", postLabel: "$$"},
        {name: "Mint", id:"mint", postLabel: "$$"},
        {name: "Light Teal", id:"light-teal", postLabel: "$"},
        {name: "Kelly Green", id:"kelly-green", postLabel: "$"},
        {name: "Green", id:"green", postLabel: "$"},
        {name: "Moss", id:"moss", postLabel: "$"},
        {name: "Brown", id:"brown", postLabel: "$"},
        {name: "Copper", id:"copper", postLabel: "$"},
        {name: "Flat Gold", id:"flat-gold", postLabel: "$"},
        {name: "Metallic Gold", id:"metallic-gold", postLabel: "$$$"},
        {name: "Yellow", id:"yellow", postLabel: "$"},                
        {name: "Fluorescent Yellow", id:"fluorescent-yellow", postLabel: "$$$"},
        {name: "Sunflower", id:"sunflower", postLabel: "$"},
        {name: "Orange", id:"orange", postLabel: "$"},
        {name: "Fluorescent Orange", id:"fluorescent-orange", postLabel: "$$"},
        {name: "Coral", id:"coral", postLabel: "$$"},
        {name: "Scarlet", id:"scarlet", postLabel: "$"},
        {name: "Fluorescent Red", id:"fluorescent-red", postLabel: "$$$"},     
        {name: "Fluorescent Pink", id:"fluorescent-pink", postLabel: "$"},
        {name: "White", id:"white", postLabel: "$$"},
    ]);

    const printSizes = ref([
        {name: '11" x 17" (no bleed)', id:'11x17'},
        {name: '11" x 11" (no bleed)', id:'11x11'},
        {name: '10" x 15"', id:'10x15'},
        {name: '9" x 12"', id:'9x12'}, 
        {name: '8" x 10"', id:'8x10'},
        {name: '8" x 8"', id:'8x8'},
        {name: '7" x 7"', id:'7x7'}, 
        {name: '5" x 7"', id:'5x7'},          
        {name: '4" x 6"', id:'4x6'},
        {name: 'Other', id:'other'} 
    ]);

    const publicationSizes = ref([
        {name: '4" x 5"', id:'4x5'},
        {name: '5" x 7"', id:'5x7'},
        {name: '5" x 8"', id:'5x8'},
        {name: '7" x 10"', id:'7x10'}, 
        {name: '8" x 10"', id:'8x10'},
        {name: 'Other', id:'other'} 
    ]);

    const cornerRadii = ref([
        {name: '1/4"', id:'1/4'},
        {name: '1/8"', id:'1/8'},
    ]);

    const bindingTypes = ref([
        {name: 'Saddle Stitch (Staple)', id:'staple'},
        {name: 'Perfect (Soft-cover)', id:'perfect'},
        {name: 'Wire-O', id:'wire-o'},
        {name: 'Spiral', id:'spiral'}, 
        {name: 'Comb', id:'comb'},
        {name: 'None', id:'none'},
    ]);

    const stapleColor = ref([
            {id:'silver', name:'Silver', color:'#939c9a'},
            {id:'flatGold',name:'Flat Gold', color:'#a98f5e'},
            {id:'black', name:'Black', color:'#272727'},
            {id:'red', name:'Red', color:'#dc1306'},
            {id:'orange', name:'Orange', color:'#fe5f00'},
            {id:'yellow',name:'Yellow', color:'#f3da6f'},
            {id:'green', name:'Green', color:'#02b32a'},
            {id:'blue', name:'Blue', color:'#015a95'},
            {id:'pink', name:'Pink', color:'#f15786'},
    ]);

    const deliveryType = ref([
        {name: 'Local pickup in Grand Rapids, MI', id:'pickup'},
        {name: 'Ship', id:'ship'},
    ]);
    
    
    const formData = ref({
        botField: null,
        name: null,
        submitterName: null,
        submitterEmail: null,
        type: null,
        quantity: 100,
        otherQuantity: null,
        isRounded: false,
        cornerRadius: null,
        dueDate: null,
        publicationFinishedSize: '5" x 7"',
        publicationOtherSize: null,
        publicationPages: 16,
        publicationBindingType: 'Saddle Stitch (Staple)',
        publicationBindingColor: null,
        publicationCoverPlusCover: false,
        publicationCoverIsDoubleSided: false,
        publicationCoverIsLaminated: false,
        publicationCoverOutsideInkColors: [],
        publicationCoverInsideInkColors: [],
        publicationCoverStock: null,
        publicationInteriorStock: null,
        publicationInteriorInkColors: [],
        publicationInteriorInkNotes: null,
        printFinishedSize: '10" x 15"',
        printOtherSize: null,
        printIsDoubleSided: false,
        printFrontInkColors: [],
        printBackInkColors: [],
        printStock: null,
        printScores: 0,
        otherDescription: null,
        otherInkColors: [],
        sampleLink: null,
        notes: null,
        deliveryType: null,
        deliveryAddress: null,
        experience: null,
        referral: null,
    });

    function encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    }
    

    function checkform() {

        this.errors = [];
        if (this.formData.botField) {
            this.errors.push("Only robots can fill out this field. Are you a robot?");
        }
        if (!this.formData.name) {
            this.errors.push("Project Name is required.");
        }
        if (!this.formData.submitterName) {
            this.errors.push("Your Name is required.");
        }
        if (!this.formData.submitterEmail) {
            this.errors.push("Your Email is required.");
        } else if (!validEmail(this.formData.submitterEmail)) {
            this.errors.push(`${this.formData.submitterEmail} is not a valid Email.`)
        }
        if (!this.formData.type) {
            this.errors.push("Project Type is required.");
        }
        if (this.formData.quantity == 'Other' && !this.formData.otherQuantity) {
            this.errors.push("Other Quantity is required.")
        }
        if (this.formData.type == 'Print') {
            if (this.formData.printFinishedSize == 'Other' && !this.formData.printOtherSize) {
                this.errors.push("Other Size is required.")
            }
            if (!this.formData.printStock) {
                this.errors.push("Print Stock is required.");
            }
            if (this.formData.printFrontInkColors.length == 0 ) {
                this.errors.push("Print Front Ink Colors is required.");
            }
            if (this.formData.printIsDoubleSided == true &&  this.formData.printBackInkColors.length == 0) {
                this.errors.push("Print Back Ink Colors is required.");
            }
        }
        if (this.formData.type == 'Publication') {
            if ((this.formData.publicationBindingType == 'Saddle Stitch (Staple)' && !this.formData.publicationBindingColor ) || (this.formData.publicationBindingType == 'Wire-O' && !this.formData.publicationBindingColor ) || (this.formData.publicationBindingType == 'Spiral' && !this.formData.publicationBindingColor) )  {
                this.errors.push("Publication Binding Color is required")
            }
            if (this.formData.publicationFinishedSize == 'Other' && !this.formData.publicationOtherSize) {
                this.errors.push("Other Size is required.")
            }
            if (this.formData.publicationCoverPlusCover) {
                if (!this.formData.publicationCoverStock) {
                    this.errors.push("Publication Cover Stock is required");
                }
                if (this.formData.publicationCoverOutsideInkColors.length == 0) {
                    this.errors.push("Publication Outside Cover Ink Colors is required");
                }
                if (this.formData.publicationCoverIsDoubleSided && this.formData.publicationCoverOutsideInkColors == 0) {
                    this.errors.push("Publication Inside Cover Ink Colors is required");
                }
            }
            if (!this.formData.publicationInteriorStock) {
                this.errors.push("Publication Interior Paper Stock is required");
            }
            if (this.formData.publicationInteriorInkColors.length == 0) {
                this.errors.push("Publication Interior Ink Colors is required");
            }
        }
        if (this.formData.type == 'Other') {
            if (!this.formData.otherDescription) {
                this.errors.push("Other Project Description is required");
            }
            if (this.formData.otherInkColors.length == 0) {
                this.errors.push("Other Ink Colors is required");
            }
        }   
        if (!this.formData.dueDate) {
            this.errors.push("Due Date is required.");
        }
        if (!this.formData.deliveryType) {
            this.errors.push("Delivery Method is required.");
        }
        if (this.formData.deliveryType == 'Ship' && !this.formData.deliveryAddress) {
            this.errors.push("Delivery Address is required.");
        }
    }

    function validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }


    const explode = async () => {
        explodeVisible.value = false;
        await nextTick();
        setTimeout(() => explodeVisible.value = true, 250);
    };

    function handleSubmit () {
        this.checkform();
        if (this.errors.length == 0) {
            // Must post to a path not handled by the SSR.
            // Path must exist
            fetch('/printing/submit-quote', {
                method: "POST",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                },
                body: this.encode({
                "form-name": "Quotes",
                ...this.formData
                }),
            })
            .then(() => this.SuccessMessage = "Thank you! Your Quote request has been submitted!")
            .catch((err) => this.SuccessMessage = `Error: %s ${err}`)
            .finally(() => {
                console.log("formData: %s", JSON.stringify(this.formData))
                // console.log(this.encode(this.formData))
                window.scrollTo(0,0);
                explode();

            })
        } else {
            window.scrollTo(0,0);
        }
    }






</script>