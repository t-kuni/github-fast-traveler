<template>
    <div class="chrome-extension-github-fast-traveler">
        <div>
            <code-find-modal></code-find-modal>
        </div>
    </div>
</template>

<script>
    import CodeFindModal from "./organisms/CodeFindModal.vue";

    export default {
        mounted() {
            console.log('mounted !!!!');
        },
        components: {CodeFindModal},
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