<template>
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

                    <b-card v-if="hasLoginName" @click="() => this.searchType = 'my-repo'" :class="{active: searchType === 'my-repo'}">
                        <b-form-radio value="my-repo">
                            My Repositories
                        </b-form-radio>
                        <b-form-input :value="loginName" readonly disabled></b-form-input>
                    </b-card>
                </b-card-group>
            </b-form-radio-group>
        </b-form-group>

        <b-form-group label="Find Keyword">
            <b-form-input
                    id="input-formatter"
                    v-model="searchWord"
                    placeholder="Enter search word"
                    ref="searchWordInput"
                    @keydown.enter="onClickFind"
            ></b-form-input>
        </b-form-group>

        <b-form-group label="Filter Extension">
            <b-form-input
                    v-model="extension"
                    placeholder="ex. css, js, html, php..."
                    @keydown.enter="onClickFind"
            ></b-form-input>
        </b-form-group>

        <b-form-group
                class="mb-0"
        >
            <b-button variant="primary" block @click="onClickFind">
                Find
            </b-button>
        </b-form-group>
    </b-form>
</template>

<script>
    import {GETTERS} from "../../../src/Application/getters";
    import {container} from 'tsyringe';

    export default {
        components: {},
        async mounted() {
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

            this.loginName = await this.pageContext.getLoginName();
        },
        props     : {
        },
        data      : function () {
            return {
                GETTERS,
                searchWord: '',
                searchType: 'all',
                loginName: null,
                extension: null,
            }
        },
        computed  : {
            pageContext() {
                return container.resolve('PageContextDetector');
            },
            codeFindingInteractor() {
                return container.resolve('CodeFindingInteractor');
            },
            hasLoginName() {
                return this.loginName !== null;
            }
        },
        methods   : {
            onClickFind() {
                this.codeFindingInteractor.find(this.searchType, this.searchWord, this.extension);
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
</style>