<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" label-width="80px">
          <el-form-item label="城市名称">
            <el-input v-model="city.name" />
          </el-form-item>
        </el-form>
        <el-form ref="form" label-width="80px">
          <el-form-item label="索引">
            <el-input v-model="city.index" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateCity',
  components: {

  },
  data() {
    return {
      city: {
        name: '',
        index: 'Z'
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post('/city/create', {
        name: this.city.name,
        index: this.city.index
      }).then(res => {
        console.log(res.data)
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.$router.push({
          path: '/city/list'
        })
      })
    },
    cancel() {
      this.city.name = '',
      this.city.index = 'Z'
    }
  }
}

</script>
