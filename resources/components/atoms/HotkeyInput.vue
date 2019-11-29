<template>
    <b-form-input :id="id" type="text" ref="input" :value="value"
                  @keyup="onKeyUp" @keydown="onKeyDown">
    </b-form-input>
</template>

<script>
    import {container} from 'tsyringe';
    const KEY_ESC = 27;
    const KEY_BACKSPACE = 8;

    export default {
        components: {},
        mounted() {
            this.keyDetector = container.resolve('KeyDetector');
        },
        props     : {
            value: {
                type: String,
                default: '',
            },
            id: {
                type: String,
                default: null,
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
                switch (e.keyCode) {
                    case KEY_ESC:
                    case KEY_BACKSPACE:
                        this.keyDetector.clear(e.keyCode);
                        break;
                    default:
                        this.keyDetector.onKeyDown(e.keyCode);
                        break;
                }

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