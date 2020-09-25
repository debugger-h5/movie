<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" label-width="80px">
          <el-form-item label="城市名称">
            <el-input v-model="edit.name" @input="pinyin" />
          </el-form-item>
        </el-form>
        <el-form ref="form" label-width="80px">
          <el-form-item label="索引">
            <el-input v-model="edit.index" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import pinyin from 'pinyin'
  export default {
    name: 'EditForm',
    data() {
      return {
        edit: {
          name: '',
          index: 'Z'
        }
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getshow(this.id)
    },
    methods: {
      getshow(id) {
        // console.log(id)
        axios.get('/citys/' + id).then(res => {
          // console.log(res.data.list)
          this.edit.name = res.data.list.name
          this.edit.index = res.data.list.index
        })
      },
      onSubmit() {
        axios.put('/put/' + this.id, {
          name: this.edit.name,
          index: this.edit.index
        }).then(res => {
          // console.log(res)
          this.$message({
          message: res.data.msg,
          type: 'success'
        }),
        this.$router.push({
          path:'/city/list'
        })
        })
      },
      cancel() {
        this.edit.name = '',
          this.edit.index = 'Z'
      },
      pinyin() {
        if (this.edit.name) {
          const first = pinyin(this.edit.name[0], {
            style: pinyin.STYLE_FIRST_LETTER
          }) //拿到首字符
          // console.log(first[0][0].toUpperCase())
          this.edit.index = first[0][0].toUpperCase()
        }
      }
    },
    components: {}
  }

</script>
