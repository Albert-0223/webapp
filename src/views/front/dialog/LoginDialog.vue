<template>
  <div>
    <el-dialog title="登 录" :visible.sync="openCardDialog" width="30%" center>
      <el-form :model="form" label-width="50px">
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="padding: 0">
        <el-button type="primary" @click="login">登 录</el-button>
        <el-button type="success" @click="openRegister">注 册</el-button>
      </div>

      <!--   内嵌注册弹窗   -->
      <el-dialog width="30%" title="注 册" :visible.sync="innerVisible" append-to-body center>
        <!--  注册表单  -->
        <el-form :model="form" label-width="60px" :rules="rules" ref="form">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="success" style="width: 100%" @click="register()">注 册</el-button>
        </div>
      </el-dialog>

    </el-dialog>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "LoginDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ]
      },
      RegistartVisible: false,
      innerVisible: false
    }
  },
  computed: {
    openCardDialog: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val) // openCardDialog改变的时候通知父组件
      }
    }
  },

  methods: {
    async login() {
      const {data: res} = await this.$http.post(`/user/login`, this.form)
      console.log(res)
      if (res.code === 1) {
        sessionStorage.setItem("uid", res.data.id)
        sessionStorage.setItem("username", res.data.username)
        Message.success('登陆成功')
        location.reload()
      } else {
        Message.error(res.data)
      }
    },

    // 打开注册弹窗
    openRegister() {
      this.innerVisible = true
    },

    async register() {
      const {data: res} = await this.$http.post(`/user/register`, this.form)
      if (res.code === 1) {
        Message.success('注册成功')
        this.innerVisible = false
      } else {
        Message.info('请重试')
      }
    }
  }
}
</script>

<style scoped>

</style>
