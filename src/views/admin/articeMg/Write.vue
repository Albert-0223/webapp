<template>
  <div style="height: auto;">
    <!-- 创作区域 表单 -->
    <el-card>
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm">

        <!-- 输入标题 -->
        <el-form-item label="标题" prop="name">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <!-- 选择标签 -->
        <el-form-item label="标签">
          <el-select
              style="float: left"
              v-model="ruleForm.tag"
              placeholder="选择文章标签"
          >
            <el-option
                v-for="tag in tags"
                :key="tag.tag"
                :label="tag.tag"
                :value="tag.tag"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 嵌入 Markdown 编辑器 -->
        <el-form-item label="内容">
          <mavon-editor
              style="height: 400px"
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
              @click.prevent="save"
          >发布文章
          </el-button>

        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "mavon-editor/dist/css/index.css";

export default {
  name: "Push",

  data() {
    return {
      tags: "",
      // 文章数据表单
      ruleForm: {
        title: "",
        tag: "",
        content: "",
      },
      // 控制标题字符长度
      rules: {
        name: [
          {required: true, message: "请输入标题", trigger: "blur"},
          {type: 'String', min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur"},
        ],
      },
    };
  },

  created() {
    this.getTags()
  },

  methods: {
    // 获取所有标签
    async getTags() {
      const {data: res} = await this.$http.get("/tags")
      this.tags = res.data;
    },

    // 判断输入框是否为空
    submitForm(ruleForm) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 发起post请求，保存数据
    async save() {
      let params = {
        author: 'admin',
        title: this.ruleForm.title,
        tag: this.ruleForm.tag,
        content: this.ruleForm.content,
      };
      const {data: res} = await this.$http.post("/articles/write", params)
      if (res.code === 1) {
        this.$message.success('发布成功')
        await this.$router.push('/mg/articleManager/article')
      }
    }
  },
};
</script>

<style scoped>
</style>
