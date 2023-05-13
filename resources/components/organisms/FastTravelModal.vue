<template>
    <div>
        <b-modal id="fast-travel-modal" :static="true" centered title="Fast Travel" size="lg" hide-footer>
            <b-tabs content-class="mt-3" @activate-tab="onActiveTab">
                <b-tab title="Find File & Code" active>
                    <code-find-form ref="codeFindForm"></code-find-form>
                </b-tab>
                <b-tab title="Find Issue">
                    <issue-find-form ref="issueFindForm"></issue-find-form>
                </b-tab>
                <b-tab title="Access Repo History">
                    <repo-access-history ref="repoAccessHistory"></repo-access-history>
                </b-tab>
            </b-tabs>
        </b-modal>
    </div>
</template>

<script>
    import CodeFindForm from "../molecules/CodeFindForm";
    import RepoAccessHistory from "../molecules/RepoAccessHistory";
    import FileFindForm from "../molecules/FileFindForm";
    import IssueFindForm from "../molecules/IssueFindForm";

    export default {
        components: {IssueFindForm, FileFindForm, RepoAccessHistory, CodeFindForm},
        mounted() {
            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
                this.$refs.codeFindForm.onShow();
            });
        },
        props     : {},
        data      : function () {
            return {}
        },
        computed  : {},
        methods   : {
            onActiveTab(newTabIdx) {
                this.getTabContent(newTabIdx).onShow();
            },
            getTabContent(tabIdx) {
                switch (tabIdx) {
                    case 0: return this.$refs.codeFindForm;
                    case 1: return this.$refs.fileFindForm;
                    case 2: return this.$refs.repoAccessHistory;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>
