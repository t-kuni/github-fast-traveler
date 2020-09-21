<template>
    <b-form>
        <b-form-group label="User Name:"
                      label-cols="3">
            <b-form-input
                    v-model="loginName"
                    placeholder="Enter your name"
                    @keydown.enter="onClickSave"
            ></b-form-input>
        </b-form-group>

        <b-row class="buttons-area">
            <b-col col="12">
                <b-button variant="success" @click="onClickSave">Save</b-button>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col col="12">
                <b-alert
                        :show="saveSuccessAlertCountDown"
                        dismissible
                        variant="success"
                        @dismissed="saveSuccessAlertCountDown=0"
                        @dismiss-count-down="onCountDown"
                >
                    Save successfully.
                </b-alert>
            </b-col>
        </b-row>
    </b-form>
</template>

<script>
    import {container} from 'tsyringe';

    export default {
        components: {},
        async mounted() {
            this.loginName = await this.pageContext.getLoginName();
        },
        props     : {
        },
        data      : function () {
            return {
                loginName: null,
                saveSuccessAlertCountDown: 0,
            }
        },
        computed  : {
            pageContext() {
                return container.resolve('PageContextDetector');
            },
            userNameRepo() {
                return container.resolve('IUserNameRepository');
            },
            hasLoginName() {
                return this.loginName !== null;
            }
        },
        methods   : {
            async onClickSave() {
                await this.userNameRepo.save(this.loginName);
                this.saveSuccessAlertCountDown = 5;
            },
            onCountDown(newCount) {
                this.saveSuccessAlertCountDown = newCount;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>