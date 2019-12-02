<template>
    <div class="chrome-extension-github-fast-traveler">
        <div>
            <code-find-modal></code-find-modal>
            <repo-find-modal></repo-find-modal>
        </div>
    </div>
</template>

<script>
    import CodeFindModal from "./organisms/CodeFindModal.vue";
    import RepoFindModal from "./organisms/RepoFindModal";

    export default {
        mounted() {
        },
        components: {RepoFindModal, CodeFindModal},
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
</style>