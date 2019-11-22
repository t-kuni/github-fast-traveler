<template>
    <div>test component</div>
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
    div {
        color: red;
    }
</style>