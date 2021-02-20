<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img class="t-img" src="@/assets/图层 8@2x.png" alt="" />
        <span class="mm">黑马面面</span>
        <span class="line"></span>
        <span class="t-login">用户登录</span>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/login_banner_ele.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
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