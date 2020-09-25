<template>
  <div class="app-container">
    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column property="title" label="电影名称" width="120">
      </el-table-column>
      <el-table-column property="p.name" label="电影上映城市" width="120">
      </el-table-column>
      <el-table-column property="stars" label="电影演员" width="120">
      </el-table-column>
      <el-table-column property="ratings" label="电影评分" width="120">
      </el-table-column>
      <el-table-column property="description" label="电影描述" width="120">
      </el-table-column>
      <el-table-column label="电影图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" alt class="movieimg" />
        </template>
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
    name: 'MovieList',
    components: {},
    filters: {

    },
    data() {
      return {
        pageSize: 5,
        currentPage: 1,
        Total: 7,
        tableData: [{
          title: '大闹天宫', //名字
          p: '北京', //所选城市
          stars: '美猴王', //演员
          ratings: '8.1', //评分
          description: '早期国产动画电影', //描述
          imageUrl: '' //图片地址
        }],
      }
    },
    created() {
      this.movie()
    },
    methods: {
      movie() {
        axios.get('/movie').then(res => {
          this.tableData = res.data.list
        })
      },
      handleEdit(id) {
        console.log(id)
        this.$router.push({
          path: '/movie/edit/' + id
        })
      },
      handleDelete(id) {
        console.log(id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete('/movie/del/' + id).then(res => {
            // console.log(res)
            this.movie()
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
        // console.log(page)
        this.currentPage = page
        this.movie()
      }
    }
  }

</script>

<style scoped>
  .movieimg{
    width: 80px;
    height: 80px;
  }
</style>
