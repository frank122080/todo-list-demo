const path = require('path')

const platformConfigList = {
  
  beforeOnline: {
    icon: 'public/favicon_multi_chain.ico'
  }
}
const icon = platformConfigList[process.env.VUE_APP_TITLE] ? platformConfigList[process.env.VUE_APP_TITLE].icon : ''
const publicPath = process.env.NODE_ENV === 'production' ? './' : '/'

const exportObject = { publicPath }

if (icon) {
  exportObject.chainWebpack = config => {
    config.plugin('html').tap(
      args => {
        args[0].favicon = path.resolve(icon)    
        return args /* 传递给 html-webpack-plugin's 构造函数的新参数 */
      }
    )
  }
}
exportObject.transpileDependencies = [] // ! 為了適配 ES6 IE，第三方套件需要加

module.exports = exportObject
