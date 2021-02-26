<template>
  <div class="home">
    <el-container class="mycontainer">
      <el-header>
        <div class="logo">
          <i class="el-icon-s-fold"></i>
          <img src="@/assets/logo.png" alt="" />
          <span>黑马面面</span>
        </div>
        <div class="info" v-if="userInfo.avatar">
          <img :src="baseURL + '/' + userInfo.avatar" alt="" />
          <span class="myspan">{{ userInfo.username }}，您好</span>
          <el-button @click="logout" size="mini" type="primary">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getToken ,removeToken} from "@/utils/token.js";
import { getUserInfoApi ,logoutApi} from "@/api/index.js";
export default {
  data() {
    return {
      userInfo: {},
      baseURL: process.env.VUE_APP_BASEURL,
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
          logoutApi().then(res=>{
              console.log(res);
              removeToken()
              this.$router.push('/login')
          })
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
  }

  .el-main {
    background: #e8e9ec;
    color: #333;
  }
}
</style>