<template>
    <div>
        <b-modal id="code-find-modal" :static="true" centered title="Find Code" size="lg" hide-footer>
            <code-find-form></code-find-form>
        </b-modal>
    </div>
</template>

<script>
    import CodeFindForm from "../molecules/CodeFindForm";

    export default {
        components: {CodeFindForm},
        mounted() {},
        props     : {
        },
        data      : function () {
            return {
            }
        },
        computed  : {
        },
        methods   : {
        }
    }
</script>

<style lang="scss" scoped>
</style>