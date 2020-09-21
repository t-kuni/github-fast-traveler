<template>
    <b-form @submit="onClickFind">
        <b-form-group
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
            }
        },
        computed  : {
            pageContext() {
                return container.resolve('PageContextDetector');
            },
            fileFindingInteractor() {
                return container.resolve('FileFindingInteractor');
            },
        },
        methods   : {
            onClickFind() {
                this.fileFindingInteractor.find(this.searchWord);
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