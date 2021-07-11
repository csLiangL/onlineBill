const path = require('path');
function resolve (dir) {
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
        resolve:{
            alias:{
                "assets": "@/assets",
                "components": "@/components",
                "views": "@/views"
            }
        }
    }
}