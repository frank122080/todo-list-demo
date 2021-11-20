<template>
  <div class='main'>
      <Layout>
        <Header>
          <h2>
            Todo List Demo
          </h2>
        </Header>
        <Content><Todo/></Content>
    </Layout>
  </div>
</template>

<script>
import Todo from '@/view/Todo'

export default {
  components: {
    Todo
  }
}
</script>

<style>

</style>