<template>
  <div>
    <el-card shadow="always">
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="item in basicDatas"
          :key="item.title"
        >
          <div>
            <el-statistic
              :group-separator="item['group-separator']"
              :precision="item.precision ? item.precision : 0"
              :suffix="item.suffix"
              decimal-separator="."
              :value="item.value"
              :title="item.title"
            ></el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- echarts图标 -->
    <el-card class="echarts">
      <div
        ref="fansChart"
        id="basic_charts"
      ></div>
    </el-card>
    <!-- echarts图标 -->
    <el-card class="echarts">
      <div
        ref="balanceCharts"
        id="basic_charts"
      ></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "AdminDashboard",
  data() {
    return {
      basicDatas: [
        {
          "group-separator": ",",
          precision: 2,
          value: 0,
          title: "余额",
        },
        {
          suffix: "%",
          value: 0,
          title: "分佣比例",
        },
        {
          value: 0,
          title: "活跃粉丝",
        },
        {
          value: 0,
          title: "公众号数量",
        },
      ],
      fansData: {
        xData: [],
        yData: [],
      },
      balanceData: {
        xData: [],
        yData: [],
      },
    };
  },
  created() {},
  async mounted() {
    let fansEcharts = echarts.init(this.$refs.fansChart);
    let balanceEcharts = echarts.init(this.$refs.balanceCharts);
    await this.getUserStatisticalData();
    // 设置参数
    fansEcharts.setOption({
      title: {
        text: "粉丝情况",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["新增粉丝"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.fansData.xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "新增粉丝",
          type: "line",
          stack: "Total",
          data: this.fansData.yData,
        },
      ],
    });
    balanceEcharts.setOption({
      title: {
        text: "收益情况",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["当日收益"],
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.balanceData.xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "当日收益",
          data: this.balanceData.yData,
          type: "line",
          areaStyle: {},
          stack: "Total",
        },
      ],
    });
  },
  methods: {
    async getUserStatisticalData() {
      const { data: res } = await this.$http.get(
        "http://www.tikuhai.com/v1/u/statistics"
      );
      console.log(res);
      if (res.code == 200) {
        this.basicDatas[0].value = res.data.user_money / 100;
        this.basicDatas[1].value = res.data.commission_ratio;
        this.basicDatas[2].value = res.data.fans_count;
        this.basicDatas[3].value = res.data.gzh_count;
        res.data.fans.reverse();
        res.data.balance.reverse();
        this.fansData.xData = res.data.fans.map((item) => item.date);
        this.fansData.yData = res.data.fans.map((item) => item.value);
        this.balanceData.xData = res.data.balance.map((item) => item.date);
        this.balanceData.yData = res.data.balance.map(
          (item) => item.value / 100
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
#basic_charts {
  height: 300px;
}
.echarts {
  margin-top: 20px;
}
</style>