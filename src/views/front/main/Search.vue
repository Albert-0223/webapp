<template>
  <div>
    <Header></Header>

    <el-main>
      <div class="block" style="width: 1000px;height:auto;margin: 0 auto">
        <el-card style="height: auto;min-height: 620px">
          <h2>与 “{{ keyword }}” 相关的文章</h2>
          <!-- 列表 -->
          <article-list :articles="articles"></article-list>

          <!--   空状态   -->
          <div v-show="emptyShow">
            <el-empty description="暂无与相关文章"></el-empty>
          </div>
        </el-card>
      </div>

      <!--  回到顶部   -->
      <el-backtop :bottom="80">Top</el-backtop>
    </el-main>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import ArticleList from "../layout/ArticleList";

export default {
  name: "Search",
  components: {
    Header, Footer, ArticleList
  }, data() {
    return {
      keyword: '',
      articles: '',
      listShow: '',
      emptyShow: ''
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      this.keyword = this.$route.params.keyword

      const {data: res} = await this.$http.get(`/articles/search/${this.keyword}`)
      this.articles = res.data
      if (res.data.length === 0) {
        this.emptyShow = true
      } else {
        this.emptyShow = false
      }
    }
  }
}
</script>

<style scoped>

</style>
