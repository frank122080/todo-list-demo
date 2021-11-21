export const pickerOptionsToToday = {
    disabledDate (date) {
        return date && date.valueOf() <= Date.now() - 86400000
    },
}
