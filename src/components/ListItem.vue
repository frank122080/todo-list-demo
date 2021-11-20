<template>
  <div>
      <Card>
        <div class="titleArea">
            <span>
                <Icon v-if="data.status" size=30 class="done" type="md-checkmark-circle" />
                <Icon v-else-if="timeOut" size=30 class="timeOut" type="md-close-circle" />
                <Icon v-else size=30 class="timeIn" type="md-clock" />
                <IdentifyDot :size="12" :type="data.type" :toolTipDisabled="false"/>
                <span>
                    {{data.title}}
                </span>
            </span>
            <span v-if="!data.status">
                <Checkbox v-model="data.status" size='large'>&#x3000;</Checkbox>
            </span>
        </div>
        <Divider />
        <div>
            {{data.text}}
        </div>
        <Divider />
        <div>
            截止時間
            <span>{{new Date(data.time).toLocaleDateString()}}</span>
        </div>
      </Card>
  </div>
</template>

<script>
import IdentifyDot from './item/IdentifyDot.vue'
export default {
    created () {
        this.timeCheck()
    },
    props: {
        data: {
            type: Object,
            require: true
        },
        onChange: {
            type: Function,
            require: true
        }
    },
    data () {
        return {
            timeOut: false
        }
    },
    methods: {
        timeCheck () {
            this.timeOut = this.data.time < Date.now()
        }
    },
    components: {
        IdentifyDot
    }
}
</script>

<style lang="scss" scoped>
.titleArea {
    display: flex;
    justify-content: space-between;
}
.done {
    color: green;
}
.timeIn {
    color: orange;
}
.timeOut {
    color: red;
}
</style>
