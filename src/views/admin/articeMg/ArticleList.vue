<template>
  <div class="main" style="height: auto;">
    <el-card>
      <!-- 搜索 -->
<!--      <el-row style="margin-bottom: 20px">-->
<!--        <el-col :span="6">-->
<!--          <el-input placeholder="请输入内容">-->
<!--            <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--      </el-row>-->

      <!-- 文章列表 -->
      <el-table :data="articles.slice((queryInfo.pagenum-1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize)"
                border stripe>
        <el-table-column label="序号" width="50px" fixed>
          <template v-slot="scope">
            <span>{{ scope.$index + (queryInfo.pagenum - 1) * queryInfo.pagesize + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id" width="100px"></el-table-column>
        <el-table-column label="文章标题" prop="title" width="150px"></el-table-column>
        <el-table-column label="标签" prop="tag" width="100px"></el-table-column>
        <el-table-column label="创建时间" prop="date" width="100px"></el-table-column>
        <!--  默认情况下若内容过多会折行显示，若需要单行显示可以使用show-overflow-tooltip属性  -->
        <!--  它接受一个Boolean，为true时多余的内容会在 hover 时以 tooltip 的形式显示出来  -->
        <el-table-column label="内容" prop="content" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="scope">
<!--            <el-button type="primary" icon="el-icon-edit" @click="editArticle(scope.row.id)"></el-button>-->
            <el-button type="danger" icon="el-icon-delete" @click="delArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 7, 9]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "BlogList",
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      articles: [],
      total: 0
    };
  },
  created() {
    this.getAll()
  },
  methods: {
    // 获取全部文章
    async getAll() {
      const {data: res} = await this.$http.get("/articles")
      this.articles = res.data;
      this.total = res.data.length
    },

    //  编辑文章信息
    // editArticle(id) {
    //   this.$router.push(`/mg/articleManager/article/${id}`)
    // },

    // 根据 id 删除文章
    delArticle(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/articles/${id}`).then((res) => {
          // if (res.code === 1)
          //   location.reload()
          Message.success("删除成功")
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
};
</script>

<style scoped>

</style>

