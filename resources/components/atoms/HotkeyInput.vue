<template>
    <b-form-input :id="id" type="text" ref="input" :value="value"
                  @keyup="onKeyUp" @keydown="onKeyDown">
    </b-form-input>
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