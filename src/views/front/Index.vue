<template>
  <div>
    <Header></Header>

    <el-main>
      <div style="width: 1100px;margin: 0 auto">
        <!--   左边主体    -->
        <div style="width: 750px;float: left;">

          <!-- 列表 -->
          <article-list :articles="articles"></article-list>
        </div>

        <!--   右边主体    -->
        <div style="width: 300px;float: right">

          <!--  介绍卡片   -->
          <el-card>
            <div v-show="sysInfoShow">
              <img src="../../assets/img/unLogin.png" style="height: 60px;border-radius: 50%"
                   @click="$router.push(`/user/article`)">
              <h3>还未登录</h3>
            </div>

            <div v-show="userInfoShow" @click="$router.push(`/user/article`)">
              <el-avatar style="background-color: gold" :size="55">{{ username }}</el-avatar>
              <h3>{{ username }}</h3>
            </div>
            <i class="el-icon-edit-outline"> 还没有介绍哦...</i>
            <p>
              <span style="margin-right: 20px">关注：NA </span>
              <span>粉丝：NA</span>
            </p>
          </el-card>

          <!-- 标签  -->
          <tag-info></tag-info>

          <!-- wx 二维码  -->
          <el-card style="margin-top: 20px" v-show="QrCodeShow">
            <div slot="header" class="clearfix">
              <i class="el-icon-magic-stick"></i>
              <span>关注我</span>
            </div>
            <div>
              <img src="../../assets/img/wx.png" alt="" style="width: 270px">
            </div>
          </el-card>

          <!-- wx 赞赏码  -->
          <el-card style="margin-top: 20px" v-show="QrCodeShow">
            <div slot="header" class="clearfix">
              <i class="el-icon-magic-stick"></i>
              <span>赞赏</span>
            </div>
            <div>
              <img src="../../assets/img/pay.png" alt="" style="width: 250px">
            </div>
          </el-card>

          <!-- 最近文章  -->
          <el-card style="margin-top: 20px" v-show="lateArticleShow">
            <div slot="header" class="clearfix">
              <i class="el-icon-document"></i>
              <span>最近发布</span>
            </div>
            <div>
              <p style="text-align: left;margin-bottom: 5px" v-for="article in lateArticles"
                 @click="$router.push('/article/'+article.id)">{{ article.title }}</p>
            </div>
          </el-card>

          <!--  归档  -->
          <el-card style="margin-top: 20px" v-show="archiveShow">
            <div slot="header" class="clearfix">
              <i class="el-icon-receiving"></i>
              <span>归档</span>
            </div>

          </el-card>
        </div>
      </div>

      <!--  回到顶部   -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ArticleList from "./layout/ArticleList";
import TagInfo from "./layout/TagInfo";

export default {
  name: "Index",
  components: {
    Header, Footer, ArticleList, TagInfo
  },
  data() {
    return {
      uid: '',
      username: sessionStorage.getItem('username'),
      articles: [],
      lateArticles: [],
      sysInfoShow: true,
      userInfoShow: false,
      QrCodeShow: true,
      archiveShow: false,
      lateArticleShow: false,
      infoTag: [
        {icon: '#icon-github', url: 'https://github.com/Albert-0223'},
        {icon: '#icon-csdn', url: 'https://space.bilibili.com/151557392'},
        {icon: '#icon-twitter', url: ''}
      ]
    };
  },

  created() {
    this.isLogin()
    this.getAllArticles()
    this.getLateArticles()
  },

  methods: {
    isLogin() {
      this.uid = sessionStorage.getItem('uid')
      if (this.uid) {
        this.sysInfoShow = false
        this.userInfoShow = true
        this.QrCodeShow = false
        this.archiveShow = true
        this.lateArticleShow = true

        this.getLateArticles()
      }
    },

    // 获取全部文章
    async getAllArticles() {
      const {data: res} = await this.$http.get("/articles")
      this.articles = res.data;
    },

    // 获取用户文章
    async getLateArticles() {
      if (this.uid !== null) {
        const {data: res} = await this.$http.get(`/articles/user/${this.uid}`)
        this.lateArticles = res.data;
      }
    }
  }
}
</script>

<style scoped>

</style>
