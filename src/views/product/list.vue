<template>
  <div class="app-container">
    <el-input v-model="textarea1" type="textarea" autosize placeholder="请输入内容" />
    <div style="margin: 20px 0;" />
    <el-input v-model="textarea2" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" />
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  components: {},
  filters: {

  },
  data() {
    return {
      textarea1: '',
      textarea2: ''
    }
  },
  created() {

  },
  methods: {

  }
}

</script>

<style scoped>

</style>
