<template>
  <div class="wrapper">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的财务</el-breadcrumb-item>
      <el-breadcrumb-item>提现配置</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体部分 -->
    <el-card>
      <el-form
        ref="form"
        :model="accountSettingsForm"
        label-width="100px"
      >
        <el-form-item label="真实姓名">
          <el-input
            placeholder="请输入真实姓名，否则无法到账"
            v-model="accountSettingsForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            placeholder="微信号或者QQ号"
            v-model="accountSettingsForm.contactInfo"
          ></el-input>
        </el-form-item>
        <el-form-item label="收款平台">
          <el-radio-group v-model="accountSettingsForm.collectionMethods">
            <el-radio label="支付宝"></el-radio>
            <el-radio label="微信"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收款码">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :file-list="collectionQRCOdeUrl"
            :on-change="(file, fileList)=>handleChange('collectionQRCode', file, fileList)"
            :before-upload="(file)=>beforeAvatarUpload('collectionQRCode', file)"
            :on-success="(response, file, fileList)=>handleFileSuccess('collectionQRCode', response, file, fileList)"
            :headers="headers"
            :data="{file_type:'receipt_code'}"
            :on-preview="handlePictureCardPreview"
            :on-remove="(file, fileList)=>handleRemove('collectionQRCode', file, fileList)"
            :class="{hide:collectionHideUpload}"
          >
            <i class="el-icon-plus"></i>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过1MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="客服二维码">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :file-list="serviceQRCodeUrl"
            :on-change="(file, fileList)=>handleChange('serviceQRCode', file, fileList)"
            :before-upload="(file)=>beforeAvatarUpload('serviceQRCode', file)"
            :on-success="(response, file, fileList)=>handleFileSuccess('serviceQRCode', response, file, fileList)"
            :headers="headers"
            :data="{file_type:'service_qr_code'}"
            :on-preview="handlePictureCardPreview"
            :on-remove="(file, fileList)=>handleRemove('serviceQRCode', file, fileList)"
            :class="{hide:serviceHideUpload}"
          >
            <i class="el-icon-plus"></i>
            <div
              slot="tip"
              class="el-upload__tip"
            >微信二维码，用户遇到问题时会添加</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            @click="saveConfig"
          >保存信息</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AccountSettings",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      collectionHideUpload: false,
      serviceHideUpload: false,
      uploadUrl: "http://open.tikuhai.com/v1/u/upload",
      headers: {},
      collectionQRCOdeUrl: [],
      serviceQRCodeUrl: [],
      accountSettingsForm: {
        name: "",
        contactInfo: "",
        collectionQRCOde: "",
        collectionMethods: "支付宝",
        serviceQRCode: "",
      },
    };
  },
  created() {
    this.getAccountSettings();
  },
  mounted() {
    const token = localStorage.getItem("token");
    this.headers.Authorization = token ? `Bearer ${token}` : "";
  },
  methods: {
    handleRemove(type, file, fileList) {
      if (type === "collectionQRCode") {
        this.collectionHideUpload = fileList.length >= 1;
      } else {
        this.serviceHideUpload = fileList.length >= 1;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传中
    handleChange(type, file, fileList) {
      if (type === "collectionQRCode") {
        this.collectionQRCOdeUrl = fileList;
        this.collectionHideUpload = fileList.length >= 1;
      } else {
        this.serviceQRCodeUrl = fileList;
        this.serviceHideUpload = fileList.length >= 1;
      }
    },
    // 上传前格式校验
    beforeAvatarUpload(type, file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB");
        return false;
      }
      return isJPG && isLt2M;
    },
    // 图片上传成功
    handleFileSuccess(type, res) {
      if (res.code == 200) {
        if (type === "collectionQRCode") {
          this.$set(this.accountSettingsForm, "collectionQRCOde", res.data.url);
        } else {
          this.$set(this.accountSettingsForm, "serviceQRCode", res.data.url);
        }
        this.$message.success("上传成功");
        // console.log(this.accountSettingsForm);
      } else {
        // 上传失败显示 上传按钮
        if (type === "collectionQRCode") this.collectionHideUpload = false;
        else this.serviceHideUpload = false;
        this.$message.error(res.msg);
      }
    },
    async saveConfig() {
      // console.log({
      //   real_name: this.accountSettingsForm.name,
      //   withdrawal_method:
      //     this.accountSettingsForm.collectionMethods === "支付宝" ? 0 : 1,
      //   receipt_code: this.accountSettingsForm.collectionQRCOde,
      //   phone_number: this.accountSettingsForm.contactInfo,
      //   service_qr_code: this.accountSettingsForm.serviceQRCode,
      // });
      const { data: res } = await this.$http.post("/v1/u/infoExtraEdit", {
        real_name: this.accountSettingsForm.name,
        withdrawal_method:
          this.accountSettingsForm.collectionMethods === "支付宝" ? "1" : "2",
        receipt_code: this.accountSettingsForm.collectionQRCOde,
        phone_number: this.accountSettingsForm.contactInfo,
        service_qr_code: this.accountSettingsForm.serviceQRCode,
      });
      if (res.code === 200) {
        this.$message.success("保存提现配置成功");
        // this.$router.go(0);
        // this.getAccountSettings();
      } else {
        this.$message.error(res.msg);
      }
    },
    async getAccountSettings() {
      const { data: res } = await this.$http.get(
        "http://open.tikuhai.com/v1/u/infoExtra"
      );
      if (res.code === 200) {
        this.accountSettingsForm.name = res.data.real_name;
        this.accountSettingsForm.collectionMethods =
          res.data.withdrawal_method === 1 ? "支付宝" : "微信";
        // 添加图片到列表，并隐藏上传
        this.accountSettingsForm.collectionQRCOde = res.data.receipt_code;
        if (res.data.receipt_code !== "" && this.collectionQRCOdeUrl.length === 0) {
          this.collectionQRCOdeUrl.unshift({
            name: "collection.jpg",
            url: res.data.receipt_code,
          });
          this.collectionHideUpload = true;
        }
        this.accountSettingsForm.serviceQRCode = res.data.service_qr_code;
        if (res.data.service_qr_code !== "" && this.serviceQRCodeUrl.length === 0) {
          this.serviceQRCodeUrl.unshift({
            name: "service.jpg",
            url: res.data.service_qr_code,
          });
          this.serviceHideUpload = true;
        }
        this.accountSettingsForm.contactInfo = res.data.phone_number;
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
}
.el-button {
  background-color: #4e46dd;
  border-color: #4e46dd;
  color: #fff;
}
.el-button:hover {
  background-color: #4e46dd;
  border-color: #4e46dd;
  color: #fff;
}
.el-button:focus {
  background-color: #4e46dd;
  border-color: #4e46dd;
  color: #fff;
}
.el-upload__tip {
  line-height: normal;
}
/deep/.hide .el-upload--picture-card {
  display: none;
}
</style>