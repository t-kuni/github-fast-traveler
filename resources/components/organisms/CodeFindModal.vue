<template>
    <div>
        <b-modal id="code-find-modal" :static="true" centered title="Find Code">
            <p class="my-4">Vertically centered modal!</p>
        </b-modal>
    </div>
</template>

<script>
    export default {
        components: {},
        mounted() {
        },
        props     : {
            'count': {
                type: Number,
            },
            'active': {
                type: Boolean,
            }
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