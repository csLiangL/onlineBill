<template>
    <div class="line-container" ref="line_chart">
    </div>
</template>

<script>

    export default {

        props: {
            x: {
                type: Array,
                default: () => []
            },
            y: {
                type: Array,
                default: () => []
            }
        },

        mounted() {
            this.initChart();
        },

        methods: {
            initChart() {
                // console.log("initCharts", this.x, this.y)
                let chartInstance = this.$echarts.init(this.$refs.line_chart);
                const option = {
                    grid: {
                        left: "18%",
                    },

                    tooltip: {
                        trigger: 'axis'
                    },

                    xAxis: {
                        type: 'category',
                        data: this.x,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.y,
                        type: 'line',
                        smooth: true
                    }]
                };
                chartInstance.setOption(option);
            },
        }
    }
</script>

<style>
    .line-container {
        width: 100%;
        height: 300px;
    }
</style>