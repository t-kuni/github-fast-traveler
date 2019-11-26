<template>
    <b-col>
        <b-form-input id="find-code-hotkeys" type="text" ref="input" v-model="value" @onfocus="focusing = true" @onblur="focusing = false"></b-form-input>
    </b-col>
</template>

<script>
    import hotkeys from 'hotkeys-js';

    export default {
        components: {},
        mounted() {
            const self = this;
            const input = this.$refs.input;

            hotkeys('*', () => {
                if (hotkeys.shift) {
                    self.data.value = 'shift';
                }

                if (hotkeys.ctrl) {
                    self.data.value = 'ctrl';
                }

                if (hotkeys.alt) {
                    self.data.value = 'ctrl';
                }

                if (hotkeys.option) {
                    self.data.value = 'option';
                }

                if (hotkeys.control) {
                    self.data.value = 'control';
                }

                if (hotkeys.cmd) {
                    self.data.value = 'cmd';
                }

                if (hotkeys.command) {
                    self.data.value = 'command';
                }
            });
        },
        props     : {
        },
        data      : function () {
            return {
                focusing: false,
                value: '',
            }
        },
        computed  : {},
        methods   : {
        }
    }
</script>

<style lang="scss" scoped>
</style>