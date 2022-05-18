<template>
  <div>
    <el-footer style="padding: 0;">
      <div class="footer">
        <div>
          <h4 style="margin: 5px; padding-top: 15px">OSAS BLOG</h4>
          <a href="https://space.bilibili.com/151557392">Bilibili</a> |
          <a href="https://github.com/Albert-0223">Github</a> |
          <a href="http://localhost:8080/admin">后台管理</a>
          <br>
          <p>京ICP证123456号-1 京网文【2022】0000-001号 Copyright © 2022 Albert. All Rights Reserved.</p>
        </div>
      </div>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.el-footer {
  padding: 0;
}

.footer {
  padding: 0;
  background-color: #d2d2d2;
}

p {
  margin: 0;
  font-size: 14px;
  padding-bottom: 10px;
  padding-top: 5px
}

a {
  font-size: 15px;
  text-decoration: none;
  color: black;
}

</style>
