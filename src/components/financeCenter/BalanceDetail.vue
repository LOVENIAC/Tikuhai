<template>
  <div class="wrapper">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的财务</el-breadcrumb-item>
      <el-breadcrumb-item>我的余额</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体部分 -->
    <el-card>
      <!-- 提示 -->
      <div class="tips">
        <i class="el-icon-info"></i>
        <span>
          提现前，请先去
          <strong
            @click="accountSettings()"
            style="color: #606266;"
          > 提现配置 </strong>
          中配置相关信息，否则无法到账！
        </span>
      </div>
      <!-- 用户提现 -->
      <div class="withdrawal-box">
        <span style="font-weight: bold;">可用余额：0 元</span>
        <div
          class="withdrawal-btn"
          @click="userWithdrawal()"
        >我要提现</div>
        <span style="color: #909399;">冻结：0 元</span>
      </div>
      <!-- 提现记录表单 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="created_at"
          label="时间"
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          label="变动金额（元）"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="资金来源"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="商品说明"
        >
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="msg-pagination-container"
        @size-change="handleSizeChange"
        :page-sizes="[5, 10, 20]"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.page"
        :page-size="5"
        :pager-count="5"
        layout="sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "BalanceDetail",
  created() {
    this.getBalanceDetail();
  },
  methods: {
    // 添加标签
    accountSettings() {
      this.$emit("addTab", {
        authName: "提现配置",
        path: "/admin/accountSettings",
      });
      this.$router.push("/admin/accountSettings");
    },
    // 用户提现
    userWithdrawal() {
      this.$http.get("/v1/u/withdrawal").then((res) => {
        if (res.data.code == 200) this.$message.success("申请提现成功～");
        else this.$message.warning(res.data.msg);
      });
    },
    // 获取余额记录
    async getBalanceDetail() {
      const { data: res } = await this.$http.get("/v1/u/balanceList", {
        params: this.queryInfo,
      });
      let tableData = [];
      res.data.data.forEach((element) => {
        let type = "";
        switch (element.type) {
          case 0:
            type = "收入";
            break;
          case 1:
            type = "支出";
            break;
          case 2:
            type = "提现";
            break;
        }
        tableData.push({
          created_at: element.created_at.slice(0, 10),
          amount: element.amount / 100,
          type: type,
          remark: element.remark,
        });
      });
      this.tableData = tableData;
    },
    // 切换页面条数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getBalanceDetail();
    },
    // 切换页面
    handleSizeChange(newPageSize) {
      this.queryInfo.pageSize = newPageSize;
      this.getBalanceDetail();
    },
  },
  data() {
    return {
      queryInfo: {
        pageSize: 5,
        page: 1,
      },
      total: 0,
      tableData: [],
    };
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 20px;
}
.tips {
  i {
    font-size: 18px;
    margin-right: 5px;
  }
  strong {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f4f4f5;
  color: #909399;
  padding: 8px 16px;
  border-radius: 2px;
  font-size: 13px;
  height: 50px;
}
.withdrawal-box {
  display: flex;
  margin: 10px 0;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  .withdrawal-btn {
    height: 40px;
    line-height: 40px;
    margin: 0 10px;
    background-color: #4e46dd;
    color: #fff;
    border-radius: 5px;
    padding: 0 10px;
    cursor: pointer;
    user-select: none;
  }
}
</style>