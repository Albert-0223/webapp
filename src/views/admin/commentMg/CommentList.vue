<template>
  <div class="main" style="height: auto;">
    <el-card>
      <!-- 搜索 -->
<!--      <el-row>-->
<!--        <el-col :span="4" style="margin-bottom: 20px">-->
<!--          <el-input placeholder="请输入内容">-->
<!--            <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--          </el-input>-->
<!--        </el-col>-->
<!--      </el-row>-->

      <!-- 列表 -->
      <el-table :data="commentList.slice((queryInfo.pagenum-1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize)"
                border stripe>
        <el-table-column label="序号" width="50px" fixed>
          <template v-slot="scope">
            <span>{{ scope.$index + (queryInfo.pagenum - 1) * queryInfo.pagesize + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id" width="100px"></el-table-column>
        <el-table-column label="uid" prop="uid" width="120px"></el-table-column>
        <el-table-column label="文章id" prop="article_id" show-overflow-tooltip width="120px"></el-table-column>
        <el-table-column label="评论内容" prop="comment" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="scope">
            <el-button type="danger" icon="el-icon-delete" @click="delComment(scope.row.id)"></el-button>
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
  name: "CommentList",
  data() {
    return {
      commentList: [],
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      total: 0, // 总条数
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    async getComments() {
      const {data: res} = await this.$http.get(`/comments`)
      this.commentList = res.data
      this.total = res.data.length
    },

    delComment(id) {
      this.$confirm('是否删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/comments/${id}`).then((res) => {
          Message.success("删除成功")
          location.reload()
        })
      });
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
