<template>
  <div>
    <Header></Header>

    <el-main>
      <div class="block" style="width: 1000px;height:auto;margin: 0 auto">
        <el-card style="height: auto;min-height: 560px">
          <h2>历程</h2>
          <el-timeline :reverse="reverse">
            <el-timeline-item
                style="text-align: left"
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp">
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
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
  name: "Archive",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      reverse: true,
      activities: [
        {
          content: '博客达到测试状态',
          timestamp: '2022-05-01'
        },
        {
          content: '博客基本搭建完成',
          timestamp: '2022-04-01'
        }, {
          content: '博客通过审核',
          timestamp: '2022-02-01'
        }, {
          content: '博客创建成功',
          timestamp: '2022-01-01'
        }]
    };
  }
}
</script>

<style scoped>

</style>
