<template>
    <div>
        <b-modal id="fast-travel-modal" :static="true" centered title="Fast Travel" size="lg" hide-footer>
            <b-tabs content-class="mt-3">
                <b-tab title="Find Code" active>
                    <code-find-form></code-find-form>
                </b-tab>
                <b-tab title="Find File">
                    <file-find-form></file-find-form>
                </b-tab>
                <b-tab title="Access Repo History">
                    <repo-access-history></repo-access-history>
                </b-tab>
            </b-tabs>
        </b-modal>
    </div>
</template>

<script>
    import CodeFindForm from "../molecules/CodeFindForm";
    import RepoAccessHistory from "../molecules/RepoAccessHistory";
    import FileFindForm from "../molecules/FileFindForm";

    export default {
        components: {FileFindForm, RepoAccessHistory, CodeFindForm},
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