<template xmlns="http://www.w3.org/1999/html">
  <div class="main" style="height: auto;">
    <el-card>
      <!-- 搜索 -->
      <el-row style="margin-bottom: 20px">
<!--        <el-col :span="4">-->
<!--          <el-input placeholder="请输入内容">-->
<!--            <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--          </el-input>-->
<!--        </el-col>-->
        <el-col :span="1">
          <el-button type="primary" @click="addUser()">创建用户</el-button>
        </el-col>
        <add-user-dialog :visible.sync="visible"></add-user-dialog>
      </el-row>

      <!-- 列表 -->
      <!--  tableData.slice((currentPage-1) * pageSize, currentPage * pageSize  -->
      <!--  slice(start,end)的作用是从已有的数组中返回选定的元素"start"表示开始，"end"表示结束  -->
      <el-table
          :data="userList.slice((queryInfo.pagenum-1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize)"
          border
          stripe>
        <el-table-column label="序号" width="50px" fixed>
          <template v-slot="scope">
            <span>{{ scope.$index + (queryInfo.pagenum - 1) * queryInfo.pagesize + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="62px">
          <template v-slot="scope">
            <!-- 头像 -->
            <el-avatar> {{scope.row.username}} </el-avatar>
          </template>
          <update-info-dialog :visible.sync="updateVisible"></update-info-dialog>
        </el-table-column>
        <el-table-column label="ID" prop="id" width="120px"></el-table-column>
        <el-table-column label="用户名" prop="username" width="180px"></el-table-column>
        <el-table-column label="密码" prop="password" show-overflow-tooltip width="180px"></el-table-column>
        <el-table-column label="性别" prop="sex" width="100px"></el-table-column>
        <el-table-column label="个人简介" prop="info" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150px">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" @click="updateUser(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button>
          </template>
          <update-info-dialog :visible.sync="updateVisible"></update-info-dialog>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- :current-page 的值表示当前是第几页 -->
      <!-- :page-sizes 的值表示可以选择一页多少条 -->
      <!-- :page-size 的值表示当前一页显示几条 -->
      <!-- :total 的值表示总共有多少条数据 -->
      <!-- layout的值表示分页需要显示的内容，例如“total” 表示总数、“next” 表示下一页等 -->
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
import AddUserDialog from "./AddUserDialog";
import UpdateInfoDialog from "./UpdateInfoDialog";
import {Message} from "element-ui";

export default {
  name: "UserList",
  components: {
    AddUserDialog,
    UpdateInfoDialog
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页数
        pagesize: 5 // 当前每页显示的条数
      },
      userList: [],
      total: 0,
      visible: false,
      updateVisible: false
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    // 获取全部用户
    async getAll() {
      const {data: res} = await this.$http.get("/user/list")
      this.userList = res.data;
      this.total = res.data.length
    },

    addUser() {
      this.visible = true
    },

    //  编辑用户信息
    updateUser(id) {
      this.$router.push('/mg/userManager/userInfo/'+id)
    },

    // 根据 id 删除用户
    delUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/user/${id}`).then((res) => {
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
}
</script>

<style scoped>

</style>
