const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
// 项目的主要配置文件
module.exports = {
    publicPath: "./",
    devServer: {
        open: true
    },
    // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
    configureWebpack: {
        resolve: {
            alias: {
                "assets": "@/assets",
                "components": "@/components",
                "views": "@/views"
            }
        }
    },
    pwa: {
        iconPaths: {
            favicon64: './favicon.ico',
            favicon32: './favicon.ico',
            favicon16: './favicon.ico',
            appleTouchIcon: './favicon.ico',
            maskIcon: './favicon.ico',
            msTileImage: './favicon.ico'
        }
    },
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。

                modifyVars: {
                    // 直接覆盖变量
                    'picker-toolbar-height': '30px',
                    'cell-font-size': '16px'
                    // // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                    // hack: `true; @import "your-less-file-path.less";`,
                },

            },
        },
    },
}