<template>
    <div class="chrome-extension-github-fast-traveler">
        <div>
            <code-find-modal></code-find-modal>
            <repo-access-history-modal></repo-access-history-modal>
        </div>
    </div>
</template>

<script>
    import CodeFindModal from "./organisms/CodeFindModal.vue";
    import RepoAccessHistoryModal from "./organisms/RepoAccessHistoryModal";

    export default {
        mounted() {
        },
        components: {RepoAccessHistoryModal, CodeFindModal},
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