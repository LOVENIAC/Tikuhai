<template>
  <div class="wrapper">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>公众号管理</el-breadcrumb-item>
      <el-breadcrumb-item>公众号列表</el-breadcrumb-item>
      <el-breadcrumb-item>公众号编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体内容 -->
    <el-card>
      <el-form
        ref="form"
        :model="officialAccountForm"
        label-width="90px"
      >
      <el-tag style="cursor: pointer;" @click="initialize()">恢复默认</el-tag>
        <!-- 公众号停用 -->
        <el-form-item label="公众号状态">
          <el-tooltip
            content="请勿随意关闭，会导致服务暂停"
            placement="top"
          >
            <el-switch v-model="officialAccountForm.total_switch"></el-switch>
          </el-tooltip>

        </el-form-item>
        <!-- 关注回复内容 -->
        <el-form-item label="关注回复">
          <el-input
            placeholder="默认回复：终于等到你~ 直接发送题目即可查看相关答案哦"
            v-model="officialAccountForm.follow_reply"
          >
          </el-input>
        </el-form-item>
        <!-- 消息格式 -->
        <el-form-item label="消息格式">
          <el-input
            placeholder="默认格式：
🔒:$tm
$xx
🔑:$da
解析:$jx"
            :autosize="{ minRows: 3, maxRows: 10}"
            type="textarea"
            v-model="officialAccountForm.message_format"
          >
          </el-input>
          <!-- 提示 -->
          <div class="tips">
            <el-link
              href="https://bj.96weixin.com/emoji/"
              target="_blank"
            >emoji 代码获取</el-link>
            <br>
            $tm 题目 $xx 选项 $da 答案 $jx 解析 $name 用户昵称
            <br>
            以上为格式变量,<strong style="color: #E6A23C;">不会填写请留空</strong>
          </div>
        </el-form-item>
        <!-- 是否开启文本搜索 -->
        <el-form-item label="文本搜索">
          <el-switch v-model="officialAccountForm.text_search"></el-switch>
        </el-form-item>
        <!-- 是否开启文本搜索 -->
        <el-form-item label="语音搜索">
          <el-switch v-model="officialAccountForm.voice_search"></el-switch>
        </el-form-item>
        <!-- 是否开启文本搜索 -->
        <el-form-item label="图片搜索">
          <el-switch v-model="officialAccountForm.image_search"></el-switch>
        </el-form-item>
        <!-- 保存 -->
        <el-button @click="saveConfig()">保存修改</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditOfficialAccount",
  created() {
    this.getofficialAccountConfig(this.$route.params.id);
  },
  data() {
    return {
      officialAccountForm: {
        gzh_id: "",
        follow_reply: "",
        message_format: "",
        total_switch: false,
        text_search: false,
        voice_search: false,
        image_search: false,
      },
    };
  },
  methods: {
    async getofficialAccountConfig(id) {
      const { data: res } = await this.$http.get(
        "/v1/getMpConfig",
        { params: { gzh_id: id } }
      );
      this.needTrans("total_switch", "int", res.data);
      this.needTrans("text_search", "int", res.data);
      this.needTrans("voice_search", "int", res.data);
      this.needTrans("image_search", "int", res.data);
      Object.assign(this.officialAccountForm, res.data);
    },
    // 修改默认值
    needTrans(transKey, transValue, obj) {
      Object.keys(obj).forEach((key) => {
        if (key === transKey) {
          if (transValue === "int") obj[key] = obj[key] === 1 ? true : false;
          else if (transValue === "boolean")
            obj[key] = obj[key] === true ? 1 : 0;
          else obj[key] = transValue;
        }
      });
      // return obj;
    },
    async saveConfig() {
      let transForm = Object.assign({}, this.officialAccountForm);
      this.needTrans("total_switch", "boolean", transForm);
      this.needTrans("text_search", "boolean", transForm);
      this.needTrans("voice_search", "boolean", transForm);
      this.needTrans("image_search", "boolean", transForm);
      const { data: res } = await this.$http.post(
        "/v1/setMpConfig",
        transForm
      );
      if (res.code === 200) {
        this.$router.push("/admin/officialAccountsList");
        this.$message.success("保存成功");
      } else {
        this.$message.warning("保存失败，请联系管理员");
      }
    },
    initialize(){
      Object.assign(this.officialAccountForm,{
        follow_reply: "终于等到你~ 直接发送题目即可查看相关答案哦",
        message_format: "🔒:$tm\n$xx\n🔑:$da\n解析:$jx",
        total_switch: true,
        text_search: true,
        voice_search: true,
        image_search: true,
      })
    }
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  .el-button {
    background-color: #4e46dd;
    color: #fff;
    border: 0;
  }
  .tips {
    line-height: 25px;
  }
  /deep/ .el-switch.is-checked .el-switch__core {
    border-color: #4e46dd;
    background-color: #4e46dd;
  }
}
</style>