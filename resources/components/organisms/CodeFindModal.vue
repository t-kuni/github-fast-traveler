<template>
    <div>
        <b-modal id="code-find-modal" :static="true" centered title="Find Code" size="lg">
            <b-form @submit="onClickFind">
                <b-form-group label="Find Scope">
                    <b-form-radio-group class="select-scope-area"
                                        v-model="searchType">
                        <b-card-group>
                            <b-card @click="() => this.searchType = 'all'"
                                    :class="{active: searchType === 'all', 'left-active': searchType === 'current-user'}">
                                <b-form-radio value="all">
                                    All Repositories
                                </b-form-radio>
                            </b-card>

                            <b-card v-if="pageContext.hasRepoOwnerName()"
                                    @click="() => this.searchType = 'current-user'"
                                    :class="{active: searchType === 'current-user', 'left-active': searchType === 'current-repo'}">
                                <b-form-radio value="current-user">
                                    Current User
                                </b-form-radio>
                                <b-form-input :value="pageContext.getRepoOwnerName()" readonly disabled></b-form-input>
                            </b-card>

                            <b-card v-if="pageContext.hasRepoName()"
                                    @click="() => this.searchType = 'current-repo'"
                                    :class="{active: searchType === 'current-repo', 'left-active': searchType === 'my-repo'}">
                                <b-form-radio value="current-repo">
                                    Current Repository
                                </b-form-radio>
                                <b-form-input :value="pageContext.getRepoName()" readonly disabled></b-form-input>
                            </b-card>

                            <b-card @click="() => this.searchType = 'my-repo'" :class="{active: searchType === 'my-repo'}">
                                <b-form-radio value="my-repo" v-if="pageContext.hasLoginName()">
                                    My Repositories
                                </b-form-radio>
                                <b-form-input :value="pageContext.getLoginName()" readonly disabled></b-form-input>
                            </b-card>
                        </b-card-group>
                    </b-form-radio-group>
                </b-form-group>

                <b-form-group
                        class="mb-0"
                        label="Find Keyword"
                >
                    <b-form-input
                            id="input-formatter"
                            v-model="searchWord"
                            placeholder="Enter search word"
                            ref="searchWordInput"
                            @keydown.enter="onClickFind"
                    ></b-form-input>
                </b-form-group>
            </b-form>

            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="cancel()" id="footer-button-cancel">
                    Cancel
                </b-button>
                <b-button variant="primary" @click="onClickFind">
                    Find
                </b-button>
            </template>
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
    .select-scope-area {
        .card {
            cursor: pointer;
        }

        .card.left-active {
            border-right-color: #007Bff;
        }

        .card.active {
            border-color: #007Bff;
        }

        .custom-control {
            margin-right: 0;
        }
    }

    #footer-button-cancel {
        color: #24292e;
    }
</style>