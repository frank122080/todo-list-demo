import platformConfig from '@/config/PlatformConfig'

export const localeMap = {
  // 简中
  zh: 'cn',
  cn: 'cn',
  //  繁中
  'zh-tw': 'tw',
  tw: 'tw',
  //  英文
  en: 'en',
  //  泰文
  th: 'th',
  //  越文
  vi: 'vi',
  //  西文
  es: 'es',
  //  俄文
  ru: 'ru'
}

export const languageSet = () => {
  const originalLanguage = (navigator.language || navigator.browserLanguage).toLowerCase()
  sessionStorage.setItem('originalLanguage', originalLanguage)
  const language = languageMapping(originalLanguage)
  if (!sessionStorage.getItem('locale')) {
    sessionStorage.setItem('locale', language)
  }
}

const languageMapping = originalLanguage => {
  let languageAfterMapping = ''
  languageList.forEach(language => {
    if (originalLanguage.includes(language)) {
      if (language === 'zh' && originalLanguage === 'zh-tw') {
        // 避免繁中轉成簡中
        // 避免繁中轉成簡中
        // 避免繁中轉成簡中
      } else {
        languageAfterMapping = language
      }
    }
  })
  const languageAfterPlatformConfigMapping = languagePlatformConfigMapping(languageAfterMapping)
  return languageAfterPlatformConfigMapping
}

const languagePlatformConfigMapping = languageAfterMapping => {
  const defaultLocale = Object.keys(platformConfig.locale)[0]
  const languageAfterPlatformConfigMapping = !languageAfterMapping ? defaultLocale : platformConfig.locale[localeMap[languageAfterMapping]] ? localeMap[languageAfterMapping] : defaultLocale
  return languageAfterPlatformConfigMapping
}

const languageList = ['zh', 'zh-tw', 'en', 'th', 'vi', 'es', 'ru']
