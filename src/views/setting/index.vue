<template>
    <div class="container">
        <el-card>
            <div slot="header">
                <my-bread>个人设置</my-bread>
            </div>
            <!-- 栅格系统 -->
            <el-row>
                <el-col :span="12">
                    <!-- 表单 -->
                    <el-form label-width="120px">
                        <el-form-item label="编号：">
                          <span>{{userInfo.id}}</span>
                        </el-form-item>
                        <el-form-item label="手机：">
                          <span>{{userInfo.mobile}}</span>
                        </el-form-item>
                        <el-form-item label="媒体名称：">
                            <el-input v-model="userInfo.name"></el-input>
                        </el-form-item>
                        <el-form-item label="媒体介绍：">
                            <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input v-model="userInfo.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="save()" type="primary">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-upload
                      class="avatar-uploader"
                      action=""
                      :show-file-list="false"
                      :http-request="upload"
                    >
                        <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" alt="" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p style="text-align:center;font-size:14px;">修改头像</p>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        id: '',
        name: '',
        intro: '',
        email: '',
        photo: '',
        mobile: ''
      },
      imageUrl: null
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async upload (result) {
      const file = result.file
      const formData = new FormData()
      formData.append('photo', file)
      const { data: { data } } = await this.$http.patch(`user/photo`, formData)
      this.$message.success('修改头像成功')
      this.userInfo.photo = data.photo
      const localUser = store.getUser()
      localUser.photo = data.photo
      store.setUser(localUser)
      eventBus.$emit('updatePhoto', data.photo)
    },
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      console.log(data)
      this.userInfo = data
    },
    async save () {
      const { name, intro, email } = this.userInfo
      await this.$http.patch('user/profile', { name, intro, email })
      this.$message.success('保存设置成功')
      const localUser = store.getUser()
      localUser.name = name
      store.setUser(localUser)
      eventBus.$emit('updateName', name)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
