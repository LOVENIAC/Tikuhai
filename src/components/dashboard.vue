<template>
  <div>
    <el-card
      class="box-card"
      shadow="always"
    >
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
  </div>
</template>

<script>
export default {
  name: "adminDashboard",
  data() {
    return {
      basicDatas: [
        {
          "group-separator": ",",
          precision: 2,
          value: 2485.02,
          title: "余额",
        },
        {
          suffix: "%",
          value: 60,
          title: "分佣比例",
        },
        {
          value: 9124,
          title: "活跃粉丝",
        },
        {
          value: 1,
          title: "公众号数量",
        },
      ],
      like: true,
      value1: 4154.564,
      value2: 2222,
      title: "余额",
    };
  },
};
</script>
<style lang="less" scoped>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>