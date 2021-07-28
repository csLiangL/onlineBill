<template>
    <div class="bill-bar">

        <div class="bill-bar-number">
            <input type="text" :value="numShow" :style="[NumBoxColorStyle, NumBoxBorderStyle]"
                @click="inputClickHandler">
        </div>

        <bill-bar-item :idx="1" :currentClicked="currClicked" @itemClick="itemClickHandler">
            <img slot="icon" src="~assets/img/class.svg">
            <span slot="name">分类</span>
            <span slot="text">{{this.category}}</span>
        </bill-bar-item>
        <bill-bar-item :idx="2" :currentClicked="currClicked" @itemClick="itemClickHandler">
            <img slot="icon" src="~assets/img/account.svg">
            <span slot="name">账户</span>
            <span slot="text">{{this.account}}</span>
        </bill-bar-item>
        <bill-bar-item :idx="3" :currentClicked="currClicked" @itemClick="itemClickHandler">
            <img slot="icon" src="~assets/img/time.svg">
            <span slot="name">时间</span>
            <span slot="text">{{this.timeShow}}</span>
        </bill-bar-item>
        <bill-bar-item :idx="4" :currentClicked="currClicked" @itemClick="itemClickHandler">
            <img slot="icon" src="~assets/img/note.svg">
            <span slot="name">备注</span>
            <input slot="text" type="text" v-model="note" placeholder="..."></input>
        </bill-bar-item>

        <div class="bill-bar-pop">
            <van-number-keyboard :show="isNumCpnShow" theme="custom" extra-key="." close-button-text="完成"
                @blur="blurHandler" @delete="onDelete" @input="onInput" />

            <van-picker show-toolbar ref="cat" v-show="isCatCpnShow" :columns="catCols" cancel-button-text=" "
                :item-height="40" :visible-item-count="5" @change="catChangeHandler" @confirm="catConfirmHandler">
                <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
            </van-picker>

            <van-picker show-toolbar ref="account" v-show="isAccountCpnShow" :columns="accountCols"
                cancel-button-text=" " :item-height="40" :visible-item-count="5" @change="accountChangeHandler"
                @confirm="accountConfirmHandler">
                <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
            </van-picker>

            <van-datetime-picker v-show="isTimeCnpShow" v-model="time" cancel-button-text=" " :item-height="40"
                :visible-item-count="5" :formatter="formatterHandler" @confirm="dateConfirmHandler">
                <img class="pulldown" slot="confirm" src="~assets/img/pulldown.svg" alt="">
            </van-datetime-picker>
        </div>

    </div>
</template>

<script>
    import { NumberKeyboard, Picker, DatetimePicker } from 'vant';

    import BillBarItem from "components/content/bill/BillBarItem.vue"

    export default {
        props: {
            color: {
                type: String,
                default: "#04BE02"
            }
        },
        data() {
            return {

                currClicked: 0,

                num: "",
                category: "",
                account: "",
                time: new Date(),
                note: "",

                // 数字键盘相关数据
                numIdx: 0,

                // 类别级联数据
                catCols: [
                    {
                        text: "吃",
                        children: [{ text: "吃饭" }, { text: "零食" }]
                    },
                    {
                        text: "生活",
                        children: [{ text: "房屋水电" }, { text: "生活用品" }, { text: "学习用品" }, { text: "交通" }]
                    },
                    {
                        text: "穿",
                        children: [{ text: "衣服" }, { text: "裤子" }, { text: "鞋子" }]
                    },
                ],
                // 账户级联数据
                accountCols: [
                    {
                        text: "电子账户",
                        children: [{ text: "微信" }, { text: "支付宝" }]
                    },
                    {
                        text: "银行卡",
                        children: [{ text: "农行卡622832..." }, { text: "建行卡73288..." }, { text: "工商卡827293..." }]
                    },
                    {
                        text: "现金",
                        children: [{ text: "人民币" }, { text: "美元" }]
                    },
                ],

                // 是否点击下拉按钮
                isCatCpnDisappear: false,
                isAccountDisappear: false,
                isDateCnpDisappear: false,
            }
        },
        created() {
            this.category = this.catCols[0].text + " > " + this.catCols[0].children[0].text;
            this.account = this.accountCols[0].text + " > " + this.accountCols[0].children[0].text;
        },
        components: {
            [NumberKeyboard.name]: NumberKeyboard,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,
            BillBarItem,
        },
        computed: {

            // 键盘相关数据
            isNumCpnShow() {
                return this.currClicked == this.numIdx;
            },
            numShow() {
                return this.num == "" ? "0.00" : parseFloat(this.num).toFixed(2);
            },
            NumBoxColorStyle() {
                return { "color": this.color, "borderBottomColor": this.color }
            },
            NumBoxBorderStyle() {
                return this.currClicked == this.numIdx ? { "borderBottomWidth": "2px" } : { "borderBottomWidth": "1px" }
            },

            // 分类组件相关数据
            isCatCpnShow() {
                return this.currClicked == 1 && !this.isCatCpnDisappear;
            },

            // 账户组件相关数据
            isAccountCpnShow() {
                return this.currClicked == 2 && !this.isAccountDisappear;
            },

            // 时间组件相关数据
            isTimeCnpShow() {
                return this.currClicked == 3 && !this.isDateCnpDisappear;
            },
            timeShow() {
                let hours = this.time.getHours() < 10 ? "0" + this.time.getHours() : this.time.getHours();
                let minutes = this.time.getMinutes() < 10 ? "0" + this.time.getMinutes() : this.time.getMinutes();
                return this.time.getFullYear() + "年" + (this.time.getMonth() + 1) + "月" +
                    this.time.getDate() + "日 " + hours + ":" + minutes;
            },


        },
        methods: {
            itemClickHandler(idx) {
                this.currClicked = idx;
                if (idx == 1) {
                    this.isCatCpnDisappear = false;
                    let Cats = this.category.split(" ");
                    this.$refs.cat.setValues([Cats[0], Cats[2]]);
                }
                if (idx == 2) {
                    this.isAccountDisappear = false;
                    let accounts = this.account.split(" ");
                    this.$refs.account.setValues([accounts[0], accounts[2]]);
                }
                if (idx == 3) {
                    this.isDateCnpDisappear = false;
                }
                if (idx == 4) {
                    this.note = this.note == "..." ? "" : this.note;
                }
            },

            // 数字键盘组件相关处理
            inputClickHandler() {
                this.currClicked = 0;
            },
            blurHandler() {
                this.currClicked = 10;
            },
            // van-number-keyboard组件一旦进行数据双向绑定(v-model)后, 则按照组件内部实现的onDelete方法来更新数据。此时使用onDelete无效。
            // 需要解除双向绑定，然后手写OnInput和onDelete方法。
            onInput(key) {
                this.num += key;
                // 用户异常输入，存在小数点的情况下，连续两个小数点.
                // 按小数点划分，取整数部分和小数部分中间拼接一个.
                if (this.num.indexOf(".") != -1) {
                    let interger = this.num.split('.')[0];
                    let decimal = this.num.split('.')[1];
                    // 小数点前没有数字或者小数点前都是零
                    if (!interger || parseInt(interger) == 0) {
                        interger = "0"
                    }
                    // 用户输入小数点后三位
                    if (decimal.length > 2) {
                        decimal = decimal.slice(0, 2);
                    }
                    this.num = interger + "." + decimal;
                } else {
                    // 整数(防止输入为00000)
                    this.num = parseInt(this.num) + "";
                }
            },
            onDelete() {
                if (this.num[this.num.length - 1] == ".") {
                    this.num = this.num.slice(0, this.num.length - 2)
                } else {
                    this.num = this.num.slice(0, this.num.length - 1);
                }
            },


            // 分类组件相关处理
            catChangeHandler(picker) {
                this.category = picker.getValues()[0].text + " > " + picker.getValues()[1].text;
                // console.log(picker.getValues()[0].text, picker.getValues()[1].text)
                // console.log(picker.setValues(["吃", "零食"]))
            },
            catConfirmHandler(value) {
                this.isCatCpnDisappear = true;
                this.currClicked = -1;
            },


            // 账户组件相关处理
            accountChangeHandler(picker) {
                this.account = picker.getValues()[0].text + " > " + picker.getValues()[1].text;
            },
            accountConfirmHandler(value) {
                this.isAccountCpnDisappear = true;
                this.currClicked = -1;
            },


            // 时间组件相关处理
            formatterHandler(type, val) {
                if (type === 'year') {
                    return val + '年';
                }
                if (type === 'month') {
                    return val + '月';
                }
                if (type === 'day') {
                    return val + '日';
                }
                if (type === 'hour') {
                    return val + '时';
                }
                if (type === 'minute') {
                    return val + '分';
                }
                return val;
            },
            dateConfirmHandler(value) {
                this.isDateCnpDisappear = true;
                this.currClicked = -1;
            },
        }
    }
</script>

<style>
    .bill-bar-number {
        height: 80px;
        line-height: 80px;
        margin: 30px 0 30px 30px;
    }

    .bill-bar-number input {
        padding: 0;
        border: 0 transparent;
        width: 100%;
        font-size: 40px;
        /* color: #04BE02; */
        caret-color: transparent;
        /* border-bottom: 1px solid #04BE02; */
        border-bottom-style: solid;
    }

    .bill-bar-pop {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 1px 5px 1px rgba(0, 0, 0, .2);
    }

    .pulldown {
        height: 16px;
    }
</style>