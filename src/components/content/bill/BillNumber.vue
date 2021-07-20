<template>
    <div class="bill-number">
        <input type="text" :value="valueShow" :style="{borderBottomWidth: borderBottomWidth}"
            @click="inputClickHandler">
        <van-number-keyboard :show="numBarShow" theme="custom" extra-key="." close-button-text="完成" @blur="blurHandler"
            @delete="onDelete" @input="onInput" />
    </div>
</template>
<script>
    import { NumberKeyboard } from 'vant';
    export default {
        data() {
            return {
                // 操作的是value
                value: "",
                numBarShow: true,
                borderBottomWidth: "1px",
            }
        },
        computed: {
            valueShow() {
                return this.value == "" ? "0.00" : parseFloat(this.value).toFixed(2);
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
            },
            // van-number-keyboard组件一旦进行数据双向绑定(v-model)后, 则按照组件内部实现的onDelete方法来更新数据。此时使用onDelete无效。
            // 需要解除双向绑定，然后手写OnInput和onDelete方法。
            onInput(key) {
                this.value += key;
                // 用户异常输入，存在小数点的情况下，连续两个小数点.
                // 按小数点划分，取整数部分和小数部分中间拼接一个.
                if (this.value.indexOf(".") != -1) {
                    let interger = this.value.split('.')[0];
                    let decimal = this.value.split('.')[1];
                    // 小数点前没有数字或者小数点前都是零
                    if (!interger || parseInt(interger) == 0) {
                        interger = "0"
                    }
                    // 用户输入小数点后三位
                    if (decimal.length > 2) {
                        decimal = decimal.slice(0, 2);
                    }
                    this.value = interger + "." + decimal;
                } else {
                    // 整数(防止输入为00000)
                    this.value = parseInt(this.value) + "";
                }
            },
            onDelete() {
                if (this.value[this.value.length - 1] == ".") {
                    this.value = this.value.slice(0, this.value.length - 2)
                } else {
                    this.value = this.value.slice(0, this.value.length - 1);
                }
            },
        },
        watch: {
            value(newv, oldv) {
                console.log(newv, oldv)
            }
        }

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