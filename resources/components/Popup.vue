<template>
    <div>
        <b-container fluid>
            <h1>Github Fast Traveler</h1>
            <h2>Settings</h2>
            <h3>Shortcuts</h3>
            <b-form>
                <b-form-group label="Find Code:"
                              label-cols="3"
                              label-align="right">
                    <hotkey-input :default-value="getFindCodeKeys()"></hotkey-input>
                </b-form-group>
                <b-form-group label="Find File:"
                              label-cols="3"
                              label-align="right">
                    <hotkey-input :default-value="getFindFileKeys()"></hotkey-input>
                </b-form-group>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import HotkeyInput from './atoms/HotkeyInput';
    import {container} from 'tsyringe';

    export default {
        components: {HotkeyInput},
        mounted() {
        },
        props     : {
        },
        data      : function () {
            return {}
        },
        computed  : {},
        methods   : {
            getFindCodeKeys() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                return hotkeyRepo.get().findCodeKeys;
            },
            getFindFileKeys() {
                const hotkeyRepo = container.resolve('IHotkeyRepository');
                return hotkeyRepo.get().findFileKeys;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>