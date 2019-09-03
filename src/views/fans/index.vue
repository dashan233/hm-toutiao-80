<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button plain size="small" type="primary">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">粉丝画像content</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list',
      reqParams: {
        page: 1,
        per_page: 24
      },
      fansList: [],
      total: 0
    }
  },
  created () {
    this.getFansList()
  },
  methods: {
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      //   console.log(data.results)
      this.fansList = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.fans_item {
  width: 168px;
  height: 238px;
  border: 1px dashed #ddd;
  text-align: center;
  padding-top: 10px;
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 20px;
  p {
    font-size: 12px;
  }
}
</style>
