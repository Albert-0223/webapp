<template>
  <div>
    <!--  用户主页标签模块  -->
    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <i class="el-icon-collection-tag"></i>
        <span>标签</span>
      </div>
      <div style="float: left">
        <el-tag style="margin-right: 10px;margin-bottom: 5px" size="medium" v-for="tag in tags" :type="tag.type" @click="$router.push(`/tags/${tag.label}`)">
          {{ tag.label }}
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TagInfo",
  data() {
    return {
      tags: [
        {label: 'java', value: 4, type: 'primary'},
        {label: 'C', value: 1, type: 'warning'},
        {label: 'MySQL', value: 1, type: 'success'},
        {label: 'Git', value: 1, type: 'info'},
        {label: 'python', value: 21, type: 'danger'},
        {label: 'Vue', value: 21, type: 'primary'},
        {label: 'Linux', value: 21, type: 'warning'},
        {label: 'Other', value: 21, type: 'success'},
      ]
    }
  }
}
</script>

<style scoped>

</style>
