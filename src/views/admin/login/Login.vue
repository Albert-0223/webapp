<template>
  <div class="login_container">
    <div class="login_box">
      <h2 style="margin-top: 50px">OSAS 博客后台管理系统</h2>
      <!--  登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_info">
        <!--  用户名输入框 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!--  密码输入框 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!--  登录按钮  -->
        <el-form-item>
          <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "Login",
  data() {
    return {
      // 登录表单的数据
      loginForm: {
        username: 'admin',
        password: ''
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    // 登录
    async login() {
      if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin') {
        await this.$router.push('/mg/welcome')
        Message.success('登陆成功')
      } else {
        Message.error('账号或密码错误')
      }


      // const {data: res} = await this.$http.post('/login', this.loginForm);
      // if (res.code !== 1) {
      //   this.$message.error(res.data)
      // } else {
      //   this.$message.success('登陆成功')
      //   window.sessionStorage.setItem('username', res.data.username)
      //   this.$router.push('/mg/welcome')
      // }
    }
  }
}
</script>

<style scoped>
.login_container {
  background-color: #c5cae9;
  background-size: cover;
  height: 100%;
}

.login_box {
  width: 400px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_info {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>

