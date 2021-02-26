<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img class="t-img" src="@/assets/图层 8@2x.png" alt="" />
        <span class="mm">黑马面面</span>
        <span class="line"></span>
        <span class="t-login">用户登录</span>
      </div>
      <el-form ref="myform" :model="form" class="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            v-model="form.pwd"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="18"
              ><el-input
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
                v-model="form.code"
              ></el-input
            ></el-col>
            <el-col :span="6"
              ><img :src="codeUrl" alt="" class="codeimg" @click="changeCode"
            /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked" class="checked"
            >我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            和<el-link type="primary">隐私条款</el-link></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="formbtn" @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="formbtn" @click="showZheCe"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_banner_ele.png" alt="" />
    </div>
    <register ref="myRegister"></register>
  </div>
</template>

<script>
import register from "./register.vue";
import { loginApi } from "@/api/index.js";
import { setToken, getToken } from "@/utils/token.js";
export default {
  components: { register },
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      form: {
        phone: "15512345678",
        pwd: "123456",
        code: "",
        checked: true,
      },
      baseURL: process.env.VUE_APP_BASEURL,
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          { require: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度必须为4位", trigger: "blur" },
        ],
        checked: [
          // 自定义校验规则
          {
            validator: (rule, value, callback) => {
              // 必须保证 value 为 true 才能通过验证
              if (value) {
                callback();
              } else {
                callback("请先同意用户协议");
              }
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    var token = getToken();
    if (token) {
      this.$message.info("您已经登录过了，马上为您跳转到首页");
      this.$router.push("/home");
    }
  },
  methods: {
    login() {
      // if(!this.form.checked){
      //   this.$message.error('请先阅读并同意霸王条款')
      //   return
      // }
      this.$refs.myform.validate((valid) => {
        if (valid) {
          loginApi({
            phone: this.form.phone,
            password: this.form.pwd,
            code: this.form.code,
          }).then(res => {
            this.$router.push("/home");
            console.log(res);
            setToken(res.data.token);
            this.$message.success("登录成功");
          });
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    changeCode(){
      this.codeUrl = this.baseURL + '/captcha?type=login&_t=' + Date.now()
    },
    showZheCe() {
      var obj = this.$refs.myRegister;
      obj.showRegister = true;
    },
  },
};
</script>

<style lang='less'>
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(#1493fa 28%, #01c6fa 96%);

  .left {
    width: 478px;
    height: 550px;
    box-sizing: border-box;
    padding: 50px 40px;
    background: #f5f5f5;
    .title {
      display: flex;
      align-items: center;
      .t-img {
        width: 25px;
        height: 18px;
      }
      .mm,
      .t-login {
        font-size: 24px;
        color: #0c0c0c;
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      span {
        margin-left: 15px;
      }
    }
    .form {
      margin-top: 30px;
      .codeimg {
        width: 100%;
        height: 42px;
      }
      .checked {
        color: #999;
      }
      .formbtn {
        width: 100%;
      }
    }
  }
  .right {
    width: 633px;
    height: 435px;
    .img {
      width: 633px;
      height: 435px;
    }
  }
}
</style>