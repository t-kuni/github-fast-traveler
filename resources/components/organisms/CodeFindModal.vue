<template>
    <div>
        <b-modal id="code-find-modal" :static="true" centered title="Find Code" size="lg">
            <b-form-group label="Find Scope">
                <b-form-radio-group
                        v-model="searchType"
                        name="radio-options"
                >
                    <b-form-radio value="all">
                        All Repositories
                    </b-form-radio>
                    <b-form-radio value="current-user" v-if="hasCurrentUser">
                        Current User
                        <b-form-input :value="currentUser" readonly></b-form-input>
                    </b-form-radio>
                    <b-form-radio value="current-repo" v-if="hasCurrentRepo">
                        Current Repository
                        <b-form-input :value="currentRepo" readonly></b-form-input>
                    </b-form-radio>
                    <b-form-radio value="my-repo" v-if="hasLoginUser">
                        My Repositories
                        <b-form-input :value="loginUser" readonly></b-form-input>
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
                ></b-form-input>
            </b-form-group>

            <template v-slot:modal-footer="{ ok, cancel, hide }">
                <b-button variant="success" @click="onClickFind">
                    Find
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import {GETTERS} from "../../../src/Application/getters";

    export default {
        components: {},
        mounted() {
            this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
                this.searchWord = window.getSelection().toString();

                if (this.hasCurrentRepo) {
                    this.searchType = 'current-repo';
                } else if (this.hasCurrentUser) {
                    this.searchType = 'current-user';
                } else {
                    this.searchType = 'all';
                }

                // FIXME not working
                // this.$refs.searchWordInput.select();
            })
        },
        props     : {
            // 'count': {
            //     type: Number,
            // },
            // 'active': {
            //     type: Boolean,
            // }
        },
        data      : function () {
            return {
                GETTERS,
                searchWord: '',
                searchType: 'all',
            }
        },
        computed  : {
            hasCurrentUser() {
                return this.$store.getters[GETTERS.CURRENT_USER] !== null;
            },
            currentUser() {
                return this.$store.getters[GETTERS.CURRENT_USER];
            },
            hasCurrentRepo() {
                return this.$store.getters[GETTERS.CURRENT_REPO] !== null;
            },
            currentRepo() {
                return this.$store.getters[GETTERS.CURRENT_REPO];
            },
            hasLoginUser() {
                return this.$store.getters[GETTERS.LOGIN_USER] !== null;
            },
            loginUser() {
                return this.$store.getters[GETTERS.LOGIN_USER];
            },
        },
        methods   : {
            onClickFind() {
                switch (this.searchType) {
                    case 'all':
                        window.open(this.buildUrlInAll());
                        break;
                    case 'current-user':
                        window.open(this.buildUrlInCurrentUser());
                        break;
                    case 'current-repo':
                        window.open(this.buildUrlInCurrentRepo());
                        break;
                    case 'my-repo':
                        window.open(this.buildUrlInMyRepo());
                        break;
                }
            },
            buildUrl(query) {
                return 'https://github.com/search?q=' + query + '&type=Code';
            },
            buildUrlInAll() {
                const query = this.searchWord;
                return this.buildUrl(query);
            },
            buildUrlInCurrentUser() {
                const user = this.currentUser;
                const word = this.searchWord;
                const query = `user:${user} ${word}`;
                return this.buildUrl(query);
            },
            buildUrlInCurrentRepo() {
                const user = this.currentUser;
                const repo = this.currentRepo;
                const word = this.searchWord;
                const query = `repo:${user}/${repo} ${word}`;
                return this.buildUrl(query);
            },
            buildUrlInMyRepo() {
                const user = this.loginUser;
                const word = this.searchWord;
                const query = `user:${user} ${word}`;
                return this.buildUrl(query);
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>