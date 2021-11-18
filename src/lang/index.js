import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from 'view-design/dist/locale/en-US'
import zh from 'view-design/dist/locale/zh-CN'
import tw from 'view-design/dist/locale/zh-TW'
// import thai from 'view-design/dist/locale/th-TH'
// import vi from 'view-design/dist/locale/vi-VN'
// 以下各個語言檔
import langZh from './zh'
import langTW from './tw'
import langEn from './en'
// import langThai from './thai'
// import langVi from './vi'
// 語言Map
import { languageSet } from '../util/locale'

Vue.use(VueI18n)
Vue.locale = () => { }
const messages = {
  en: Object.assign(langEn, en),
  cn: Object.assign(langZh, zh),
  tw: Object.assign(langTW, tw)
  // ภาษาไทย: Object.assign(langThai, thai),
  // 'Tiếng Việt': Object.assign(langVi, vi)
}

languageSet()
const locale = sessionStorage.getItem('locale')
const i18n = new VueI18n({
  locale, // set locale
  messages // set locale messages
})

Vue.prototype._i18n = i18n

export default i18n
