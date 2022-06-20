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
            ></ConfettiExplosion>
        </div>
        <ul v-if="errors.length > 0" class="errors-box p-4 border">
            <li v-for="error in errors" :key="error">
                {{error}}
            </li>
        </ul>
        {{SuccessMessage}}

        <input type="hidden" name="form-name" value="Quotes" >
        <input value="/printing/request-quote" name="location" type="hidden" >

          <p class="hidden">
            <label>
            Don’t fill this out if you’re human: <input name="bot-field" v-model="quote.botField">
            </label>
        </p>

        <fieldset legend="Basic Info">
            <h3>Basic Info</h3>
            <TextField v-model="quote.name" name="Project Name" required class="col-span-2" placeholder="My kickass zine, print, or whatever!" ></TextField>
            <TextField v-model="quote.submitter.name" name="Your Name" placeholder="Noboru Hayama" required ></TextField>
            <TextField v-model="quote.submitter.email" name="Your Email" placeholder="info@issue.press" required ></TextField>
            <SelectField v-model="quote.type" :options="ProjectTypeOptions" name="Project Type" required ></SelectField>   
            <SelectField v-model="quote.quantity" :options="QuantityOptions" name="Quantity" ></SelectField>
            <transition name="fade">
                <TextField v-if="quote.quantity == 'Other'" v-model="quote.otherQuantity" name="Other Quantity" placeholder="4 Billion... JKJKJK!" required class="col-span-2" ></TextField>
            </transition>
        </fieldset>
        <transition name="fade">
            <fieldset legend="Placeholder" v-if="!quote.type">
                <h3>Project Specs</h3>
                <p>Please Select a Project Type.</p>
            </fieldset>
        </transition>
        <transition name="fade">
            <fieldset legend="Publication Specs" v-if="quote.type == 'Publication'">
                <h3>Publication Specs</h3>
                <TextField v-model="quote.publication.pages" name="Pages" type="number" :step="4" required ></TextField>
                <SelectField v-model="quote.publication.finishedSize" :options="PublicationSizeOptions" name="Finished Size" required ></SelectField>
                <transition name="fade">
                    <TextField v-if="quote.publication.finishedSize == 'Other'" v-model="quote.publication.otherSize" name="Other Size" required class="col-span-2" ></TextField>
                </transition>
                <SelectField v-model="quote.publication.binding.type" :options="BindingTypeOptions" name="Binding Type" required ></SelectField>
                <div>
                    <TextField v-if="quote.publication.binding.type == 'Wire-O' || quote.publication.binding.type == 'Spiral' " v-model="quote.publication.binding.color" name="Color" placeholder="Enter your preferred color" required ></TextField>
                    <SelectField v-if="quote.publication.binding.type == 'Staple'" v-model="quote.publication.binding.stapleColor" :options="StapleColorOptions" name="Color" required ></SelectField>
                </div>
                <CheckBox v-model:checked="quote.publication.cover.plusCover" label="Seperate Cover?" field-id="plusCover" class="col-span-2" ></CheckBox>
                <transition name="fade">
                    <fieldset v-if="quote.publication.cover.plusCover" legend="Cover options" class="col-span-2">
                        <h4>Cover Options</h4>
                        <PaperSelector v-model:value="quote.publication.cover.stock" type="cover" name="Cover Stock" required class="col-span-2"></PaperSelector>
                        <MultiCheckBox v-model:value="quote.publication.cover.outsideInkColors" name="Outside Cover Ink Colors" :options="InkList" class="col-span-2" color required ></MultiCheckBox>
                        <CheckBox v-model:checked="quote.publication.cover.isDoubleSided" label="Printed Inside Cover?" field-id="insideCover" class="col-span-2" ></CheckBox>
                        <transition name="fade">
                            <MultiCheckBox v-if="quote.publication.cover.isDoubleSided" v-model:value="quote.publication.cover.insideInkColors" name="Inside Cover Ink Colors" :options="InkList" class="col-span-2" color required ></MultiCheckBox>
                        </transition>
                        <CheckBox v-model:checked="quote.publication.cover.isLaminated" label="Matte lamination?" field-id="lamination" class="col-span-2" ></CheckBox>
                    </fieldset>                    
                </transition>
                <fieldset legend="Interior Options" class="col-span-2">
                    <h4>Self-cover / Interior Options</h4>
                    <PaperSelector v-model:value="quote.stock" type="text" name="Paper Stock" required class="col-span-2"></PaperSelector>
                    <MultiCheckBox v-model:value="quote.inkColors" name="Ink Colors" :options="InkList" class="col-span-2" required color ></MultiCheckBox>
                    <TextField v-model="quote.publication.interior.inkNotes" class="col-span-2 " name="Ink Notes" placeholder='e.g. "Aqua on center-fold only," etc.' ></TextField>
                </fieldset>
                <CheckBox v-model:checked="quote.isRounded" label="Rounded Corners?" field-id="roundedCorners" class="col-span-2" ></CheckBox>
                <transition name="fade">
                    <SelectField v-if="quote.isRounded" v-model="quote.cornerRadius" :options="CornerRadiiOptions" name="Corner Radius" ></SelectField>
                </transition>
            </fieldset>
        </transition>
        <transition name="fade">
            <fieldset legend="Print Specs" v-if="quote.type == 'Print'" >
                <h3>Print Specs</h3>
                <PaperSelector v-model:value="quote.stock" name="Paper Stock" required class="col-span-2"></PaperSelector>
                <SelectField v-model="quote.print.size" :options="PrintSizeOptions" name="Finished Size" required ></SelectField>
                <div>
                    <transition name="fade">
                        <TextField v-if="quote.print.size == 'Other'" v-model="quote.print.otherSize" name="Other Size" required ></TextField>
                    </transition>
                </div>
                <MultiCheckBox v-model:value="quote.inkColors" name="Ink Colors" :options="InkList" required color class="col-span-2" ></MultiCheckBox>
                <CheckBox v-model:checked="quote.print.isDoubleSided" label="Double Sided?" field-id="doubleSided" class="col-span-2" ></CheckBox>
                <transition name="fade">
                    <MultiCheckBox v-if="quote.print.isDoubleSided" v-model:value="quote.print.backInkColors" name="Back Ink Colors" :options="InkList" class="col-span-2" color required ></MultiCheckBox>
                </transition>
                <CheckBox v-model:checked="quote.isRounded" label="Rounded Corners?" field-id="roundedCorners" class="col-span-2" ></CheckBox>
                <transition name="fade">
                    <SelectField v-if="quote.isRounded" v-model="quote.cornerRadius" :options="CornerRadiiOptions" name="Corner Radius" ></SelectField>
                </transition>
            </fieldset>
        </transition>
        <transition name="fade">
            <fieldset legend="Other Specs" v-if="quote.type == 'Other'" >
                <h3>Other Project Specs</h3>
                <div class="form-item col-span-2">
                    <label for="Description" aria-label="Description">Description <span class="required">*</span></label>
                    <textarea v-model="quote.other.description" name="Description" placeholder="Please describe your project thoroughly" required ></textarea>
                </div>
                <PaperSelector v-model:value="quote.stock" name="Paper Stock" required class="col-span-2"></PaperSelector>
                <MultiCheckBox v-model:value="quote.inkColors" name="Ink Colors" :options="InkList" class="col-span-2" required color ></MultiCheckBox>
                <CheckBox v-model:checked="quote.isRounded" label="Rounded Corners?" field-id="roundedCorners" class="col-span-2" ></CheckBox>
                <transition name="fade">
                    <SelectField v-if="quote.isRounded" v-model="quote.cornerRadius" :options="CornerRadiiOptions" name="Corner Radius" ></SelectField>
                </transition>
            </fieldset>
        </transition>
        <fieldset>
            <h3>Final Details</h3>
            <TextField v-model="quote.sampleLink" name="Sample Image Link" class="col-span-2" placeholder="https://... File hosted on DropBox, Google Drive, WeTransfer, etc." ></TextField>
            <div class="form-item col-span-2">
                <label for="additionalNotes" aria-label="Notes / Additional info">Additional Notes / Further Description</label>
                <textarea v-model="quote.notes" name="additionalNotes" placeholder="..." ></textarea>
            </div>
            <TextField v-model="quote.dueDate" name="Due Date" type="date" required ></TextField>
            <SelectField v-model="quote.delivery.type" :options="DeliveryTypeOptions" name="Delivery" required ></SelectField>
            <transition name="fade">
                <div v-if="quote.delivery.type == 'Ship'" class="form-item col-span-2">
                    <label for="Address" aria-label="Address" >Address <span class="required">*</span></label>
                    <textarea v-model="quote.delivery.address" name="Address" rows="3" placeholder="Issue Press&#10;314 Straight SW&#10;Grand Rapids, MI" class="whitespace-pre-wrap" ></textarea>
                </div>            
            </transition>
            <TextField v-model="quote.experience" name="Describe your experience with Riso printing" class="col-span-2" placeholder="..." ></TextField>
            <TextField v-model="quote.referral" name="How'd You Find Issue Press?" class="col-span-2" placeholder="Funny story, actually..." ></TextField>
        </fieldset>

        <QuoteFormDescription v-model:value="quote.projectDescription" :fields="quote"></QuoteFormDescription>
        <CheckBox v-model:checked="quote.confirmSummary" label="Please confirm the accuracy of this description" field-id="confirmSummary" class="col-span-2" ></CheckBox>
   
        <div class="flex flex-col md:flex-row justify-center md:justify-between w-full items-center py-4">
            <h3 class="py-2">Phew... You made it to the end!</h3>
            <input type="submit" value="Submit" class="submit-button">
        </div>
    </form>

</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import { InkList, ProjectTypeOptions, QuantityOptions, PrintSizeOptions, PublicationSizeOptions, CornerRadiiOptions, BindingTypeOptions, StapleColorOptions, DeliveryTypeOptions } from "~/constants"
    import ConfettiExplosion from "vue-confetti-explosion";

    const errors = ref([]);
    const SuccessMessage = ref("");
    const explodeVisible = ref(false);
    
    const quote = ref({
        botField: "",
        name: "",
        submitter: {
            name: "",
            email: "",
        },
        type: "",
        quantity: '100',
        otherQuantity: "",
        isRounded: false,
        cornerRadius: "",
        dueDate: "",
        stock: "",
        inkColors: [],
        publication: {
            finishedSize: '5" x 7"',
            otherSize: "",
            pages: 16,
            binding: {
                type: 'Staple',
                stapleColor: 'Silver',
                color: "",
            },
            cover: {
                plusCover: false,
                isDoubleSided: false,
                isLaminated: false,
                stock: "",
                outsideInkColors: [],
                insideInkColors: [],
            },
            interior: {
                inkNotes: "",
            },
        },
        print: {
            size: '10" x 15"',
            otherSize: "",
            isDoubleSided: "",
            backInkColors: [],
            scores: 0,
        },
        other: {
            description: "",
        },
        sampleLink: "",
        notes: "",
        delivery: {
            type: "",
            address: "",
        },
        experience: "",
        referral: "",
        projectDescription: "",
        confirmSummary: false,
    });

    const formData = ref({ 
        name: "",
        email: "",
        projectName: "",
        projectDescription: "",
        type: "",
        quantity: "",
        finishedSize: "",
        paperStock: "", 
        inkColors: "",
        pages: "",
        coverStock: "",
        coverOutsideInkColors: "",
        coverInsideInkColors: "",
        laminated: "",
        interiorInkNotes: "",
        bindingType: "",
        bindingColor: "",
        printBackInkColors: "",
        otherDescription: "",
        cornerRadius: "",
        sampleLink: "",
        notes: "",
        dueDate: "",
        deliveryType: "",
        deliveryAddress: "",
        experience: "",
        referral: ""
    });

    function setFormData() {
        formData.value.name = quote.value.submitter.name;
        formData.value.email = quote.value.submitter.email;
        formData.value.projectName = quote.value.name;
        formData.value.projectDescription = quote.value.projectDescription;
        formData.value.type = quote.value.type;
        if (quote.value.otherQuantity) {
            formData.value.quantity = quote.value.otherQuantity; 
        } else {
            formData.value.quantity = quote.value.quantity;
        }
        formData.value.paperStock = quote.value.stock;
        formData.value.inkColors = quote.value.inkColors.join(', ');
        formData.value.interiorInkNotes = quote.value.publication.interior.inkNotes;
        if (quote.value.type == "Publication") {
            formData.value.pages = quote.value.publication.pages.toString();
            if (quote.value.publication.otherSize) {
                formData.value.finishedSize = quote.value.publication.otherSize; 
            } else {
                formData.value.finishedSize = quote.value.publication.finishedSize;
            }
            if (quote.value.publication.cover.plusCover) {
                formData.value.coverStock = quote.value.publication.cover.stock;
                formData.value.coverOutsideInkColors = quote.value.publication.cover.outsideInkColors.join(', ');
                if (quote.value.publication.cover.isDoubleSided) {
                    formData.value.coverInsideInkColors = quote.value.publication.cover.insideInkColors.join(', ');
                }
                formData.value.laminated = quote.value.publication.cover.isLaminated.toString();
            }
            formData.value.bindingType = quote.value.publication.binding.type;
            if (quote.value.publication.binding.type == "Wire-O" || quote.value.publication.binding.type == "Spiral") {
                formData.value.bindingColor = quote.value.publication.binding.color; 
            } else if (quote.value.publication.binding.type == "Staple") {
                formData.value.bindingColor = quote.value.publication.binding.stapleColor;
            }
        }
        if (quote.value.type == "Print") {
            if (quote.value.print.size == "Other" && quote.value.print.otherSize) {
                formData.value.finishedSize = quote.value.print.otherSize; 
            } else {
                formData.value.finishedSize = quote.value.print.size;
            }
            if (quote.value.print.isDoubleSided) {
                formData.value.printBackInkColors = quote.value.print.backInkColors.join(', ');
            }
        }
        if (quote.value.type == "Other") {
            formData.value.otherDescription = quote.value.other.description;
        }
        if (quote.value.isRounded) {
            formData.value.cornerRadius = quote.value.cornerRadius;
        }
        formData.value.sampleLink = quote.value.sampleLink;
        formData.value.notes = quote.value.notes;
        formData.value.dueDate = quote.value.dueDate;
        formData.value.deliveryType = quote.value.delivery.type
        if (quote.value.delivery.type == "Ship") {
            formData.value.deliveryAddress = quote.value.delivery.address;
        }
        formData.value.experience = quote.value.experience;
        formData.value.referral = quote.value.referral;
    }

    function encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    }

    function checkform() {
        this.errors = [];
        if (this.quote.botField) {
            this.errors.push("Only robots can fill out this field. Are you a robot?");
        }
        if (!this.quote.name) {
            this.errors.push("Project Name is required.");
        }
        if (!quote.value.submitter.name) {
            this.errors.push("Your Name is required.");
        }
        if (!this.quote.submitter.email) {
            this.errors.push("Your Email is required.");
        } else if (!validEmail(this.quote.submitter.email)) {
            this.errors.push(`${this.quote.submitter.email} is not a valid Email.`)
        }
        if (!this.quote.type) {
            this.errors.push("Project Type is required.");
        }
        if (this.quote.quantity == 'Other' && !this.quote.otherQuantity) {
            this.errors.push("Other Quantity is required.")
        }
        if (!this.quote.stock) {
            this.errors.push("Paper Stock is required.");
        }
        if (this.quote.inkColors.length == 0) {
            this.errors.push("Ink Colors is required.");
        }
        if (this.quote.type == 'Print') {
            if (this.quote.print.size == 'Other' && !this.quote.print.otherSize) {
                this.errors.push("Other Size is required.")
            }
            if (this.quote.print.isDoubleSided == true && this.quote.print.backInkColors.length == 0) {
                this.errors.push("Print Back Ink Colors is required.");
            }
        }
        if (this.quote.type == 'Publication') {
            if ((this.quote.publication.bindingType == 'Staple' && !this.quote.publication.stapleColor ) || (this.quote.publication.bindingType == 'Wire-O' && !this.quote.publication.bindingColor ) || (this.quote.publication.bindingType == 'Spiral' && !this.quote.publication.bindingColor) )  {
                this.errors.push("Publication Binding Color is required")
            }
            if (this.quote.publicationFinishedSize == 'Other' && !this.quote.publication.otherSize) {
                this.errors.push("Other Size is required.")
            }
            if (this.quote.publication.cover.plusCover) {
                if (!this.quote.publication.cover.stock) {
                    this.errors.push("Publication Cover Stock is required");
                }
                if (this.quote.publication.cover.outsideInkColors.length == 0) {
                    this.errors.push("Publication Outside Cover Ink Colors is required");
                }
                if (this.quote.publication.cover.isDoubleSided && this.quote.publication.cover.outsideInkColors == 0) {
                    this.errors.push("Publication Inside Cover Ink Colors is required");
                }
            }
        }
        if (this.quote.type == 'Other') {
            if (!this.quote.other.description) {
                this.errors.push("Other Project Description is required");
            }
        }   
        if (!this.quote.dueDate) {
            this.errors.push("Due Date is required.");
        }
        if (!this.quote.delivery.type) {
            this.errors.push("Delivery Method is required.");
        }
        if (this.quote.delivery.type == 'Ship' && !this.quote.delivery.address) {
            this.errors.push("Delivery Address is required.");
        }
        if (!this.quote.confirmSummary) {
            this.errors.push("Please confirm the accuracy of the Project Summary.")
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
            this.setFormData();
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
                // console.log("quote: %s", JSON.stringify(this.formData))
                // console.log(this.encode(this.formData))
                window.scrollTo(0,0);
                explode();

            })
        } else {
            window.scrollTo(0,0);
        }
    }


</script>