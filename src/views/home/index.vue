<template>
  <div class="home">
    <el-container class="mycontainer">
      <el-header>
        <div class="logo">
          <i
            class="el-icon-s-fold"
            v-if="isCollapse === false"
            @click="isCollapse = !isCollapse"
          ></i>
          <i
            class="el-icon-s-unfold"
            v-else
            @click="isCollapse = !isCollapse"
          ></i>
          <img src="@/assets/logo.png" alt="" />
          <span>黑马面面</span>
        </div>
        <div class="info" v-if="userInfo.avatar">
          <img :src="baseURL + '/' + $store.state.userInfo.avatar" alt="" />
          <span class="myspan">{{ $store.state.userInfo.username }}，您好</span>
          <el-button @click="logout" size="mini" type="primary">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
            <el-menu-item index="/home/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/home/userList">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/home/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/home/business">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/home/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getToken, removeToken } from "@/utils/token.js";
import { getUserInfoApi, logoutApi } from "@/api/index.js";
export default {
  data() {
    return {
      userInfo: {},
      baseURL: process.env.VUE_APP_BASEURL,
      isCollapse: false,
    };
  },
  created() {
    var token = getToken();
    if (!token) {
      this.$message.error("您还未登录，即将跳转登录页面");
      this.$router.push("/login");
    }
    getUserInfoApi().then((res) => {
      console.log(res);
      this.userInfo = res.data;
      this.$store.state.userInfo = this.userInfo
    });
  },
  methods: {
    logout() {
      this.$confirm("是否退出系统,", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          logoutApi().then((res) => {
            console.log(res);
            removeToken();
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang='less'>
.home {
  height: 100%;
  .mycontainer {
    height: 100%;
  }
  .el-header {
    color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      i {
        font-size: 24px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-left: 22px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .info {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      .myspan {
        font-size: 14px;
        color: #636363;
        margin-left: 10px;
        margin-right: 20px;
      }
    }
  }

  .el-aside {
    color: #333;
    height: 100%;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 188px;
    }
  }

  .el-main {
    background: #e8e9ec;
    color: #333;
  }
}
</style>