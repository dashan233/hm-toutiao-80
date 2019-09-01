<template>
    <div class="img-container">
        <div class="img_btn">
            <img src="../assets/images/default.png" alt="">
        </div>
    <!-- 对话框 -->
        <el-dialog :visible.sync="dialogVisible" width="750px">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="素材库" name="image">素材库内容</el-tab-pane>
                <el-tab-pane label="上传图片" name="upload">上传图片内容</el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image'
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
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
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
</style>
