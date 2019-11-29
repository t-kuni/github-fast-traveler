<template>
    <div>
        <b-container fluid>
            <h1>Github Fast Traveler</h1>
            <h2>Settings</h2>
            <h3>Shortcuts</h3>
            <small class="text-muted">If you want to reset a shortcut then pressing escape key.</small>
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
                <b-form-group label="Find File:"
                              label-cols="3"
                              label-align="right"
                              label-for="find-file-keys-input"
                              :invalid-feedback="invalidFindFileKeys"
                              :state="!invalidFindFileKeys">
                    <hotkey-input id="find-file-keys-input" v-model="findFileKeys"
                                  @reset="onResetFindFileKeys"></hotkey-input>
                </b-form-group>
                <b-button variant="outline-secondary" @click="onClickReset">Reset</b-button>
                <b-button variant="success" @click="onClickSave" :disabled="invalidForm">Save</b-button>
            </b-form>
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
                return this.invalidFindCodeKeys || this.invalidFindFileKeys;
            }
        },
        methods   : {
            async onClickReset() {
                this.findFileKeys = await this.getFindFileKeys();
                this.findCodeKeys = await this.getFindCodeKeys();
            },
            onClickSave() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                const hotkeys    = new Hotkeys(this.findCodeKeys, this.findFileKeys);
                hotkeyRepo.save(hotkeys);
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
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>