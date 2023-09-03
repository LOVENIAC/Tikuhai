<template>
  <div class="wrapper">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的财务</el-breadcrumb-item>
      <el-breadcrumb-item>提现记录</el-breadcrumb-item>
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
      <!-- 提现记录表单 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="created_at"
          label="申请时间"
        >
        </el-table-column>
        <el-table-column
          prop="commission"
          label="手续费"
        >
        </el-table-column>
        <el-table-column
          label="到账金额"
          prop="amount"
        >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 0 ? 'success' : 'primary'"
              disable-transitions
            >{{ scope.row.status === 0 ? '已完成' : '处理中' }}</el-tag>
          </template>
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
  name: "WithdrawalRecords",
  created() {
    this.getWithdrawalRecords();
  },
  methods: {
    accountSettings() {
      this.$emit("addTab", {
        authName: "提现配置",
        path: "/admin/accountSettings",
      });
      this.$router.push("/admin/accountSettings");
    },
    // 获取提现记录
    async getWithdrawalRecords() {
      const { data: res } = await this.$http.get("/v1/u/withdrawalList", {
        params: this.queryInfo,
      });
      console.log(res);
      let tableData = [];
      res.data.data.forEach((element) => {
        tableData.push({
          created_at: element.created_at,
          amount: element.amount / 100,
          commission: element.commission / 100,
          status: element.status,
        });
      });
      this.tableData = tableData;
    },
    // 切换页面条数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getWithdrawalRecords();
    },
    // 切换页面
    handleSizeChange(newPageSize) {
      this.queryInfo.pageSize = newPageSize;
      this.getWithdrawalRecords();
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
</style>