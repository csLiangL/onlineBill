<template>
    <div class="bill-number">
        <input type="text" :value="value" :style="{borderBottomWidth: borderBottomWidth}" @click=" inputClickHandler"
            placeholder="0.00">
        <van-number-keyboard :show="numBarShow" theme="custom" extra-key="." close-button-text="完成" v-model="value"
            @blur="blurHandler" />
    </div>
</template>
<script>
    import { NumberKeyboard } from 'vant';
    export default {
        data() {
            return {
                value: "",
                numBarShow: true,
                borderBottomWidth: "1px",
            }
        },
        components: {
            [NumberKeyboard.name]: NumberKeyboard
        },
        methods: {
            inputClickHandler() {
                this.numBarShow = true;
                this.borderBottomWidth = "2px";
            },
            blurHandler() {
                this.numBarShow = false;
                this.borderBottomWidth = "1px";
            }
        },
    }
</script>
<style>
    /* 左30px外边距，高度80px, 字体40px */
    /*  */
    .bill-number {
        height: 80px;
        line-height: 80px;
        margin: 30px 0 30px 30px;
    }

    .bill-number input {
        padding: 0;
        border: 0 transparent;
        width: 100%;
        font-size: 40px;
        color: #04BE02;
        caret-color: transparent;
        border-bottom: 1px solid #04BE02;
        box-sizing: border-box;
    }
</style>