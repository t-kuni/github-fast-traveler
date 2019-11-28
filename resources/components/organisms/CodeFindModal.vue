<template>
    <div>
        <b-modal id="code-find-modal" :static="true" centered title="Find Code" size="lg">
            <b-form @submit="onClickFind">
                <b-form-group label="Find Scope">
                    <b-form-radio-group
                            v-model="searchType"
                            name="radio-options"
                    >
                        <b-form-radio value="all">
                            All Repositories
                        </b-form-radio>
                        <b-form-radio value="current-user" v-if="pageContext.hasRepoOwnerName()">
                            Current User
                            <b-form-input :value="pageContext.getRepoOwnerName()" readonly></b-form-input>
                        </b-form-radio>
                        <b-form-radio value="current-repo" v-if="pageContext.hasRepoName()">
                            Current Repository
                            <b-form-input :value="pageContext.getRepoName()" readonly></b-form-input>
                        </b-form-radio>
                        <b-form-radio value="my-repo" v-if="pageContext.hasLoginName()">
                            My Repositories
                            <b-form-input :value="pageContext.getLoginName()" readonly></b-form-input>
                        </b-form-radio>
                    </b-form-radio-group>
                </b-form-group>

                <b-form-group
                        class="mb-0"
                >
                    <b-form-input
                            id="input-formatter"
                            v-model="searchWord"
                            placeholder="Enter your name"
                            ref="searchWordInput"
                            @keydown.enter="onClickFind"
                    ></b-form-input>
                </b-form-group>

                <template v-slot:modal-footer="{ ok, cancel, hide }">
                    <b-button variant="success" @click="onClickFind">
                        Find
                    </b-button>
                </template>
            </b-form>
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
                this.searchWord = this.pageContext.getSelectingText();

                if (this.pageContext.hasRepoName()) {
                    this.searchType = 'current-repo';
                } else if (this.pageContext.hasRepoOwnerName()) {
                    this.searchType = 'current-user';
                } else {
                    this.searchType = 'all';
                }

                setTimeout(() => {
                    this.$refs.searchWordInput.select();
                }, 100);
            })
        },
        props     : {
        },
        data      : function () {
            return {
                GETTERS,
                searchWord: '',
                searchType: 'all',
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