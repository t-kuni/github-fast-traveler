<template>
    <div>
        <b-modal id="repo-find-modal" :static="true" centered title="Find Repositories" size="lg">

            <div>Recently access repositories</div>

        </b-modal>
    </div>
</template>

<script>
    import {GETTERS} from "../../../src/Application/getters";
    import {container} from 'tsyringe';

    export default {
        components: {},
        mounted() {
            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
            })
        },
        props     : {
        },
        data      : function () {
            return {
                GETTERS,
            }
        },
        computed  : {
            pageContext() {
                return container.resolve('PageContextDetector');
            },
            codeFindingInteractor() {
                return container.resolve('CodeFindingInteractor');
            },
        },
        methods   : {
            onClickFind() {
                this.codeFindingInteractor.find(this.searchType, this.searchWord);
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>