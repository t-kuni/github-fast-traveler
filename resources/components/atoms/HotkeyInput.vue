<template>
    <b-col>
        <b-form-input id="find-code-hotkeys" type="text" ref="input" :value="value"
                      @keyup="onKeyUp" @keydown="onKeyDown">

        </b-form-input>
    </b-col>
</template>

<script>
    import {container} from 'tsyringe';

    export default {
        components: {},
        mounted() {
            this.keyDetector = container.resolve('KeyDetector');
        },
        props     : {
            value: {
                type: String,
                default: '',
            }
        },
        data      : function () {
            return {
            }
        },
        computed  : {
        },
        methods   : {
            onKeyDown(e) {
                this.keyDetector.onKeyDown(e.keyCode);

                this.$emit('input', this.keyDetector.getHotkey());
                e.preventDefault();
                return false;
            },
            onKeyUp(e) {
                e.preventDefault();
                return false;
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>