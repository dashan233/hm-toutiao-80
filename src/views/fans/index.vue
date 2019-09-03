<template>
    <div class="container">
        <el-card>
            <div slot="header">
                <my-bread>粉丝管理</my-bread>
            </div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="list">
                    <div class="fans_list">
                        <div class="fans_item" v-for="item in 24" :key="item">
                            <el-avatar :size="80" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi"></el-avatar>
                            <p>粉丝名称</p>
                            <el-button plain size="small" type="primary">+关注</el-button>
                        </div>
                    </div>
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
      activeName: 'list'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
