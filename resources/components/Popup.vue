<template>
    <div>
        <b-container fluid>
            <b-row class="header-area">
                <b-col col="12">
                    <h1><img src="/resources/images/icon128.png"> Github Fast Traveler</h1>
                </b-col>
            </b-row>

            <b-tabs content-class="mt-3" @activate-tab="onActiveTab">
                <b-tab title="Find Code" active>
                    <code-find-form ref="codeFindForm"></code-find-form>
                </b-tab>

                <b-tab title="Find File">
                    <file-find-form ref="fileFindForm"></file-find-form>
                </b-tab>

                <b-tab title="Settings">
                    <h2>General</h2>
                    <user-name-form></user-name-form>

                    <h2>Shortcut</h2>
                    <b-form>
                        <b-form-group label="Fast Travel:"
                                      label-cols="3"
                                      label-for="fast-travel-keys-input"
                                      :invalid-feedback="invalidFastTravelKeys"
                                      :state="!invalidFastTravelKeys"
                                      class="mb-0">
                            <hotkey-input id="fast-travel-keys-input" v-model="fastTravelKeys"
                                          @reset="onResetFastTravelKeys"></hotkey-input>
                        </b-form-group>

                        <b-row>
                            <b-col col="12">
                                <small class="text-muted">If you want to clear a shortcut then pressing escape key or
                                    backspace key.</small>
                            </b-col>
                        </b-row>

                        <b-row class="mt-2">
                            <b-col col="12">
                                <b-button variant="outline-secondary" @click="onClickReset">Reset</b-button>
                                <b-button variant="primary" @click="onClickSave" :disabled="invalidForm">Save</b-button>
                            </b-col>
                        </b-row>

                        <b-row class="mt-2">
                            <b-col col="12">
                                <b-alert
                                        :show="saveSuccessAlertCountDown"
                                        dismissible
                                        variant="primary"
                                        @dismissed="saveSuccessAlertCountDown=0"
                                        @dismiss-count-down="onCountDown"
                                >
                                    Save successfully.
                                </b-alert>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-tab>
            </b-tabs>
        </b-container>
    </div>
</template>

<script>
    import HotkeyInput from './atoms/HotkeyInput';
    import {container} from 'tsyringe';
    import Hotkeys from "../../src/Domain/ValueObjects/Hotkeys";
    import CodeFindForm from "./molecules/CodeFindForm";
    import UserNameForm from "./molecules/UserNameForm";
    import RepoAccessHistory from "./molecules/RepoAccessHistory";
    import FileFindForm from "./molecules/FileFindForm";

    export default {
        components: {FileFindForm, RepoAccessHistory, UserNameForm, CodeFindForm, HotkeyInput},
        mounted() {
            (async () => {
                const hotkeys       = await this.getHotkeys();
                this.fastTravelKeys = hotkeys.fastTravelKeys;
                this.$refs.codeFindForm.onShow();
            })();
        },
        props     : {},
        data      : () => {
            return {
                fastTravelKeys           : '',
                saveSuccessAlertCountDown: 0,
            }
        },
        computed  : {
            invalidFastTravelKeys() {
                if (!this.fastTravelKeys || this.fastTravelKeys.length === 0) {
                    return 'Enter at least 1 characters'
                } else {
                    return null;
                }
            },
            invalidForm() {
                return this.invalidFastTravelKeys !== null;
            },
        },
        methods   : {
            async onClickReset() {
                const hotkeys       = await this.getHotkeys();
                this.fastTravelKeys = hotkeys.fastTravelKeys;
            },
            async onClickSave() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                const hotkeys    = new Hotkeys(this.fastTravelKeys);
                await hotkeyRepo.save(hotkeys);

                this.saveSuccessAlertCountDown = 5;
            },
            async getHotkeys() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                return await hotkeyRepo.get();
            },
            async onResetFastTravelKeys() {
                const hotkeys       = await this.getHotkeys();
                this.fastTravelKeys = hotkeys.fastTravelKeys;
            },
            onCountDown(newCount) {
                this.saveSuccessAlertCountDown = newCount;
            },
            onActiveTab(newTabIdx) {
                const content = this.getTabContent(newTabIdx);
                if (content) {
                    content.onShow();
                }
            },
            getTabContent(tabIdx) {
                switch (tabIdx) {
                    case 0: return this.$refs.codeFindForm;
                    case 1: return this.$refs.fileFindForm;
                    default: return null;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .header-area {
        img {
            width: 64px;
        }
    }
</style>