<template>
  <div class="add-todo">
    <Button type='primary' icon="md-add" @click="openDrawer" ></Button>
    <Drawer 
        v-model="isDrawerOpen"
        title="新增"
        placement="left"
        width="500"
    >
        <Form>
            <FormItem label='截止時間'>
                <DatePicker v-model="form.time" :options="pickerOptionsToToday"></DatePicker> 
            </FormItem>
            <FormItem label='重要程度'>
                <RadioGroup v-model="form.level">
                    <Radio label='very-important'>
                        <IdentifyDot :type='"very-important"'/>
                        <span>非常重要</span>
                    </Radio>
                    <Radio label='important'>
                        <IdentifyDot :type='"important"'/>
                        <span>重要</span>
                    </Radio>
                    <Radio label='normal'>
                        <IdentifyDot :type='"normal"'/>
                        <span>一般</span>
                    </Radio>
                    <Radio label='not-important'>
                        <IdentifyDot :type='"not-important"'/>
                        <span>隨緣</span>
                    </Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="標題" inline>
                <Input v-model="form.title" />
            </FormItem>
            <FormItem label='內容'>
                <Input v-model="form.text" type='textarea' :maxlength='100' show-word-limit/>
            </FormItem>
        </Form>
        <div class='drawer-footer'>
            <Button type='primary' @click="submitForm">新增</Button>
            <Button @click="cancelAdd">取消</Button>
        </div>
    </Drawer>

  </div>
</template>

<script>
import IdentifyDot from './item/IdentifyDot.vue'
import { pickerOptionsToToday } from '@/util/date'

export default {
    props: {
        form: {
            type: Object,
            required: true
        },
        submit: {
            type: Function,
            required: true
        },
        cancel: {
            type: Function,
            require: true
        }
    },
    data () {
        return {
            pickerOptionsToToday,
            isDrawerOpen: false,
        }
    },
    methods: {
        submitForm () {
            this.submit()
            this.closeDrawer()
        },
        cancelAdd () {
            this.cancel()
            this.closeDrawer()
        },
        closeDrawer () {
            this.isDrawerOpen = false
        },
        openDrawer () {
            this.isDrawerOpen = true
        }
    },
    components: {
        IdentifyDot
    }
}
</script>

<style>

</style>