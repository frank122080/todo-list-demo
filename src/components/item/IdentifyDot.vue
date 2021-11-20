<template>
  <span>
    <Tooltip placement="top" :content="toolTipText" :disabled="toolTipDisabled">
        <div class='dot' :style='{height: `${size}px`,width: `${size}px`, backgroundColor: color}'/>
    </Tooltip> 
  </span>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 10
        },
        type: {
            type: String,
            default: 'normal'
        },
        toolTipDisabled: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        color: function () {
            const colorMap = {
                'very-important': 'red',
                important: 'orange',
                normal: '#19be6b',
                'not-important': 'gray'
            }
            return colorMap[this.type]
        },
        toolTipText: function () {
            const textMap = {
                'very-important': '非常重要',
                important: '重要',
                normal: '一般',
                'not-important': '隨緣'
            }
            return textMap[this.type]
        }
    }
}
</script>

<style lang="scss" scoped>
.dot {
    display: inline-block;
    margin-right: 5px;
    margin-left: 5px;
    border-radius:999rem;
}
</style>
