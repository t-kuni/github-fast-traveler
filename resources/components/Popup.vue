<template>
    <div>
        <b-container fluid>
            <b-row class="header-area">
                <b-col col="12">
                    <h1><img src="/resources/images/icon128.png"> Github Fast Traveler</h1>
                </b-col>
            </b-row>

            <b-tabs content-class="mt-3">
                <b-tab title="Find Code" active>
                    <code-find-form></code-find-form>
                </b-tab>

                <b-tab title="Settings">
                    <h2>General</h2>
                    <user-name-form></user-name-form>

                    <h2>Shortcuts</h2>
                    <b-form>
                        <b-form-group label="Find Code:"
                                      label-cols="3"
                                      label-for="find-code-keys-input"
                                      :invalid-feedback="invalidFindCodeKeys"
                                      :state="!invalidFindCodeKeys">
                            <hotkey-input id="find-code-keys-input" v-model="findCodeKeys"
                                          @reset="onResetFindCodeKeys"></hotkey-input>
                        </b-form-group>
                        <b-form-group label="Find File:"
                                      label-cols="3"
                                      label-for="find-file-keys-input"
                                      :invalid-feedback="invalidFindFileKeys"
                                      :state="!invalidFindFileKeys">
                            <hotkey-input id="find-file-keys-input" v-model="findFileKeys"
                                          @reset="onResetFindFileKeys"></hotkey-input>
                        </b-form-group>
                        <b-form-group class="last-form-group"
                                      label="Recently Repo:"
                                      label-cols="3"
                                      label-for="recently-repo-keys-input"
                                      :invalid-feedback="invalidRecentlyRepoKeys"
                                      :state="!invalidRecentlyRepoKeys">
                            <hotkey-input id="recently-repo-keys-input" v-model="recentlyRepoKeys"
                                          @reset="onResetRecentlyRepoKeys"></hotkey-input>
                        </b-form-group>

                        <b-row class="notification-area">
                            <b-col col="12">
                                <small class="text-muted">If you want to clear a shortcut then pressing escape key or
                                    backspace key.</small>
                            </b-col>
                        </b-row>

                        <b-row class="buttons-area">
                            <b-col col="12">
                                <b-button variant="outline-secondary" @click="onClickReset">Reset</b-button>
                                <b-button variant="success" @click="onClickSave" :disabled="invalidForm">Save</b-button>
                            </b-col>
                        </b-row>

                        <b-row class="mt-2">
                            <b-col col="12">
                                <b-alert
                                        :show="saveSuccessAlertCountDown"
                                        dismissible
                                        variant="success"
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

    export default {
        components: {UserNameForm, CodeFindForm, HotkeyInput},
        mounted() {
            (async () => {
                const hotkeys         = await this.getHotkeys();
                this.findFileKeys     = hotkeys.findFileKeys;
                this.findCodeKeys     = hotkeys.findCodeKeys;
                this.recentlyRepoKeys = hotkeys.recentlyRepoKeys;
            })();
        },
        props     : {},
        data      : () => {
            return {
                findFileKeys             : '',
                findCodeKeys             : '',
                recentlyRepoKeys         : '',
                saveSuccessAlertCountDown: 0,
            }
        },
        computed  : {
            invalidFindCodeKeys() {
                if (!this.findCodeKeys || this.findCodeKeys.length === 0) {
                    return 'Enter at least 1 characters'
                } else {
                    return null;
                }
            },
            invalidFindFileKeys() {
                if (!this.findFileKeys || this.findFileKeys.length === 0) {
                    return 'Enter at least 1 characters'
                } else {
                    return null;
                }
            },
            invalidRecentlyRepoKeys() {
                if (!this.recentlyRepoKeys || this.recentlyRepoKeys.length === 0) {
                    return 'Enter at least 1 characters'
                } else {
                    return null;
                }
            },
            invalidForm() {
                return this.invalidFindCodeKeys !== null
                    || this.invalidFindFileKeys !== null
                    || this.invalidRecentlyRepoKeys !== null;
            },
        },
        methods   : {
            async onClickReset() {
                const hotkeys         = await this.getHotkeys();
                this.findFileKeys     = hotkeys.findFileKeys;
                this.findCodeKeys     = hotkeys.findCodeKeys;
                this.recentlyRepoKeys = hotkeys.recentlyRepoKeys;
            },
            async onClickSave() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                const hotkeys    = new Hotkeys(this.findCodeKeys, this.findFileKeys, this.recentlyRepoKeys);
                await hotkeyRepo.save(hotkeys);

                this.saveSuccessAlertCountDown = 5;
            },
            async getHotkeys() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                return await hotkeyRepo.get();
            },
            async onResetFindCodeKeys() {
                const hotkeys     = await this.getHotkeys();
                this.findCodeKeys = hotkeys.findCodeKeys;
            },
            async onResetFindFileKeys() {
                const hotkeys     = await this.getHotkeys();
                this.findFileKeys = hotkeys.findFileKeys;
            },
            async onResetRecentlyRepoKeys() {
                const hotkeys         = await this.getHotkeys();
                this.recentlyRepoKeys = hotkeys.recentlyRepoKeys;
            },
            onCountDown(newCount) {
                this.saveSuccessAlertCountDown = newCount;
            }
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