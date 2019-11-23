<template>
    <div class="chrome-extension-github-fast-traveler">
        <div>
            <b-button v-b-modal.modal-center>Launch centered modal</b-button>

            <b-modal id="modal-center" static="true" centered title="BootstrapVue">
                <p class="my-4">Vertically centered modal!</p>
            </b-modal>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('mounted !!!!');
        },
        components: {},
        mounted() {
        },
        props     : {
        },
        data      : function () {
            return {}
        },
        computed  : {},
        methods   : {}
    }
</script>

<style lang="scss" scoped>
    /*@import '../../resources/scss/custom';*/
</style>