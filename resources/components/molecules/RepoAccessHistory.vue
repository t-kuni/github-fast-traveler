<template>
    <div>
        <b-form-group label="Search Keyword:"
                      label-cols="2"
                      label-for="search-keyword-input">
            <b-input id="search-keyword-input"
                     placeholder="Enter search word"
                     v-model="searchWord"
                     ref="searchWordInput">
            </b-input>
        </b-form-group>

        <b-list-group class="history-area">
            <b-list-group-item v-for="history in histories" :key="history.toString()">
                <a :href="history.link()">{{history}}</a>
            </b-list-group-item>
        </b-list-group>
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
        async mounted() {
            const historyRepo = container.resolve('IRepoAccessHistoryRepository');

            this.$store.commit(MUTATION.SET_REPO_ACCESS_HISTORIES, {
                histories: (await historyRepo.get()).items(),
            });
            this.searchWord = '';
        },
        props     : {},
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
        watch     : {
            searchWord(val) {
                this.$store.commit(MUTATION.SET_REPO_FIND_MODAL_SEARCH_WORD, {
                    searchWord: this.searchWord
                })
            },
        },
        methods   : {
            onShow() {
                setTimeout(() => {
                    this.$refs.searchWordInput.select();
                }, 100);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .history-area {
        max-height: 400px;
        overflow-y: scroll;
        border-top: 1px solid rgba(0, 0, 0, 0.125);
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);

        .list-group-item {
            border-radius: 0 !important;
        }

        .list-group-item:first-child {
            border-top: none;
        }

        .list-group-item:last-child {
            border-bottom: none;
        }
    }
</style>