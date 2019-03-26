/**
 * webpack配置文件——h5端
 * */
var path = require('path')
var virtualDIR='/tyfp/mobile'

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  common: {
    importFilePath: '../client/mobile',// 引入模板路径——以context路径为基准。默认为以进程当前的工作目录process.cwd()
    staticPath: 'client/mobile/static',// 引入项目静态文件路径
    cleanDir: 'public'+virtualDIR,// 清除打包文件夹名
    cleanPath: resolve('server')// 清除根路径
  },
  prod: {
    env: 'production',
    assetsPublicPath: virtualDIR+'/',// 输出js文件引用路径
    assetsRoot: resolve('server/public'+virtualDIR),// 输出js文件路径
    assetsSubDirectory: 'static',// 输出静态文件【如css、common chunk等】 文件夹名
    cssSourceMap: false// 是否启用source map
  },
  dev: {
    env: 'development',
    assetsPublicPath: virtualDIR+'/',// 输出js文件引用路径
    assetsRoot: resolve('server/public'+virtualDIR),// 输出js文件路径
    assetsSubDirectory: 'static',// 输出静态文件【如css、common chunk等】 文件夹名
    cssSourceMap: false,// 是否启用source map
    // devServer
    devServer: {
      contentBase: resolve('server/public'),
      publicPath: virtualDIR,// 静态文件虚拟目录——use()
      host: '0.0.0.0',
      port: '9101',
      hot: true,
      inline: true,
      clientLogLevel: "none",
      open: false,
      historyApiFallback: true,
      disableHostCheck: true,
      compress: true,
      stats: { colors: true },
      proxy: {
        "/tyfp": {
          target: "http://0.0.0.0:9100",
          changeOrigin: true,
          bypass:function(req,res){
            if(req.url===virtualDIR){
              res.redirect(virtualDIR+'/home/index.html')
            }
          }
          // pathRewrite: {"/mobile/api": "/api"}
        }
      }
    }
  }
}
