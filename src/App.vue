<template>
  <div :id="appId">
    <router-view/>
    <!-- <ExcelFileToi18n /> -->
  </div>
</template>

<script>
import platformConfig from './config/PlatformConfig'
// import { autoExtractCnTextToExcel } from '@/util/autoExtractI18n' // 自動提取i18n檔裡的中文(簡、繁) /** 需安裝xlsx套件 */
// import ExcelFileToi18n from '@/pc/components/ExcelFileToi18n' // 自動把翻譯好的excel檔取代回原本的i18n文本 /** 需安裝xlsx套件 */
export default {
  name: 'App',
  mounted () {
    document.title = this.$t(this.title)
    // autoExtractCnTextToExcel('en') // autoExtractCnTextToExcel(`${i18n檔名}`)，自動提取i18n檔裡的中文(簡、繁)，預設讀取@/lang/en.js(不帶任何參數)，
  },
  data () {
    return {
      appId: platformConfig.appId,
      title: platformConfig.title
    }
  },
  methods: {
  },
  components: {
    // ExcelFileToi18n // 自動把翻譯好的excel檔取代回原本的i18n文本
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/dev/index.scss';
/* 拼音文字不斷字 開始 */
.v-transfer-dom,
.ivu-notice{
  word-wrap: break-word;
}
.ivu-table-cell {
  word-break: break-word;
}
/* 拼音文字不斷字 結束*/
/* 共用區開始 */
.width-100 {
  width: 100%;
}
/* 共用區結束 */
/* 選單共用開始 */
/* 選單共用結束 */
</style>
