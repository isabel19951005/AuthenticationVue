<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <h1>欢迎使用！</h1>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="../assets/data/BKNdata/Systemdata/Bdomain/photo/adminB.jpg" alt="" />
        </span>
        <el-dropdown-menu>
          <el-menu>
            <el-menu-item @click="handleLogout">退出</el-menu-item>
          </el-menu>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="text2">AdminB</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu');
    },
    handleLogout() {
      // 处理退出逻辑
    },
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #ffffff;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .r-content {
    display: flex;
    align-items: center;

    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .l-content {
    display: flex;
    align-items: center;

    h1 {
      font-size: 16px;
      font-family: "Microsoft YaHei", sans-serif;
      font-weight: 700;
    }
  }

  .text2-container {
    display: flex;
    align-items: center;
  }

  .text2 {
    font-size: 16px;
    font-family: "Microsoft YaHei", sans-serif;
    font-weight: 400;
    margin-left: 10px;
  }
}
</style>