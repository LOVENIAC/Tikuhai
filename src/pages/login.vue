<template>
  <div class="wrraper">
    <div class="user-login-container phoneContainer">
      <div class="user-login-top">
        <div style="padding-bottom: 15px;">
          <el-avatar
            shape="square"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        TiKuHai
      </div>
      <div class="user-login-main">
        <el-tabs>
          <!-- 账号密码登录 -->
          <template v-if="!wechatLogin">
            <!-- tab 登录 -->
            <el-tab-pane label="用户登录">
              <el-form
                :rules="rules"
                :model="loginForm"
                ref="loginForm"
              >
                <el-form-item prop="email">
                  <el-input
                    placeholder="邮箱/手机号"
                    v-model="loginForm.email"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    placeholder="密码"
                    autocomplete="off"
                    v-model="loginForm.password"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item
                  prop="verifyCode"
                  class="verify-code"
                >
                  <el-input
                    placeholder="验证码"
                    autocomplete="off"
                    v-model="loginForm.verifyCode"
                  ></el-input>
                  <!-- 验证码 -->
                  <el-image
                    :src="captcha_img"
                    @click.native="chagneCode()"
                  ></el-image>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('loginForm')"
                  >登录</el-button>
                </el-form-item>
              </el-form>
              <!-- 第三方登录 -->
              <div class="user-social-login">
                <div>——&nbsp;&nbsp;第三方登录&nbsp;&nbsp;——</div>
                <div
                  class="social-logo"
                  @click="getWeChatQRCode()"
                >
                  <img
                    src="@/assets/img/wechat-logo-color.png"
                    alt="微信登录"
                  >
                </div>
              </div>
            </el-tab-pane>
            <!-- tab 注册 -->
            <el-tab-pane label="用户注册">
              <el-form
                :rules="rules"
                :model="registerForm"
                ref="registerForm"
              >
                <el-form-item prop="email">
                  <el-input
                    placeholder="邮箱/手机号"
                    v-model="registerForm.email"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    placeholder="密码"
                    autocomplete="off"
                    v-model="registerForm.password"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item
                  prop="dynamicVerifyCode"
                  class="dynamicVerifyCode"
                >
                  <el-input
                    placeholder="验证码"
                    autocomplete="off"
                    v-model="registerForm.dynamicVerifyCode"
                  ></el-input>
                  <!-- 验证码 -->
                  <el-button
                    type="text"
                    :disabled="isDisbaled"
                    @click="vertifyCode()"
                  >{{ codeBtnContent }}</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('registerForm')"
                  >注册</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </template>
          <!-- 微信扫码登录 -->
          <template v-else>
            <div class="weChatloginBox">
              <el-image
                v-loading="loading"
                style="width: 200px; height: 200px"
                :src="qRCode"
              ></el-image>
              <span class="tips">{{ tips }}</span>
              <span
                @click="cancelWeChatLogin()"
                class="back-btn"
              >取消</span>
            </div>
          </template>
        </el-tabs>
      </div>
    </div>
    <!-- 验证码弹窗 -->
    <el-dialog
      title="请输入验证码"
      :visible.sync="dialogVisible"
      width="400px"
    >
      <div class="dialogCode">
        <el-input
          placeholder="验证码"
          autocomplete="off"
          v-model="registerForm.verifyCode"
        ></el-input>
        <!-- 验证码 -->
        <el-image
          :src="captcha_img"
          @click.native="chagneCode()"
        ></el-image>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="sendDynamicVerifyCode()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user-login",
  data() {
    var checkAccount = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱/手机号不能为空"));
      }
      setTimeout(() => {
        if (value.includes("@")) {
          if (mailReg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的邮箱格式"));
          }
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的邮箱/手机号"));
          }
        }
      }, 500);
    };
    return {
      timer: "",
      loading: true,
      wechatLogin: false,
      weChatKey: "",
      qRCode: "",
      dialogVisible: false,
      rules: {
        email: [{ validator: checkAccount, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "密码6-20位", trigger: "blur" },
        ],
        verifyCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
        dynamicVerifyCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
      loginForm: {
        email: "",
        password: "",
        verifyCode: "",
      },
      registerForm: {
        email: "",
        password: "",
        email_key: "",
        dynamicVerifyCode: "",
        verifyCode: "",
      },
      captcha_img: "",
      captcha_key: "",
      countdown: 60,
      codeBtnContent: "发送验证码",
      isDisbaled: false,
      tips: '微信扫码关注登录'
    };
  },
  created(){
    var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger' ) {
      this.tips = '长按图片，微信扫码关注登录'
    }
  },
  beforeCreate() {
    this.$http.get("/v1/u/info").then((res) => {
      if (res.data.code === 200) this.$router.push("/admin");
    });
  },
  async mounted() {
    const { data: res } = await this.$http.get("/v1/captcha");
    this.captcha_img = res.data.captcha_img;
    this.captcha_key = res.data.captcha_key;
  },
  methods: {
    // 判断账户是手机号/邮箱
    transAccountObject(obj) {
      if (!obj.email.includes("@")) {
        obj.phone = obj.email;
        delete obj.email;
      }
    },
    // 获取静态验证码
    async vertifyCode() {
      let submitForm = {
        email: this.registerForm.email,
      };
      this.transAccountObject(submitForm);
      const { data: res } = await this.$http.post("/v1/captcha1", submitForm);
      if (res.code !== 200) this.$message.error(res.msg);
      else {
        this.captcha_img = res.data.captcha_img;
        this.captcha_key = res.data.captcha_key;
        this.dialogVisible = true;
      }
    },
    // dialog确认发送动态验证码
    async sendDynamicVerifyCode() {
      let _this = this;
      let submitForm = {
        email: _this.registerForm.email,
        key: _this.captcha_key,
        code: _this.registerForm.verifyCode,
      };
      // 判断邮箱还是手机号
      this.transAccountObject(submitForm);
      const { data: res } = await this.$http.post("/v1/sendCode", submitForm);
      if (res.code === 200) {
        this.$message.success("发送验证码成功，请去邮箱/手机查看～");
        this.setTime();
        this.dialogVisible = false;
        this.registerForm.email_key = res.data.email_key;
      } else {
        if (res.code === 304) this.chagneCode();
        if (res.code === 400) {
          this.dialogVisible = false;
          this.registerForm.email_key = res.data.email_key;
        }
        this.registerForm.verifyCode = "";
        this.$message.error(res.msg);
      }
    },
    // 延时器倒计时
    setTime() {
      if (this.countdown == 0) {
        this.isDisbaled = false;
        this.codeBtnContent = "发送验证码";
        this.countdown = 60; //60秒过后button上的文字初始化,计时器初始化;
        return;
      } else {
        this.isDisbaled = true;
        this.codeBtnContent = this.countdown + "s";
        this.countdown--;
      }
      setTimeout(() => {
        this.setTime();
      }, 1000); //每1000毫秒执行一次
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === "registerForm") {
            this.register();
          } else if (formName == "loginForm") {
            this.login();
          }
        } else {
          return false;
        }
      });
    },
    // 切换动态验证码
    async chagneCode() {
      const { data: res } = await this.$http.get("/v1/captcha");
      this.captcha_img = res.data.captcha_img;
      this.captcha_key = res.data.captcha_key;
    },
    async login() {
      let _this = this;
      // console.log(
      //   {
      //     key: _this.captcha_key,
      //     code: _this.loginForm.verifyCode,
      //     email: _this.loginForm.email,
      //     password: _this.loginForm.password,
      //   }
      // );
      let submitForm = {
        key: _this.captcha_key,
        code: _this.loginForm.verifyCode,
        email: _this.loginForm.email,
        password: _this.loginForm.password,
      };
      // 判断邮箱还是手机号
      this.transAccountObject(submitForm);
      let { data: res } = await this.$http.post("/v1/u/login", submitForm);
      if (res.code === 200) {
        localStorage.setItem("token", res.data.token);
        this.$message.success("登录成功～");
        _this.$router.push("/admin");
      } else {
        this.$message.error(res.msg);
        this.chagneCode();
      }
    },
    //注册
    async register() {
      let _this = this;
      // console.log(        {
      //     key: _this.registerForm.email_key,
      //     code: _this.registerForm.dynamicVerifyCode,
      //     email: _this.registerForm.email,
      //     password: _this.registerForm.password,
      //     password_confirmation: _this.registerForm.password,
      //   });
      let submitForm = {
        key: _this.registerForm.email_key,
        code: _this.registerForm.dynamicVerifyCode,
        email: _this.registerForm.email,
        password: _this.registerForm.password,
        password_confirmation: _this.registerForm.password,
      };
      // 判断邮箱还是手机号
      this.transAccountObject(submitForm);
      let { data: res } = await this.$http.post("/v1/register", submitForm);
      if (res.code !== 200) this.$message.error(res.msg);
      else {
        localStorage.setItem("token", res.data.token);
        this.$message.success("注册成功～");
        _this.$router.push("/admin");
      }
    },
    // 获取微信登录二维码
    async getWeChatQRCode() {
      this.wechatLogin = true;
      const { data: res } = await this.$http.get("/v1/scanLogin");
      this.qRCode = res.data.qrcode;
      this.loading = false;
      this.weChatKey = res.data.key;
      this.timer = setInterval(this.checkWechatLogin, 2000);
    },
    // 取消微信登录
    cancelWeChatLogin() {
      clearInterval(this.timer);
      this.timer = null;
      this.wechatLogin = false;
      this.loading = true;
    },
    // 监听登录情况
    checkWechatLogin() {
      const _this = this;
      this.$http
        .get("/v1/scanLoginCheck", {
          params: {
            key: this.weChatKey,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            clearInterval(_this.timer);
            _this.timer = null;
            localStorage.setItem("token", res.data.data.token);
            _this.$message.success("登录成功～");
            _this.$router.push("/admin");
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wrraper {
  background-color: #4a4a4a;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
@media only screen and (max-width: 450px) {
  .phoneContainer {
    min-height: 100vh;
    border: none;
    border-radius: 0 !important;
  }
}
.weChatloginBox {
  text-align: center;
  width: 100%;
  /deep/ .el-image {
    img {
      border-radius: 5px;
    }
  }
  .back-icon {
    color: #497ef2;
    text-align: left;
    i {
      font-size: 30px;
    }
  }
  .tips {
    margin-top: 10px;
    color: #1aad19;
  }
  .back-btn {
    margin-top: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bolder;
  }
  span {
    display: block;
  }
}
.user-login-top {
  margin-bottom: 22px;
  text-align: left;
  font-size: 25px;
  font-weight: bolder;
}
.user-login-container {
  background-color: #efeeee;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 0 10px #cacac6;
  width: 450px;
  min-width: 280px;
  margin: 0 auto;
  .user-login-main {
    /deep/ .el-tabs__content {
      overflow: visible;
    }
    /deep/ .verify-code .el-form-item__content {
      display: flex;
      flex-direction: row;
      .el-input {
        flex: 1;
        padding-right: 10px;
      }
      img {
        border-radius: 5px;
      }
    }
    /deep/ .dynamicVerifyCode .el-form-item__content {
      display: flex;
      flex-direction: row;
      .el-input {
        flex: 1;
        padding-right: 20px;
      }
      .el-button {
        cursor: pointer;
        width: 100px;
        color: white;
      }
    }
    /deep/ .el-tabs__item {
      font-weight: 400;
    }
    /deep/ .el-tabs__active-bar {
      color: #497ef2;
    }
    /deep/ .el-tabs__nav-wrap::after {
      height: 1px;
    }
    /deep/ .el-tabs__item:hover {
      color: #4e46dd;
    }
    /deep/ .el-tabs__active-bar {
      background-color: #4e46dd;
    }
    /deep/ .is-active {
      color: #4e46dd;
    }
    /deep/ .el-button {
      border: 0;
      background-color: #4e46dd;
      width: 100%;
    }
  }
}
/deep/ .el-dialog {
  border-radius: 10px;
}
/deep/ .dialogCode {
  display: flex;
  flex-direction: row;
  .el-input {
    flex: 1;
    padding-right: 20px;
  }
  .el-button {
    cursor: pointer;
    width: 100px;
    color: white;
  }
}
.user-social-login {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  .social-logo {
    margin: 20px auto 0 auto;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.2),
      -10px -10px 15px rgba(255, 255, 255, 1);
    border-radius: 10px;
    transition: all 0.2s ease-out;
    img {
      width: 40px;
      height: 40px;
      transition: all 0.2s ease-out;
    }
  }
  .social-logo:hover {
    cursor: pointer;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 1),
      inset 10px 10px 15px rgba(0, 0, 0, 0.1),
      inset -10px -10px 15px rgba(255, 255, 255, 1);
    img {
      width: 38px;
    }
  }
}
</style>