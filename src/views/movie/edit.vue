<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-upload class="avatar-uploader" action="app" :show-file-list="false" :http-request="UploadImage"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form label-width="80px">
          <el-form-item label="选择城市">
            <el-select placeholder="请选择电影城市" v-model="movie.region">
              <el-option v-for="item in list" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          </el-select>
          </el-form-item>
          <el-form-item label="电影名称">
            <el-input v-model="movie.title" />
          </el-form-item>
          <el-form-item label="电影评分">
            <el-input v-model="movie.ratings" />
          </el-form-item>
          <el-form-item label="电影演员">
            <el-input v-model="movie.stars" />
          </el-form-item>
          <el-form-item label="电影描述">
            <el-input v-model="movie.description" />
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
    name: 'CreateMovie',
    components: {

    },
    data() {
      return {
        imageUrl: '',
        movie: {
          title: '',//名字
          region: '',//所选城市
          stars: '',//演员
          ratings: '',//评分
          description: '',//描述
        },
        list: [],
        imageUrl: ''//图片地址
      }
    },
    created() {
      this.getCity()
    },
    methods: {
      getCity() {
        axios.get('/city').then(res => {
          // console.log(res)
          this.list = res.data.list
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      UploadImage(param) { //获取图片信息
        // console.log(param.file)
        let uploadData = new FormData();
        uploadData.append("avatar", param.file);
        // 上传图片的接口  传上去后让后台返回一个地址
        axios.post('/upload', uploadData).then(res => {
          this.imageUrl = res.data.path;
        });

      },
      onSubmit() {
        // console.log(this.movie.region)
        axios.post('/movie/create',{
          title: this.movie.title,
          region: this.movie.region,
          imageUrl: this.imageUrl,
          stars:this.movie.stars,
          ratings:this.movie.ratings,
          description: this.movie.description,
        }).then(res=>{
          // console.log(res)
          this.$message({
            message:res.data.msg,
            type: 'success'
          }),
          this.$router.push({
            path:'/movie/list'
          })
        })
      },
      cancel() {
        this.movie.title = '',
          this.imageUrl = '',
          this.movie.stars = '',
          this.movie.ratings = '',
          this.movie.description = '',
          this.movie.region = ''
      },
    }
  }

</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
