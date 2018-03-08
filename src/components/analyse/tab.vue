<template>
    <section>
        <tab :tabData='tabData' :channelCount='channelCount' :channelColors='channelColors' @currentClick='currentClick' :fromAna='fromAna' @filtrate-minus='listen'></tab>
    </section>
</template>
<script type="text/ecmascript-6">
    import Tab from 'base/tab'
    export default {
        props: ["nearlyStaions","fromAna","tabData","channelColors","channelCount"],
        components: {
            Tab
        },
        methods: {
            listen() {
                this.$emit('filtrate-minus');
            },
            currentClick(item) {
                this.$emit('currentClick',item)
            }
        }
    }
</script>
