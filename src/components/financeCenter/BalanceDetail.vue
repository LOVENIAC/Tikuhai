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
        <span style="font-weight: bold;">可用余额：523 元</span>
        <div class="withdrawal-btn" @click="userWithdrawal()">我要提现</div>
        <span style="color: #909399;">冻结：0 元</span>
      </div>
      <!-- 提现记录表单 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="时间"
        >
        </el-table-column>
        <el-table-column
          prop="money"
          label="变动金额（元）"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="资金来源"
        >
        </el-table-column>
        <el-table-column
          prop="description"
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
    userWithdrawal(){
      this.$message.success('申请提交成功')
    },
    // 获取余额记录
    async getBalanceDetail() {
      console.log("send request.");
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
      tableData: [
        {
          date: "2016-05-02",
          money: "2351.6",
          address: "用户提现",
          description: "用户提现",
        },
        {
          date: "2016-05-04",
          money: "-5.2",
          address: "用户退款",
          description: "套餐购买,粉丝id:1542686",
        },
        {
          date: "2016-05-01",
          money: "9.9",
          address: "套餐购买",
          description: "套餐购买,粉丝id:1672563",
        },
        {
          date: "2016-05-03",
          money: "8.8",
          address: "套餐购买",
          description: "用户退款,订单号:2799516",
        },
      ],
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