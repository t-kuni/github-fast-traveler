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
    import {STATE} from "../../../src/Application/state";
    import {dispatchEvent} from "../../../src/events";

    export default {
        components: {},
        mounted() {
            this.$root.$on('bv::modal::show', async (bvEvent, modalId) => {
                dispatchEvent('on_show_repo_find_modal');
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
            histories() {
                return this.$store.state[STATE.REPO_ACCESS_HISTORIES];
            }
        },
        methods   : {
        }
    }
</script>

<style lang="scss" scoped>
</style>