<template>
    <div>
        <b-modal id="repo-find-modal" :static="true" centered title="Find Repositories" size="lg">

            <b-form-group label="Search Keyword:"
                          label-cols="2"
                          label-for="search-keyword-input">
                <b-input id="search-keyword-input"
                         v-model="searchWord">
                </b-input>
            </b-form-group>

            <b-list-group>
                <b-list-group-item v-for="history in histories" :key="history.toString()">
                    {{history}}
                </b-list-group-item>
            </b-list-group>
        </b-modal>
    </div>
</template>

<script>
    import {GETTERS} from "../../../src/Application/getters";
    import {STATE} from "../../../src/Application/state";
    import {dispatchEvent} from "../../../src/events";
    import {MUTATION} from "../../../src/Application/mutations";
    import {container} from 'tsyringe'

    export default {
        components: {},
        mounted() {
            this.$root.$on('bv::modal::show', async (bvEvent, modalId) => {
                const historyRepo = container.resolve('IRepoAccessHistoryRepository');
                let histories = (await historyRepo.get()).items();

                const store = container.resolve('Store');
                store.commit(MUTATION.SET_REPO_ACCESS_HISTORIES, {
                    histories,
                });
            })
        },
        props     : {
        },
        data      : function () {
            return {
                GETTERS,
                STATE,
                searchWord: '',
            }
        },
        computed  : {
            histories() {
                return this.$store.getters[GETTERS.REPO_ACCESS_HISTORIES_FILTERED];
            },
        },
        watch: {
          searchWord(val) {
              console.log(this.searchWord);
              this.$store.commit(MUTATION.SET_REPO_FIND_MODAL_SEARCH_WORD, {
                  searchWord: this.searchWord
              })
          }
        },
        methods   : {
        }
    }
</script>

<style lang="scss" scoped>
</style>