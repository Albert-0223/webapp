<template>
  <div>
    <!--  文章列表  -->
    <div v-for="article in articles">
      <el-card style="margin-bottom: 20px">
        <!--  title  -->
        <h3 style="text-align: left" @click="$router.push(`/article/${article.id}`)">{{ article.title }}</h3>
        <!--   用户中心的操作按钮     -->
        <span style="float: right">
          <el-button v-show="articleShow" type="danger" icon="el-icon-delete" circle size="small"
                     @click="delArticle(article.id)"></el-button>
          <el-button v-show="collectShow" type="danger" icon="el-icon-star-off" circle size="small"
                     @click="delCollect(article.id)"></el-button>
        </span>
        <!--  标签  -->
        <p style="text-align: left;color: gray">
          <i class="el-icon-user" @click="$router.push('/uid/'+article.uid)"></i>:&nbsp;{{ article.author }}&nbsp;&nbsp;&nbsp;
          <i class="el-icon-time"></i>:&nbsp;{{ article.date }}&nbsp;&nbsp;&nbsp;
          <i class="el-icon-paperclip"></i>:&nbsp;
          <el-tag size="mini">{{ article.tag }}</el-tag>
        </p>
        <!--  简介  -->
        <div style="text-align: left;color: gray">
          <!--  展示内容前60字符  -->
          {{ article.content.replace(/[#]/g, "").slice(0, 60) }}...
        </div>
        <!--  阅读原文  -->
        <el-button style="margin-top: 15px" @click="$router.push('/article/' + article.id)">阅读原文</el-button>
      </el-card>
    </div>

    <!--  分页 -->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: ['articles'],
  data() {
    return {
      uid: sessionStorage.getItem('uid'),
      articles: '',
      emptyShow: '',
      articleShow: false,
      collectShow: false,

      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      total: 0,
    }
  },
  watch: {
    orderData: function (newData, oldData) {
      this.articles = newData;
    }
  },

  created() {
    // 通过路由判断按钮是否显示
    if (this.$route.path === '/user/article') {
      this.articleShow = true
    }

    if (this.$route.path === '/user/collect') {
      this.collectShow = true
    }
  },

  methods: {
    // 删除文章（用户中心）
    delArticle(id) {
      this.$confirm('是否永久删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/articles/${id}`).then((res) => {
          // if (res.code === 1)
          //   location.reload()
          this.$message.success("删除成功")
          location.reload()
        })
      });
    },

    // 取消收藏（用户中心）
    delCollect(id) {
      this.$confirm('是否取消收藏该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/collect/${this.uid}/article/${id}`).then((res) => {
          // if (res.code === 1)
          //   location.reload()
          this.$message.success("取消收藏")
          location.reload()
        })
      })
    },

    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
    },

    // 监听页码值改变的事件
    handleCurrentChange(pageNum) {
      this.queryInfo.pagenum = pageNum
    }
  }
}
</script>

<style scoped>

</style>
