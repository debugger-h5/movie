<template>
  <div class="app-container">
    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column property="name" label="城市名称" width="120">
      </el-table-column>
      <el-table-column property="index" label="城市索引" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="currentPage"
      @current-change="changPage" :total="Total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'CityList',
    components: {},
    filters: {

    },
    data() {
      return {
        pageSize: 3,
        currentPage: 1,
        Total: 7,
        tableData: [{
          // date: '2016-05-02',
          name: '王小虎',
          // address: '上海市普陀区金沙江路 1518 弄'
        }, {
          // date: '2016-05-04',
          name: '王小虎',
          // address: '上海市普陀区金沙江路 1517 弄'
        }, {
          // date: '2016-05-01',
          name: '王小虎',
          // address: '上海市普陀区金沙江路 1519 弄'
        }, {
          // date: '2016-05-03',
          name: '王小虎',
          // address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    created() {
      this.show()
    },
    methods: {
      show() {
        axios.get(`/show?page=${this.currentPage}&pagesize=${this.pageSize}&total=${this.Total}`).then(res => {
          console.log(res.data)
          this.tableData = res.data.list
          this.Total = res.data.total
        })
      },
      handleEdit(id) {

      },
      handleDelete(id) {
        console.log(id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete('/del/' + id).then(res => {
            this.show()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      changPage(page) {
        console.log(page)
        this.currentPage = page
        this.show()
      }
    }
  }

</script>

<style scoped>

</style>
