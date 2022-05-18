<template>
  <div class="main" style="height: auto;">
    <el-card style="height: auto">
      <!--  添加标签  -->
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="1">
          <el-button type="primary" @click="addTag">添加标签</el-button>
        </el-col>
      </el-row>

      <!--  标签列表  -->
      <!--  tableData.slice((currentPage-1) * pageSize, currentPage * pageSize  -->
      <!--  slice(start,end)的作用是从已有的数组中返回选定的元素"start"表示开始，"end"表示结束  -->
      <el-table :data="tag.slice((queryInfo.pagenum-1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize)"
                border stripe>
        <el-table-column label="序号" width="50px" fixed>
          <template v-slot="scope">
            <span>{{ scope.$index + (queryInfo.pagenum - 1) * queryInfo.pagesize + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标签" prop="tag" width="150px"></el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="scope">
            <el-button type="danger" icon="el-icon-delete" @click="delTag(scope.row.tag)"></el-button>
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
  name: "TagManage",
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      tag: [],
      total: 0
    };
  },

  created() {
    this.getTag()
  },

  methods: {
    // 获取全部标签
    async getTag() {
      const {data: res} = await this.$http.get("/tags")
      this.tag = res.data;
      this.total = res.data.length
    },

    // 添加标签
    addTag() {
      this.$prompt('请输入标签', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '格式不正确'
      }).then(({value}) => {
        this.$http.post(`/tags/${value}`).then(res => {
          if (res.data.code === 1) {
            this.$message.success('创建成功');
          } else {
            this.$message.error("创建失败");
          }
        })
        location.reload()
      }).catch(() => {
        this.$message.info('取消输入');
      });
    },

    // 删除标签
    delTag(tag) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/tags/${tag}`).then((res) => {
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

<style lang="scss">

</style>

