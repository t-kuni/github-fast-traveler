<template>
    <div>
        <b-modal id="repo-find-modal" :static="true" centered title="Find Repositories" size="lg">


            <div>Recently access repositories</div>

            <div v-for="history in histories">
                {{history}}
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {GETTERS} from "../../../src/Application/getters";
    import {container} from 'tsyringe';

    export default {
        components: {},
        mounted() {
            this.$root.$on('bv::modal::show', async (bvEvent, modalId) => {
                // TODO ここではストレージにアクセスできないので、イベントを発行する必要がある
                const historyRepo = container.resolve('IRepoAccessHistoryRepository');
                this.histories = await historyRepo.get();
            })
        },
        props     : {
        },
        data      : function () {
            return {
                GETTERS,
                histories: [],
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