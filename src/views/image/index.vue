<template>
    <div class="container">
        <el-card>
            <!-- 头部 -->
            <div slot="header">
                <my-bread>素材管理</my-bread>
            </div>
            <!-- 按钮 -->
            <div class="btn_box">
                <el-radio-group v-model="reqParams.collect" size="small">
                    <el-radio-button :lable="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <el-button type="success" size="small" style="float:right;">添加素材</el-button>
            </div>
            <!-- 列表 -->
            <div class="img_list">
                <div class="img_item" v-for="item in images" :key="item.id">
                    <img :src="item.url" alt="">
                    <div class="footer">
                        <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
                        <span class="el-icon-delete"></span>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <el-pagination background layout="prev,pager,next" :totak="1000"></el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  created () {
    this.getImages()
  },
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: []
    }
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 275px;
    height: 275px;
    border: 1px solid #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      line-height: 30px;
      height: 30px;
      color: #fff;
      background: rgba(0,0,0,0.3);
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
