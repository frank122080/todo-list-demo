import XLSX from 'xlsx'

export async function autoExtractCnTextToExcel (i18nName = 'en') {
  const i18n = await import(`@/lang/${i18nName}.js`)
  const i18nObjcet = { ...i18n.default }
  const keys = Object.keys(i18nObjcet)
  const excel = autoExtractCnText(keys, i18nObjcet)
  const excelList = {
    name: '多國語系翻譯.xlsx',
    content: [{ name: '多國語系翻譯', content: excel }]
  }
  excelFileOutput(excelList)
}

const autoExtractCnText = (keys, i18nObjcet) => {
  return keys.filter(key => String(i18nObjcet[key]).split('').find(item => item.match(/[\u4E00-\u9FA5]/)))
    .map(key => {
      return {
        keyName: key,
        原始文字: i18nObjcet[key],
        翻譯文字: ''
      }
    })
}

const excelFileOutput = (excel) => {
  const totalContent = excel.content
  const wb = XLSX.utils.book_new()
  const wbName = excel.name

  for (const item in totalContent) {
    const everyContent = XLSX.utils.json_to_sheet(totalContent[item].content)
    const contentName = totalContent[item].name
    XLSX.utils.book_append_sheet(wb, everyContent, contentName)
  }

  XLSX.writeFile(wb, wbName)
}
