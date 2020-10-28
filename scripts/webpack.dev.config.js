
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const os = require('os');
let selfIp = 'localhost';
/* try {
    const networkInterfaces = os.networkInterfaces();
    // console.log('networkInterfaces:', networkInterfaces)
    const en0Arr = os.networkInterfaces()['en0'].filter(a => a.family === 'IPv4')
    console.log('en0Arr:', en0Arr)
    selfIp = en0arr[0].address;
    console.log('selfIp:', selfIp)
    // selfIp = os.networkInterfaces()['WLAN'][1].address;
} catch (e) {
    selfIp = 'localhost'
} */

const PORT = 8888
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  mode: 'development',
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMENT: true,
    }),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('../app/index.html'),
      dlls: [],
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('../app'),
    historyApiFallback: false,
    open: true,
    hot: true, 
    host: selfIp,
    port: PORT,
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
