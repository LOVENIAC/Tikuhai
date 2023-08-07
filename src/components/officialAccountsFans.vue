<template>
  <div class="wrapper">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>公众号管理</el-breadcrumb-item>
      <el-breadcrumb-item>公众号粉丝</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体内容 -->
    <el-card>
      <!-- 用户搜索 -->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            v-model="queryInfo.id"
            placeholder="请输入用户id"
          >
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="queryInfo.openid"
            placeholder="请输入用户openId"
          >
          </el-input></el-col>
        <el-col :span="6">
          <el-button @click="getFansList">
            搜索
          </el-button>
        </el-col>
      </el-row>
      <!-- 粉丝列表 -->
      <div class="fansList">
        <!-- 基本信息 -->
        <div
          class="fansInfo"
          v-for="fan in fansList"
          :key="fan.id"
        >
          <el-avatar :src="fan.headimgurl? fan.headimgurl: avatorInit"></el-avatar>
          <div style="padding-left: 15px; height: 100%;">
            <div class="fansInfo-top">
              <div class="fansName">{{ fan.nickname ? fan.nickname: '无权限' }}</div>
              <el-tag size="medium">ID:{{ fan.id }}</el-tag>
            </div>
            <div class="fansInfo-bottom">
              <span style="margin-right: 10px;">剩余:{{ fan.quota }}</span>
              <span>已用:{{ fan.used_quota }}</span>
            </div>
          </div>
          <!-- 修改按钮 -->
          <el-button
            icon="el-icon-edit"
            @click="editFansInfo(fan)"
          >
            修改
          </el-button>
        </div>
      </div>
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
  name: "officialAccountsFans",
  created() {
    this.getFansList();
  },
  methods: {
    // 获取粉丝列表
    async getFansList() {
      const { data: res } = await this.$http.get("/v1/getFansList", {
        params: this.queryInfo,
      });
      console.log(res);
      if (res.code !== 200) return this.$message.error(res.msg);
      this.total = res.data.total;
      this.fansList = res.data.data;
    },
    // 切换页面条数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getFansList();
    },
    // 切换页面
    handleSizeChange(newPageSize) {
      this.queryInfo.pageSize = newPageSize;
      this.getFansList();
    },
    // 修改用户信息
    editFansInfo(fanInfo) {
      const _this = this;
      this.$prompt("修改用户次数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d+$/,
        inputErrorMessage: "请输入正确的数字",
      })
        .then(({ value }) => {
          _this.$http
            .post("/v1/fansEdit", {
              fan_id: `${fanInfo.id}`,
              quota: value,
            })
            .then(({ data: res }) => {
              if (res.code === 200) {
                _this.$message({
                  type: "success",
                  message: `${fanInfo.id}次数修改成功`,
                });
                _this.getFansList();
              } else {
                _this.$message.error(res.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  data() {
    return {
      avatorInit:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      queryInfo: {
        id: "",
        openid: "",
        pageSize: 5,
        page: 1,
      },
      fansList: [],
      total: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
    .fansList {
      margin: 10px 0;
      .fansInfo {
        height: 90px;
        border-bottom: 1px solid #f1f1f1;
        font-weight: 500;
        font-size: 13px;
        padding: 20px 0;
        display: flex;
        align-items: center;
        position: relative;
        /deep/.el-button {
          border: 2px solid #f2f2f2;
          color: gray;
          background-color: #fff;
          position: absolute;
          right: 0;
        }
        .fansInfo-top {
          display: flex;
          align-items: center;
        }
        .fansInfo-bottom {
          line-height: 25px;
          height: 25px;
        }
        .el-avatar {
          height: 50px;
          width: 50px;
        }
        .el-tag {
          margin-left: 15px;
        }
      }
    }
  }
  .el-breadcrumb {
    margin-bottom: 15px;
  }
  /deep/ .el-pager li.active {
    color: #4e46dd;
  }
  .el-button {
    background-color: #4e46dd;
    color: #fff;
    border: 0;
  }
}
</style>