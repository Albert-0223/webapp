<template>
  <div>
    <h3>创作中心</h3>
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-select style="float: left" v-model="ruleForm.tag" placeholder="选择文章标签">
          <el-option v-for="tag in tags" :key="tag.tag" :label="tag.tag" :value="tag.tag"></el-option>
        </el-select>
      </el-form-item>
      <!-- 嵌入 Markdown 编辑器 -->
      <el-form-item label="内容" prop="content">
        <mavon-editor
            style="height: 500px"
            v-model="ruleForm.content"
            @save=""
        ></mavon-editor>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button
            :plain="true"
            type="primary"
            @click="submitForm('ruleForm')"
        >发布文章
        </el-button>

        <!--        <el-button-->
        <!--            :plain="true"-->
        <!--            type="primary"-->
        <!--            @click="submitForm('ruleForm')"-->
        <!--            @click.prevent="save"-->
        <!--        >发布文章-->
        <!--        </el-button>-->

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserWrite",
  data() {
    return {
      tags: [],
      // 文章数据表单
      ruleForm: {
        uid: sessionStorage.getItem('uid'),
        author: sessionStorage.getItem('username'),
        title: "",
        tag: "",
        content: ""
      },
      // 控制标题字符长度
      rules: {
        title: [
          {required: true, message: "请输入标题", trigger: "blur"},
          {min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur",},
        ],
        tag: [
          {required: true, message: "请选择标签", trigger: "change"},
        ],
        content: [
          {required: true, message: "请输入内容", trigger: "blur"},
          {min: 1, max: 5000, message: "长度在 1 到 5000 个字符", trigger: "blur",},
        ],
      },
    };
  },

  created() {
    this.getTags()
  },

  methods: {
    // 获取标签
    async getTags() {
      const {data: res} = await this.$http.get("/tags")
      this.tags = res.data;
    },

    // 判断输入框是否为空
    submitForm(ruleForm) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http.post("/articles/write", this.ruleForm).then(res => {
            console.dir(res)
            if (res.data.code === 1) {
              this.$message.success('发布成功')
              this.$refs.ruleForm.resetFields()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message.error("请检查输入内容")
        }
      });
    },

    // 保存数据
    async save() {
      const {data: res} = await this.$http.post("/articles/write", this.ruleForm)
      if (res.code === 1) {
        this.$message.success('发布成功')
        location.reload()
      } else {
        this.$message.error(res.msg)
      }
    }
  },
}
</script>

<style scoped>

</style>
