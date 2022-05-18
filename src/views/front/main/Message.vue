<template>
  <div>
    <Header></Header>

    <el-main>
      <div class="block" style="width: 1000px;height:auto;margin: 0 auto">
        <el-card style="height: auto; min-height: 560px">
          <h3 style="text-align: left">给我留言</h3>
          <el-form label-width="80px" :model="MsgForm" :rules="rules" ref="MsgForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="MsgForm.name" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="MsgForm.email" placeholder="请输入邮箱" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="MsgForm.phone" placeholder="请输入手机号" clearable minlength="11" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="留言" prop="content">
              <el-input v-model="MsgForm.content" type="textarea" :rows="10"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" plain @click="submitForm">提交</el-button>
        </el-card>
      </div>
    </el-main>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default {
  name: "Message",
  components: {
    Header, Footer
  },
  data() {
    return {
      MsgForm: {
        name: '',
        email: '',
        phone: '',
        content: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '请输入留言内容', trigger: 'blur'}
        ]
      }


    }
  },
  methods: {
    submitForm() {
      this.$refs.MsgForm.validate((valid) => {
        if (valid) {
          this.$http.post('/messages', this.MsgForm).then(response => {
            console.dir(response);
            if (response.data.code === 1) {
              this.$message.success('留言成功')
              this.$refs.MsgForm.resetFields()
            } else {
              this.$message.error('留言失败')
            }
          });
        }
      }, () => {
        this.$message.error('请检查表单是否填写完整')
      })
    }
  }
}
</script>

<style scoped>

</style>
