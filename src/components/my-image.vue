<template>
  <div class="img-container">
    <div class="img_btn" @click="openDialog">
      <img src="../assets/images/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- radio按钮 -->
          <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片列表 -->
          <div class="img_list">
            <div
              class="img_item"
              :class="{selected:item.url === selectedImageUrl}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev,pager,next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      selectedImageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      uploadImageUrl: null
    }
  },
  methods: {
    handleSuccess (res) {
      this.$message.success('上传图片成功')
      this.uploadImageUrl = res.data.url
    },
    openDialog () {
      this.dialogVisible = true
      this.getImages()
    },
    // 切换全部与收藏
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 获取素材列表数据
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 发布图片
    selectedImage (url) {
      // 记录当前你点击的图片地址
      this.selectedImageUrl = url
    }
  }
}
</script>

<style lang="less" scoped>
.img_btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_list {
  .img_item {
    display: inline-block;
    margin: 0 5px;
    width: 160px;
    height: 120px;
    position: relative;
      &.selected {
        &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
                no-repeat center / 50px;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
  }
}
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
</style>
