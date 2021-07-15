<template>
    <div class="bill-bar-item" :style="{backgroundColor: backgroundColor}" @click="itemClickHandler">
        <div class="name">
            <slot name="icon"></slot>
            <slot name="name"></slot>
        </div>
        <div class="text">
            <slot name="text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                backgroundColor: "#fff"
            }
        },
        methods: {
            itemClickHandler() {
                this.backgroundColor = "#f6f6f6";
            }
        }
    }
</script>

<style>
    /* item高度: 50px;
       左margin: 30px    
            图标height: 20px
            字体大小:14px
         */
    .bill-bar-item {
        display: flex;
        height: 50px;
        line-height: 50px;
        /* margin-left: 30px; */
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

    .bill-bar-item .text input {
        padding: 0;
        border: 0;
        width: 100%;
        font-size: 16px;
        background-color: transparent;
    }
</style>