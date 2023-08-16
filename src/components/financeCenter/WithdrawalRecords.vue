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
          prop="date"
          label="申请时间"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="手续费"
        >
        </el-table-column>
        <el-table-column
          label="到账金额"
          prop="address"
        >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '已完成' ? 'success' : 'primary'"
              disable-transitions
            >{{scope.row.status}}</el-tag>
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
    // 获取粉丝列表
    async getWithdrawalRecords() {
      console.log("send request.");
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
      tableData: [
        {
          date: "2016-05-02",
          name: "0",
          address: "2345.49",
          status: "已完成",
        },
        {
          date: "2016-05-04",
          name: "0",
          address: "2532.52",
          status: "已完成",
        },
        {
          date: "2016-05-01",
          name: "0",
          address: "1352.53",
          status: "已完成",
        },
        {
          date: "2016-05-03",
          name: "0",
          address: "132.54",
          status: "处理中",
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
  strong{
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