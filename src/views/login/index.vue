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
            v-model="form.pdw"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="18"
              ><el-input
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
                v-model="form.code"
              ></el-input
            ></el-col>
            <el-col :span="6"
              ><img
                :src="baseURL + '/captcha?type=login'"
                alt=""
                class="codeimg"
            /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.checked" class="checked"
            >我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            和<el-link type="primary">隐私条款</el-link></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="formbtn" @click = "login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="formbtn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_banner_ele.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        pwd: "",
        code: "",
        checked:false
      },
      baseURL: "http://127.0.0.1/heimamm/public",
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
      },
    };
  },
  methods:{
    login(){
      if(!this.form.checked){
        this.$message.error('请先阅读并同意霸王条款')
        return
      }
      this.$refs.myform.validate(valid =>{
        if(valid){
          this.$message.success('验证成功')
        }else{
          this.$message.error('验证失败')
        }
      })
    }
  }
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