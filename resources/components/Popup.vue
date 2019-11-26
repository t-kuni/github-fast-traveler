<template>
    <div>
        <b-container fluid>
            <b-row>
                <hotkey-input></hotkey-input>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import HotkeyInput from './atoms/HotkeyInput';

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
        methods   : {}
    }
</script>

<style lang="scss" scoped>
</style>