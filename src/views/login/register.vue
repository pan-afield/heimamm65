<template>
  <div class="register">
    <el-dialog
      :visible.sync="showRegister"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="myform">
        <el-form-item label="头像" label-width="70px" prop="avatar">
          <el-upload
            class="avatar-uploader"
            name="image"
            :action="baseURL + '/uploads'"
            :show-file-list="false"
            :on-success="success"
            :before-upload="beforUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" label-width="70px" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="70px" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码" label-width="70px" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code"></el-input>
            </el-col>
            <el-col :span="6" :offset="1"
              ><img @click="changeCode" class="codeImg" :src="codeUrl" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" label-width="70px" prop="rcode">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="6" :offset="1"
              ><el-button
                @click="getRcode"
                class="codeBtn"
                :disabled="totalTime != 60"
                >获取用户验证码
                <span v-if="totalTime != 60">{{ totalTime }}</span></el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="title">
        <div class="mytitle">用户注册</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showRegister = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCode, registerApi } from "@/api/index.js";
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        phone: "",
        password: "",
        code: "", // 图形验证码
        rcode: "", // 短信验证码
        avatar: "",
      },
      timer: "",
      imageUrl: "",
      showRegister: false,
      baseURL: process.env.VUE_APP_BASEURL,
      totalTime: 60,
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "名称只能为2~8个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              // 邮箱要满足邮箱的正则
              var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              // 验证正则
              if (reg.test(value) == true) {
                callback();
              } else {
                callback(new Error("请输入合法的邮箱"));
              }
            },
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              // 手机号要满足手机的正则
              var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              // 验证正则
              if (reg.test(value) == true) {
                callback();
              } else {
                callback(new Error("请输入合法的手机号"));
              }
            },
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码必须是6~12位",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
        ],
        rcode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
        avatar: [{ required: true, message: "请输入头像", trigger: "blur" }],
      },
    };
  },
  watch:{
    showRegister(newVal,oldVal){
      console.log(newVal);
      console.log(oldVal);
      if(oldVal){
        this.$refs.myform.resetFields()
        this.imageUrl = ''
      }
    }
  },
  methods: {
    changeCode() {
      this.codeUrl = `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms&_t=${Date.now()}`;
    },
    getRcode() {
      let _num = 0;
      this.$refs.myform.validateField(["phone", "code"], err => {
        if (err == "") {
          _num++;
        }
      });
      if (_num === 2) {
        this.timer = setInterval(() => {
          this.totalTime--;
          if (this.totalTime <= 0) {
            clearInterval(this.timer);
            this.totalTime = 60;
          }
        }, 100);
        getCode({
          code: this.form.code,
          phone: this.form.phone,
        }).then((res) => {
          console.log(res)
          this.$message.success("短信验证码为：" + res.data.data.captcha);
        });
      }
    },
    register() {
      console.log(111);
      this.$refs.myform.validate((valid) => {
        console.log(valid);
        if (valid) {
          registerApi(this.form).then((res) => {
            if (res.data.code === 200) {
              this.$message.success("注册成功");
              this.showRegister = false;
            } else {
              this.$message.error("出错了");
            }
          });
        } else {
          this.$message.error("验证不通过");
        }
      });
    },
    success(res) {
      console.log(res);
      this.imageUrl = this.baseURL + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
      this.$refs.myform.validateField(["avatar"]);
    },
    beforUpload(file) {
      var isPic =
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/gif";
      var isLess2M = file.size / 1024 / 1024 / 2;
      if (!isPic) {
        this.$message.error("图片的格式不正确");
      }
      if (!isLess2M) {
        this.$message.error("图片不能超过2M");
      }
      return isPic && isLess2M;
    },
  },
};
</script>

<style lang = 'less'>
.register {
  .el-dialog__header {
    padding: 0;
  }
  .mytitle {
    text-align: center;
    height: 53px;
    line-height: 53px;
    background: linear-gradient(90deg, #01c6fa, #1493fa);
    color: #fff;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .codeImg,
  .codeBtn {
    width: 100%;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>