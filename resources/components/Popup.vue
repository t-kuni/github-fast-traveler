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
                              label-align="right">
                    <hotkey-input v-model="findCodeKeys"></hotkey-input>
                </b-form-group>
                <b-form-group label="Find File:"
                              label-cols="3"
                              label-align="right">
                    <hotkey-input v-model="findFileKeys"></hotkey-input>
                </b-form-group>
                <b-button variant="outline-secondary" @click="onClickReset">Reset</b-button>
                <b-button variant="success" @click="onClickSave">Save</b-button>
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
        props     : {
        },
        data      : () => {
            return {
                findFileKeys: '',
                findCodeKeys: '',
            }
        },
        computed  : {},
        methods   : {
            async onClickReset() {
                this.findFileKeys = await this.getFindFileKeys();
                this.findCodeKeys = await this.getFindCodeKeys();
            },
            onClickSave() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                const hotkeys = new Hotkeys(this.findCodeKeys, this.findFileKeys);
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
        }
    }
</script>

<style lang="scss" scoped>
</style>