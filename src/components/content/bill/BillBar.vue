<template>
    <div class="bill-bar">


        <!-- 金额 -->
        <!-- <div class="bill-bar-number">
            <input class="num-input" type="text" :value="numShow" :class="[{'outStyle': isOut}, {'inStyle': !isOut}]"
                :style="NumBoxClickBorderStyle" @click="itemClickHandler(0)">
        </div> -->

        <div class="bill-bar-number">
            <div class="num-input" :class="[{'outStyle': isOut}, {'inStyle': !isOut}]" :style="NumBoxClickBorderStyle"
                @click="itemClickHandler(0)">
                {{numShow}}
            </div>
        </div>

        <!-- 分类 -->
        <div class="bill-bar-item" @click="itemClickHandler(1)" :class="{'clickStyle': currClicked==1}">
            <div class="name">
                <img src="~assets/img/cate.svg">
                <span>分类</span>
            </div>
            <div class="text">
                <span>{{this.category}}</span>
            </div>
        </div>

        <!-- 账户 -->
        <div class="bill-bar-item" @click="itemClickHandler(2)" :class="{'clickStyle': currClicked==2}">
            <div class="name">
                <img src="~assets/img/account.svg">
                <span>账户</span>
            </div>
            <div class="text">
                <span>{{this.account}}</span>
            </div>
        </div>

        <!-- 时间 -->
        <div class="bill-bar-item" @click="itemClickHandler(3)" :class="{'clickStyle': currClicked==3}">
            <div class="name">
                <img src="~assets/img/time.svg">
                <span>时间</span>
            </div>
            <div class="text">
                <span>{{timeShow}}</span>
            </div>
        </div>

        <!-- 备注 -->
        <div class="bill-bar-item" @click="itemClickHandler(4)" :class="{'clickStyle': currClicked==4}">
            <div class="name">
                <img src="~assets/img/note.svg">
                <span>备注</span>
            </div>
            <div class="text">
                <input type="text" v-model="note" placeholder="..."></input>
            </div>
        </div>


        <div class="bill-bar-pop">
            <van-number-keyboard :show="isNumCpnShow" theme="custom" extra-key="." close-button-text="完成"
                @blur="blurHandler" @delete="onDelete" @input="onInput" />

            <van-picker show-toolbar ref="cat" v-show="isCatCpnShow" :columns="cats" cancel-button-text=" "
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
    import { NumberKeyboard, Picker, DatetimePicker, Dialog } from 'vant';


    export default {
        components: {
            [NumberKeyboard.name]: NumberKeyboard,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,
            [Dialog.name]: Dialog,
        },
        props: {
            isOut: {
                type: Boolean,
                default: true,
            },
            trys: {
                type: Number,
                default: 0,
            },
            billData: {
                type: Object,
                default: () => {
                    return {
                        num: "",
                        category: "",
                        account: "",
                        time: new Date(),
                        note: "",
                    }
                }
            }

        },
        data() {
            return {

                currClicked: 0,

                // 用户数据
                // defaultData: {},
                num: this.billData.num,
                category: this.billData.category,
                // category: this.billData.category === "" ? this.cats[0].text + " > " + this.cats[0].children[0].text : this.billData.category,
                account: this.billData.account,
                // account: this.billData.account === "" ? this.accountCols[0].text + " > " + this.accountCols[0].children[0].text : this.billData.account,
                time: this.billData.time,
                note: this.billData.note,

                // 超出预算提醒
                remind: true,

                // 类别级联数据
                outCatCols: [
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
                inCatCols: [
                    {
                        text: "营业收入",
                        children: [{ text: "工资" }, { text: "兼职" }]
                    },
                    {
                        text: "金融投资",
                        children: [{ text: "利息" }, { text: "保险" }, { text: "退税" }]
                    },
                    {
                        text: "其他收入",
                        children: [{ text: "意外收入" }, { text: "退货退款" }]
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
            // console.log(this.time instanceof Date)
            // if (!this.time instanceof Date) {
            //     this.time = new Date(this.time)
            // }
            // console.log(this.time)
            this.category = this.category === "" ? this.cats[0].text + " > " + this.cats[0].children[0].text : this.category;
            this.account = this.account === "" ? this.accountCols[0].text + " > " + this.accountCols[0].children[0].text : this.account;
        },
        computed: {

            // 根据props返回默认的 记账分类 和 账户分类
            // defaultCat(){
            //     return this.billData.category === "" ? this.cats[0].text + " > " + this.cats[0].children[0].text : this.billData.category;
            // },
            // defaultAcnt(){
            //     return this.billData.account === "" ? this.accountCols[0].text + " > " + this.accountCols[0].children[0].text : this.billData.account;
            // },

            // 支出收入分类
            cats() {
                return this.isOut ? this.outCatCols : this.inCatCols;
            },

            // 下拉菜单的隐显
            isNumCpnShow() {
                return this.currClicked == 0;
            },
            isCatCpnShow() {
                return this.currClicked == 1 && !this.isCatCpnDisappear;
            },
            isAccountCpnShow() {
                return this.currClicked == 2 && !this.isAccountDisappear;
            },
            isTimeCnpShow() {
                return this.currClicked == 3 && !this.isDateCnpDisappear;
            },

            // 数据的展示
            numShow() {
                return this.num == "" ? "0.00" : parseFloat(this.num).toFixed(2);
            },
            timeShow() {
                // console.log(this.time)
                let month = this.time.getMonth() + 1 < 10 ? "0" + (this.time.getMonth() + 1) : this.time.getMonth() + 1;
                let date = this.time.getDate() < 10 ? "0" + this.time.getDate() : this.time.getDate();
                let hours = this.time.getHours() < 10 ? "0" + this.time.getHours() : this.time.getHours();
                let minutes = this.time.getMinutes() < 10 ? "0" + this.time.getMinutes() : this.time.getMinutes();
                return this.time.getFullYear() + "年" + month + "月" + date + "日 " + hours + ":" + minutes;
            },

            // 金额被点击时的样式
            NumBoxClickBorderStyle() {
                return this.isNumCpnShow ? { "borderBottomWidth": "2px" } : { "borderBottomWidth": "1px" }
            },

        },
        methods: {
            // 点击事件
            itemClickHandler(idx) {
                this.currClicked = idx;
                if (idx == 1) {
                    this.isCatCpnDisappear = false;
                    console.log(this.category);
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

            blurHandler() {
                this.currClicked = -1;
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
        },
        watch: {
            trys(newVal, oldVal) {
                if (newVal > 0) {
                    // 对日期进行处理
                    // 发送网络请求时，会调用toJSON方法 将Date类型转换为JSON类型(转为UTC格式,滞后北京8小时)
                    // 重写toJSON方法: 将Date类型转为 2021/08/07 07:05:01
                    Date.prototype.toJSON = function () {
                        let year = this.getFullYear();
                        let month = this.getMonth() + 1 < 10 ? "0" + (this.getMonth() + 1) : this.getMonth() + 1;
                        let date = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
                        let hour = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
                        let min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
                        return year + "/" + month + "/" + date + " " + hour + ":" + min;
                    }
                    let timeJSON = this.time.toJSON();
                    // 对记账数据进行处理
                    let numJSON = this.num == "" ? 0 : this.num;
                    // 传进来的记账金额，要在预算中加上这部分。
                    let preNum = this.billData.num == "" ? 0 : this.billData.num;

                    // 编辑支出 且 预算不够 且 remind==true
                    let rest = parseFloat(this.$store.state.rest) + parseFloat(preNum) - parseFloat(this.num);
                    console.log(this.isOut)
                    if (this.isOut && rest < 0 && this.remind) {
                        this.$dialog.confirm({
                            message: '您本月预算不够了！',
                            confirmButtonText: "不再提醒"
                        }).then((comfirm) => {
                            this.remind = false;
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        this.$emit("getData", {
                            "num": numJSON,
                            // "time": timeJSON,
                            "time": this.time,
                            "isOut": this.isOut,
                            "category": this.category,
                            "account": this.account,
                            "note": this.note
                        })
                    }
                    // console.log("billbar中", this.time)
                }
            },
            isOut(newVal, oldVal) {
                this.currClicked = 0;
                this.category = this.cats[0].text + " > " + this.cats[0].children[0].text;
                this.account = this.accountCols[0].text + " > " + this.accountCols[0].children[0].text;
            }
        }
    }
</script>

<style>
    .bill-bar-number {
        height: 80px;
        line-height: 80px;
        margin: 15px 0 15px 30px;
    }

    .bill-bar-number .num-input {
        padding: 0;
        border: 0;
        width: 100%;
        font-size: 40px;
        /* 光标透明 */
        caret-color: transparent;
        border-bottom-style: solid;
        text-align: left;
    }

    .bill-bar-item {
        display: flex;
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
    }

    .bill-bar-item .name {
        display: flex;
        align-items: center;
        border-bottom: solid 1px #f6f6f6;
        flex: 1;
    }

    .bill-bar-item .text {
        border-bottom: solid 1px #f6f6f6;
        flex: 3
    }

    .bill-bar-item .name img {
        width: 20px;
        margin-right: 10px;
    }

    .bill-bar-item .name span {
        font-size: 14px;
    }

    .bill-bar-item .text span {
        display: inline-block;
        width: 100%;
        height: inherit;
        font-size: 16px;
        background-color: transparent;
    }

    .bill-bar-item .text input {
        padding: 0;
        border: 0;
        background-color: transparent;
        width: 80%;
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

    .outStyle {
        color: #04BE02;
    }

    .inStyle {
        color: red;
    }

    .clickStyle {
        background-color: #f6f6f6;
    }
</style>