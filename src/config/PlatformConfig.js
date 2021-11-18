//! 開始做專案，這裡沒用到的圖、config沒用到的key，要刪掉！！！
import yuanbaoLogo from '../assets/platformConfig/logo_yb.png'
import yuanbaoLogoMobile from '../assets/platformConfig/yuanbao-logo-mobile.png'

let platformConfig = {}
const beforeOnlineConfig = {
  title: 'beforeOnline'
}
const devConfig = {
  logo: yuanbaoLogo,
  logoMobile: yuanbaoLogoMobile,
  appId: 'dev-id',
  locale: {
    cn: 'CN',
    tw: 'TW'
  },
  title: 'devTitle'
}
switch (process.env.VUE_APP_TITLE) {
  case 'beforeOnline':
    platformConfig = beforeOnlineConfig
    break
  default:
    platformConfig = devConfig
}
export default platformConfig
