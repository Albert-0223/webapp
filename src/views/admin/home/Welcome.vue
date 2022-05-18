<template>
  <div>
    <h1 style="font-size: 40px; color: black">优秀的判断力来自经验, 但经验来自于错误的判断。</h1>
    <!--  分割线  -->
    <el-divider></el-divider>
    <h2>Welcome ! OSAS 博客后台管理系统</h2>
    <!--  分割线  -->
    <el-divider></el-divider>
    <!--  写文章按钮  -->
    <el-button type="success" @click="$router.push('/mg/articleManager/write')" round>写文章</el-button>
    <el-button type="success" @click="$router.push('/mg/msgManager/notice')" round>去发布公告</el-button>
  </div>
</template>

<script>
export default {
  name: "Welcome"
}
</script>

<style scoped>

</style>
