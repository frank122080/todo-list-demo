<template>
  <Modal v-model="isModalOpen" :mask-closable="false">
    <!-- Upload 文件 https://www.iviewui.com/components/upload -->
    <Upload
      :before-upload="handleUpload"
      :format="uploadFormatList"
      :accept="uploadAcceptString"
      :action="uploadUrl"
      :on-format-error="handleFormatError"
    >
      <Button type="primary" icon="ios-cloud-upload-outline">{{buttonText}}</Button>
    </Upload>
    <h3 v-if="jsonData[0]">上傳成功</h3>
    <Row>
      轉換前（複製要轉換的i18n檔案內容貼上)
      <Col span="24">
        <Input v-model="i18nData" type="textarea" :autosize="{minRows: 2, maxRows: 6}"/>
      </Col>
    </Row>
    <Button type="primary" @click="i18nDataTransfer" style="margin: 10px auto 10px;">轉換</Button>
    <Row>
      轉換後
      <Col span="24">
        <Input v-model="i18nDataResult" type="textarea" :autosize="{minRows: 2, maxRows: 6}"/>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import XLSX from 'xlsx'

export default {
  data () {
    return {
      uploadFormatList: ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv', 'txt'], /** 範例 : ['csv', 'txt'] */
      uploadAcceptString: '.xlsx,.xlc,.xlm,.xls,.xlt,.xlw,.csv,.txt', /** 範例 : '.csv,.txt' */
      file: null,
      jsonData: [],
      i18nData: '',
      i18nDataResult: '',
      isModalOpen: true
    }
  },
  props: {
    uploadUrl: {
      type: String,
      default: '//jsonplaceholder.typicode.com/posts/' /*  iview 包裝好的方法，檔案讀入完成後會自動上傳的位置 */
    },
    isAutoUpload: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: '上傳excel檔案'
    }
  },
  methods: {
  //! -------------------------handler區開始
    handleUpload (file) {
      this.file = file
      if (!this.isAutoUpload) {
        this.manualHandleUploadData(file)
      }
      return this.isAutoUpload
    },
    handleFormatError (file) {
      this.$Notice.error({
        title: 'NOT_ALLOW_FILE_TYPE'
      })
    },
    /** 手動控制回傳資料 */
    async manualHandleUploadData (file) {
      try {
        await this.manualCheckFileType(file)
        const reader = new FileReader() // 原生物件
        reader.readAsBinaryString(file) // , xlsx 要用 SheetJS 轉換成 JSON，SheetJS xlsx 相關文件 https://www.npmjs.com/package/xlsx
        reader.onload = (data) => {
          const xlsxTemp = XLSX.read(data.target.result, {
            type: 'binary'
          })
          xlsxTemp.SheetNames.forEach(sheetName => {
            const rawJsonData = XLSX.utils.sheet_to_json(xlsxTemp.Sheets[sheetName])
            this.jsonData = rawJsonData
          })
        }
      } catch (err) {
        console.error(err.message)
        this.jsonData = []
      }
    },
    /** 手動檢查檔案類型 */
    async manualCheckFileType (file) {
      const fileType = file.name.split('.')[file.name.split('.').length - 1]
      return new Promise((resolve, reject) => {
        if (this.uploadFormatList.includes(fileType)) {
          resolve()
        } else {
          reject(Error('NOT_ALLOW_FILE_TYPE'))
        }
      })
    },
    /** i18n翻譯文字取代 */
    async i18nDataTransfer () {
      let result = this.i18nData
      for (const item of this.jsonData) {
        if (item.翻譯文字) {
          const originText = this.regExpHandler(item.原始文字)
          result = result.replace(new RegExp(`'${originText}'`), `'${item.翻譯文字}'`)
          result = result.replace(new RegExp(`"${originText}"`), `"${item.翻譯文字}"`)
        }
      }
      result = result.replaceAll(/(\w)'t/g, '$1\\\'t')
      result = result.replaceAll(/(\w)'s/g, '$1\\\'s')
      this.i18nDataResult = result
    },
    /** RegExp特殊符號處理 */
    regExpHandler (text) {
      const specialSymbol = ['.', '\\', '+', '-', '*', '?', '^', '$', '&', '[', ']', '{', '}', '(', ')', '|', '/']
      let regExp = text
      for (const item of specialSymbol) {
        regExp = regExp.replaceAll(item, `\\${item}`)
      }
      return regExp
    }
  //! -------------------------handler區結束
  },
  components: {
  }
}
</script>
