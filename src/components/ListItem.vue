<template>
  <div class="list-item">
      <Card>
        <div class="title-area">
            <span>
                <span>
                    <Icon v-if="data.status" size=30 class="done" type="md-checkmark-circle" />
                    <Icon v-else-if="timeOut" size=30 class="time-out" type="md-close-circle" />
                    <Icon v-else size=30 class="time-in" type="md-clock" />
                </span>
                <span>
                    <IdentifyDot :size="12" :type="data.type" :toolTipDisabled="false"/>
                </span>
                <span class="text">
                    <p v-if="!isEdit">{{data.title}}</p>
                    <Input v-else v-model="editData.title"/>
                </span>
            </span>
            <span v-if="!isEdit">
                <Button class="margin-right-5" v-if="!data.status" type='primary' icon="md-checkmark" @click="clickDone"></Button>
                <Button class="margin-right-5" v-if="!data.status" type='warning' icon="md-create" @click="edit"></Button>
                <Button type='error' icon="md-trash" @click="clickDelete"></Button>
            </span>
            <span v-else>
                <Button class="margin-right-5" type='success' icon="md-checkmark" @click="update"></Button>
                <Button type='error' icon="md-close" @click="cancelEdit"></Button>
            </span>
        </div>
        <Divider orientation="left">內容</Divider>
        <div>
            <p v-if="!isEdit">{{data.text}}</p>
            <Input v-else v-model="editData.text" type='textarea' :maxlength='100' show-word-limit/>
        </div>
        <Divider orientation="left">時間</Divider>
        <div class="time-area">
            <span >
                截止時間：
                <span v-if="!isEdit" :class="timeOut&&!data.status ? 'time-out ': ''">
                    {{data.time ? new Date(data.time).toLocaleDateString() : ''}}
                </span>
                <DatePicker style="width: 120px" v-else v-model="editData.time" :options="pickerOptionsToToday" ></DatePicker>
            </span>
            
            <span>新增時間：{{new Date(data.createTime).toLocaleDateString()}}</span>
            <span>修改時間：{{data.editTime ? new Date(data.editTime).toLocaleDateString() : '未修改'}}</span>
        </div>
      </Card>
  </div>
</template>

<script>
import IdentifyDot from './item/IdentifyDot.vue'
import { pickerOptionsToToday } from '@/util/date'

export default {
    created () {
        this.timeCheck()
    },
    props: {
        data: {
            type: Object,
            require: true
        },
        done: {
            type: Function,
            require: true
        }
    },
    data () {
        return {
            pickerOptionsToToday,
            timeOut: false,
            isEdit: false,
            editData: {
                type: '',
                title: '',
                text: '',
                time: ''
            }
        }
    },
    methods: {
        clickDone () {
            this.data.status = true
            this.$emit('done')
        },
        clickDelete () {
            this.$emit('delete')
        },
        edit () {
            Object.keys(this.editData).forEach(key => {
                key === 'time' ? this.editData[key] = new Date(this.data[key]) : this.editData[key] = this.data[key]
            })
            this.isEdit = true
        },
        update () {
            Object.keys(this.editData).forEach(key => {
                key === 'time' ? this.data[key] = new Date(this.editData[key]).getTime() : this.data[key] = this.editData[key]
            })
            this.data.editTime = Date.now()
            this.isEdit = false
            this.timeCheck()
        },
        cancelEdit () {
            this.isEdit = false
        },
        timeCheck () {
            this.timeOut = this.data.time < Date.now()
        }
    },
    components: {
        IdentifyDot
    }
}
</script>

<style>

</style>
