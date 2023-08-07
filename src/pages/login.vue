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
        </el-tabs>
      </div>
      <div class="user-social-login">
        <span @click="submitForm('loginForm')">第三方登录</span>
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
    return {
      dialogVisible: false,
      rules: {
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
          { required: true, message: "邮箱不能为空", trigger: "blur" },
        ],
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
    };
  },
  beforeCreate() {
    this.$http.get("/v1/u/info").then(res=>{
      if(res.data.code===200) this.$router.push('/admin');
    })
  },
  async mounted() {
    const { data: res } = await this.$http.get("/v1/captcha");
    this.captcha_img = res.data.captcha_img;
    this.captcha_key = res.data.captcha_key;
  },
  methods: {
    // 获取静态验证码
    async vertifyCode() {
      const { data: res } = await this.$http.post("/v1/captcha1", {
        email: this.registerForm.email,
      });
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
      const { data: res } = await this.$http.post("/v1/sendCode", {
        email: _this.registerForm.email,
        key: _this.captcha_key,
        code: _this.registerForm.verifyCode,
      });
      if (res.code === 200) {
        this.$message.success("发送验证码成功，请去邮箱查看～");
        this.setTime();
        this.dialogVisible = false;
        this.registerForm.email_key = res.data.email_key;
      } else {
        if (res.code === 304) this.chagneCode();
        if (res.code === 400) {
          this.dialogVisible = false;
          this.registerForm.email_key = res.data.email_key;
        }
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
      let { data: res } = await this.$http.post("/v1/u/login", {
        key: _this.captcha_key,
        code: _this.loginForm.verifyCode,
        email: _this.loginForm.email,
        password: _this.loginForm.password,
      });
      if (res.code === 200) {
        localStorage.setItem("token", res.data.token);
        this.$message.success("登录成功～");
        _this.$router.push("/admin");
      } else {
        this.$message.error(res.msg);
        this.chagneCode();
      }
    },
    async register() {
      let _this = this;
      // console.log(        {
      //     key: _this.registerForm.email_key,
      //     code: _this.registerForm.dynamicVerifyCode,
      //     email: _this.registerForm.email,
      //     password: _this.registerForm.password,
      //     password_confirmation: _this.registerForm.password,
      //   });
      let { data: res } = await this.$http.post("/v1/register", {
        key: _this.registerForm.email_key,
        code: _this.registerForm.dynamicVerifyCode,
        email: _this.registerForm.email,
        password: _this.registerForm.password,
        password_confirmation: _this.registerForm.password,
      });
      if (res.code !== 200) this.$message.error(res.msg);
      else {
        localStorage.setItem("token", res.data.token);
        this.$message.success("注册成功～");
        _this.$router.push("/admin");
      }
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
.user-login-top {
  margin-bottom: 22px;
  text-align: left;
  font-size: 25px;
  font-weight: bolder;
}
.user-login-container {
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 0 10px #cacac6;
  width: 450px;
  min-width: 280px;
  margin: 0 auto;
  .user-login-main {
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
</style>