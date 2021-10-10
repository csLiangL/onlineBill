<template>
    <div class="bill-number">
        <div class="num-input" :style="{borderBottomWidth: borderBottomWidth, color: color}" @click="inputClickHandler">
            {{valueShow}}
        </div>
        <van-number-keyboard :show="numBarShow" theme="custom" extra-key="." close-button-text="完成" @blur="blurHandler"
            @delete="onDelete" @input="onInput" @close="closeHandler" />
    </div>
</template>
<script>
    import { NumberKeyboard } from 'vant';
    export default {
        components: {
            [NumberKeyboard.name]: NumberKeyboard
        },
        props: {
            // amount: {
            //     type: String,
            //     default: "",
            // },
            amount: "",
            color: {
                type: String,
                default: "#04BE02",
            }
        },
        data() {
            return {
                // 操作的是value
                value: this.amount,
                numBarShow: true,
                borderBottomWidth: "2px",
            }
        },
        computed: {
            valueShow() {
                // return typeof this.value == "undefined" || this.value == "" ? "0.00" : parseFloat(this.value).toFixed(2);
                return this.value == "" ? "0.00" : parseFloat(this.value).toFixed(2);
            }
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
            // 键盘点击"完成"
            closeHandler() {
                this.$emit("valueSend", this.value)
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
                this.valChange(this.value);
            },
            onDelete() {
                if (this.value[this.value.length - 1] == ".") {
                    this.value = this.value.slice(0, this.value.length - 2)
                } else {
                    this.value = this.value.slice(0, this.value.length - 1);
                }
                this.valChange(this.value);
            },

            // 数值发生改变时触发。
            valChange(newVal) {
                console.log("BillNumber", newVal);
                this.$emit("numChange", newVal);
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
        margin: 15px 0 15px 30px;
    }

    .bill-number .num-input {
        padding: 0;
        border: 0 transparent;
        width: 100%;
        font-size: 40px;
        caret-color: transparent;
        border-bottom: 1px solid;
        text-align: left;
    }
</style>