<template>
    <div>
        <line-chart class="chart" :xData="line_xData" :yData="line_yData"></line-chart>
        <pie-chart class="chart" :catData="pie_data"></pie-chart>
    </div>
</template>
<script>

    import LineChart from "components/content/charts/LineChart.vue"
    import PieChart from "components/content/charts/PieChart.vue"

    import { baseRequest } from "@/network/request.js"

    export default {
        components: {
            LineChart,
            PieChart,
        },
        data() {
            return {
                line_xData: [],
                line_yData: [],
                pie_data: [],
            }
        },
        created() {
            this.getData();
        },
        methods: {
            async getData() {
                const { data: ret } = await baseRequest({
                    url: "/getOutIn",
                    params: { "userid": 1, "time": "2021/8", "isMonth": true }
                })
                this.line_xData = ret.title;
                this.line_yData = ret.out;
                this.pie_data = ret.catOut;
            }
        }
    }
</script>
<style>
    .chart {
        width: 80%;
        height: 300px;
        margin: 0 auto;
    }
</style>