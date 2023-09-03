<template>
  <div class="wrapper">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>公众号管理</el-breadcrumb-item>
      <el-breadcrumb-item>公众号列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体内容 -->
    <el-card>
      <!-- 授权按钮 -->
      <el-button
        @click="goToAuth()"
        class="accredit-btn"
      >添加授权</el-button>
      <!-- 公众号列表 -->
      <el-table :data="officalAccounts">
        <el-table-column
          label="创建日期"
          width="180"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ scope.row.created_at | dataInterception}}</span>
          </template>
        </el-table-column>
        <!-- 公众号名称 -->
        <el-table-column
          label="公众号"
          width="100"
          prop="nick_name"
        >
        </el-table-column>
        <!-- 公众号头像 -->
        <el-table-column
          label="头像"
          width="100"
          fit="fill"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.head_img"
            >
            </el-image>
          </template>
        </el-table-column>
        <!-- 公众号类型 -->
        <el-table-column
          label="公众号类型"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.service_type_info | serviceType }}</el-tag>
          </template>
        </el-table-column>
        <!-- 认证类型 -->
        <el-table-column
          label="认证信息"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.verify_type_info===-1? 'danger': 'success'"
              size="medium"
            >{{ scope.row.verify_type_info | verifyType}}</el-tag>
          </template>
        </el-table-column>
        <!-- 二维码 -->
        <el-table-column
          label="二维码"
          width="100"
          prop="nick_name"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
            >
              <el-image
                style="width: 150px; height: 150px;"
                :src="scope.row.qrcode_url"
              >
              </el-image>
              <el-image
                slot="reference"
                style="width: 70px; height: 70px"
                :src="scope.row.qrcode_url"
              >
              </el-image>
            </el-popover>

          </template>
        </el-table-column>
        <!-- 主体名称 -->
        <el-table-column
          label="主体信息"
          width="220"
          prop="principal_name"
        ></el-table-column>
        <!-- 公众号状态 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.account_status===1? 'success': 'danger'"
              size="medium"
            >{{ scope.row.account_status | accountStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tag
              @click="editOfficialAccount(scope.row.id)"
              style="background-color: #4e46dd;color: white;cursor: pointer;"
              size="medium"
            >编辑</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "OfficialAccountsList",
  filters: {
    dataInterception(value) {
      return value.slice(0, 10);
    },
    // 公众号类型
    serviceType(value) {
      switch (value) {
        case 0:
          return "订阅号";
        case 1:
          return "旧订阅号";
        case 2:
          return "服务号";
        default:
          return value;
      }
    },
    // 认证状态
    verifyType(value) {
      switch (value) {
        case -1:
          return "未认证";
        case 0:
          return "微信认证";
        default:
          return "其他认证";
      }
    },
    accountStatus(value) {
      switch (value) {
        case 1:
          return "正常";
        case 14:
          return "已注销";
        case 16:
          return "已封禁";
        case 18:
          return "已告警";
        case 19:
          return "已冻结";
        default:
          return "异常";
      }
    },
  },
  created() {
    this.getAuthUrl();
    this.getOfficalAccounts();
  },
  data() {
    return {
      authUrl: "",
      officalAccounts: [],
    };
  },
  methods: {
    // 获取授权链接
    async getAuthUrl() {
      const { data: res } = await this.$http.get(
        "/v1/gzhAuthUrl"
      );
      this.authUrl = res.data.url;
    },
    goToAuth() {
      window.open(this.authUrl, "_blank");
    },
    async getOfficalAccounts() {
      const { data: res } = await this.$http.get(
        "/v1/getMpList"
      );
      this.officalAccounts = res.data;
    },
    editOfficialAccount(id) {
      // this.$emit("addTab", {
      //   authName: "公众号配置",
      //   path: `/admin/editOfficialAccount/${id}`,
      // });
      this.$router.push(`/admin/editOfficialAccount/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  .accredit-btn {
    background-color: #4e46dd;
    color: #fff;
    border-color: #4e46dd;
  }
  /deep/ .el-table__body {
    width: 100% !important;
  }
  /deep/ .el-table__header {
    width: 100% !important;
  }
}
</style>