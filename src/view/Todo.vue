<template>
  <div class="todo">
      <Row type="flex" justify="space-around">
          <Col span='11'>
            <Card>
                <div class='undoneTitle'>
                    未完成列表
                    <AddTodo :form="form" :submit="submit" :cancel="clearForm"/>
                </div>
                <div v-for="(item, index) in undoneList" :key="index">
                    <ListItem :data="item" @done="clickDone(index)" @delete="deleteItem(index, undoneList)"/>
                </div>
            </Card>
          </Col>
          <Col span="11">
            <Card>
                <div class='doneTitle'>
                    完成列表
                </div>
                <div v-for="(item, index) in doneList" :key="index">
                    <ListItem :data="item" @delete="deleteItem(index, doneList)"/>
                </div>
            </Card>
          </Col>
      </Row>
      
  </div>
</template>

<script>
import todoListJson from '@/assets/data/todoList'
import AddTodo from '@/components/AddTodo'
import ListItem from '@/components/ListItem'

export default {
    created () {
        this.sortTodoList()
    },

    data () {
        return {
            form: {
                time: '',
                title: '',
                level: '',
                text: ''
            },
            undoneList: [],
            doneList: []
        }
    },
    methods: {
        submit () {
            this.form = {
                ...this.form,
                time: new Date(this.form.time).getTime(),
                createTime: Date.now(),
                status: false,
            }
            this.undoneList.push(this.form)
            this.clearForm()
        },
        clearForm () {
            this.form = {
                time: '',
                title: '',
                level: '',
                text: ''
            }
        },
        clickDone (index) {
            this.doneList.push(this.undoneList[index])
            this.undoneList.splice(index, 1)
        },
        deleteItem (index, content) {
            content.splice(index, 1)
        },
        sortTodoList () {
            todoListJson.forEach(item => {
                if (item.status) {
                    this.doneList.push(Object.assign({}, item))
                } else {
                    this.undoneList.push(Object.assign({}, item))
                }
            })
        }
    },
    components: {
        AddTodo,
        ListItem
    }
}
</script>

<style>

</style>