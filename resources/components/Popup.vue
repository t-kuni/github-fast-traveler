<template>
    <div>
        <b-container fluid>
            <b-row>
                <b-col col="12">
                    <h1>Github Fast Traveler</h1>
                </b-col>
            </b-row>

            <b-row>
                <b-col col="12">
                    <h2>Shortcut settings</h2>
                </b-col>
            </b-row>

            <b-row class="shortcut-setting-area">
                <b-col col="12">
                    <b-form>
                        <b-form-group label="Find Code:"
                                      label-cols="3"
                                      label-align="right"
                                      label-for="find-code-keys-input"
                                      :invalid-feedback="invalidFindCodeKeys"
                                      :state="!invalidFindCodeKeys">
                            <hotkey-input id="find-code-keys-input" v-model="findCodeKeys"
                                          @reset="onResetFindCodeKeys"></hotkey-input>
                        </b-form-group>
                        <b-form-group class="last-form-group"
                                      label="Find File:"
                                      label-cols="3"
                                      label-align="right"
                                      label-for="find-file-keys-input"
                                      :invalid-feedback="invalidFindFileKeys"
                                      :state="!invalidFindFileKeys">
                            <hotkey-input id="find-file-keys-input" v-model="findFileKeys"
                                          @reset="onResetFindFileKeys"></hotkey-input>
                        </b-form-group>

                        <b-row class="notification-area">
                            <b-col col="12">
                                <small class="text-muted">If you want to reset a shortcut then pressing escape key.</small>
                            </b-col>
                        </b-row>

                        <b-row class="buttons-area">
                            <b-col col="12">
                                <b-button variant="outline-secondary" @click="onClickReset">Reset</b-button>
                                <b-button variant="success" @click="onClickSave" :disabled="invalidForm">Save</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-col>
            </b-row>

            <b-row class="alert-area">
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
        </b-container>
    </div>
</template>

<script>
    import HotkeyInput from './atoms/HotkeyInput';
    import {container} from 'tsyringe';
    import Hotkeys from "../../src/Domain/ValueObjects/Hotkeys";

    export default {
        components: {HotkeyInput},
        mounted() {
            (async () => {
                this.findFileKeys = await this.getFindFileKeys();
                this.findCodeKeys = await this.getFindCodeKeys();
            })();
        },
        props     : {},
        data      : () => {
            return {
                findFileKeys: '',
                findCodeKeys: '',
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
            invalidForm() {
                return this.invalidFindCodeKeys !== null
                    || this.invalidFindFileKeys !== null;
            },
        },
        methods   : {
            async onClickReset() {
                this.findFileKeys = await this.getFindFileKeys();
                this.findCodeKeys = await this.getFindCodeKeys();
            },
            async onClickSave() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                const hotkeys    = new Hotkeys(this.findCodeKeys, this.findFileKeys);
                await hotkeyRepo.save(hotkeys);

                this.saveSuccessAlertCountDown = 5;
            },
            async getFindCodeKeys() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                return (await hotkeyRepo.get()).findCodeKeys;
            },
            async getFindFileKeys() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                return (await hotkeyRepo.get()).findFileKeys;
            },
            async onResetFindCodeKeys() {
                this.findCodeKeys = await this.getFindCodeKeys();
            },
            async onResetFindFileKeys() {
                this.findFileKeys = await this.getFindFileKeys();
            },
            onCountDown(newCount) {
                this.saveSuccessAlertCountDown = newCount;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .alert-area {
        margin-top: 15px;
    }

    .shortcut-setting-area {
        margin-top: 10px;

        .last-form-group {
            margin-bottom: 0;
        }

        .notification-area {
            text-align: right;
        }

        .buttons-area {
            margin-top: 15px;
            text-align: right;
        }
    }
</style>