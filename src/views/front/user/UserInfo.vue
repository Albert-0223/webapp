<template>
  <div>
    <h3>个人信息</h3>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="uid">
          <el-input v-model="form.uid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
<!--        <el-form-item label="性别">-->
<!--          <el-input v-model="form.sex"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="个人介绍">-->
<!--          <el-input type="textarea" v-model="form.info"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "UserInfo",
  data() {
    return {
      form: {
        uid: sessionStorage.getItem('uid'),
        username: sessionStorage.getItem('username'),
        password: '*****',
        // sex: '',
        // info: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.dir(this.form)
      const {data: res} = this.$http.put("/user/update", this.form)
      if (res.code === 1) {
        Message.success('修改成功')
      } else {
        Message.success(res.data)
      }
    }
  }
}
</script>

<style scoped>

</style>
