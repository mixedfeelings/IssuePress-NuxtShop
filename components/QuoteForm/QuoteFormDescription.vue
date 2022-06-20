<template>
    <fieldset legend="Project Description">
        <h3>Project Summary</h3>
        <p v-text="description" class="col-span-2"></p>
        <p v-if="further_description" v-text="further_description" class="col-span-2"></p>
  </fieldset>
</template>

<script setup lang="ts">
    import { toRefs } from "vue";

    const props = defineProps<{
        fields: any;
    }>();

    const emit = defineEmits(['update:value'])

    const description = computed (() => {
        return `${base.value} ${publication_details.value}${print_details.value}${other_details.value}`;
    });

    const further_description = computed (() => {
        if (props.fields.notes){
            return props.fields.notes
        };
    });

    const base = computed (() => {
        return `${props.fields.name ? `${props.fields.name.toUpperCase()}: ` : ''}${props.fields.otherQuantity ? props.fields.otherQuantity : props.fields.quantity} copies`;
    });

    const publication_details = computed (() => {
        if (props.fields.type && props.fields.type == 'Publication') {
            return `of a ${props.fields.publication.pages}-page${props.fields.inkColors.length ? `, ${props.fields.inkColors.length}-color (${props.fields.inkColors.join(' - ')} ${props.fields.publication.interior.inkNotes ? '*':''}) publication` : ' publication'} ${(!props.fields.publication.cover.plusCover && props.fields.stock) ? 'self-cover' : ''} ${props.fields.stock ? `on ${props.fields.stock}` : ''} ${props.fields.publication.cover.plusCover ? `PLUS` : ''} ${(props.fields.publication.cover.plusCover && props.fields.publication.cover.outsideInkColors.length) ? `${props.fields.publication.cover.outsideInkColors.length}:${(props.fields.publication.cover.isDoubleSided && props.fields.publication.cover.insideInkColors.length) ? props.fields.publication.cover.insideInkColors.length : '0'} (${props.fields.publication.cover.outsideInkColors.join(' - ')}${(props.fields.publication.cover.isDoubleSided && props.fields.publication.cover.insideInkColors.length) ? ` : ${props.fields.publication.cover.insideInkColors.join(' - ')}` : ''})` : ''} ${props.fields.publication.cover.plusCover ? 'cover' : ''} ${(props.fields.publication.cover.plusCover && props.fields.publication.cover.stock) ? `on ${props.fields.publication.cover.stock}` : ''}${(props.fields.publication.binding.type != "None") ? ` - cut, collate, ${(props.fields.publication.cover.plusCover && props.fields.publication.cover.isLaminated) ? 'matte laminate cover,' : ''} ${props.fields.publication.binding.type.toLowerCase()}${(props.fields.publication.binding.type != "Staple") ? ' bind' : ''}${(props.fields.publication.binding.color && (props.fields.publication.binding.type == "Wire-O" || props.fields.publication.binding.type == "Spiral")) ? ` (${props.fields.publication.binding.color.toLowerCase()})` : ''}${(props.fields.publication.binding.type == "Staple") ? ` (${props.fields.publication.binding.stapleColor.toLowerCase()}), fold,` : ','}${(!props.fields.isRounded) ? ' and' : ''} trim to finished size of ${props.fields.publication.finishedSize == "Other" ? props.fields.publication.otherSize : props.fields.publication.finishedSize }${(props.fields.isRounded && props.fields.cornerRadius) ? `, and round outside corners to ${props.fields.cornerRadius}` : ''}  ` : '- no binding.'} ${props.fields.publication.interior.inkNotes ? `(* ${props.fields.publication.interior.inkNotes})` :'' }`;
        } else {
            return '';
        }
    });
    const print_details = computed (() => {
        if (props.fields.type && props.fields.type == 'Print') {
            return `of a ${(props.fields.print.isDoubleSided && props.fields.inkColors.length && props.fields.print.backInkColors.length) ? `${props.fields.inkColors.length}:${props.fields.print.backInkColors.length} (${props.fields.inkColors.join(' - ')} : ${props.fields.print.backInkColors.join(' - ')}) double-sided` : ''}${(!props.fields.print.backInkColors.length && props.fields.inkColors.length) ? `${props.fields.inkColors.length}-color (${props.fields.inkColors.join(' - ')}) single-sided` : ''} ${props.fields.print.size == "Other" ? props.fields.print.otherSize : props.fields.print.size} print ${props.fields.stock? ` on ${props.fields.stock}` : ''} ${(props.fields.print.size && props.fields.print.size != '11" x 17" (no bleed)') ? `- trim to finished size ${(props.fields.isRounded && props.fields.cornerRadius) ? `and round corners to ${props.fields.cornerRadius}` : ''}` : `${(props.fields.isRounded && props.fields.cornerRadius) ? `- round outside corners to ${props.fields.cornerRadius}` : ''}`}`;
        } else {
            return '';
        }
    });
        const other_details = computed (() => {
        if (props.fields.type && props.fields.type == 'Other') {
            return `of a ${props.fields.inkColors.length ? `${props.fields.inkColors.length}-color (${props.fields.inkColors.join(' - ')})` : ''} project ${props.fields.stock ? `on ${props.fields.stock}` : ''} ${(props.fields.isRounded && props.fields.cornerRadius) ? `- round corners to ${props.fields.cornerRadius}` : ''} ${props.fields.other.description ? `- Provided Description: "${props.fields.other.description}"` : ''}`;
        } else {
            return '';
        }
    });

    watch(description, () => {
        emit('update:value', description.value)
    })


</script>




