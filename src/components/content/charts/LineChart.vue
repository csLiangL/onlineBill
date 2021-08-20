<template>
    <div class="line-container" ref="line_chart">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                chartInstance: null,
                // allData: null,    // 服务器返回的数据
            }
        },

        mounted() {
            this.initChart();
            this.getData();
        },

        methods: {
            initChart() {
                this.chartInstance = this.$echarts.init(this.$refs.line_chart);
                console.log("initChart", this.chartInstance)
            },
            getData() {
                console.log("getData")
                this.updateChart();
            },
            updateChart() {
                console.log("updateChart")
                const option = {
                    grid: {
                        left: "18%",
                    },

                    tooltip: {
                        trigger: 'axis'
                    },

                    xAxis: {
                        type: 'category',
                        data: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7',]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1000, 820, 932, 901, 934, 1290, 1330, 1000],
                        type: 'line',
                        smooth: true
                    }]
                };
                this.chartInstance.setOption(option);
            }
        }
    }
</script>

<style>
    .line-container {
        width: 100%;
        height: 300px;
    }
</style>