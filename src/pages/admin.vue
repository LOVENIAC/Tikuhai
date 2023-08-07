<template>
  <el-container class="home-container">
    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
      v-if="isMobile"
    >
      <el-menu
        active-text-color="#4e46dd"
        router
        :default-active="activePath"
      >
        <!-- 一级菜单 -->
        <template v-for="item in menuList">
          <template v-if="item.children">
            <el-submenu
              :index="item.id + ''"
              :key="item.id"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="addTab(subItem)"
              >
                <template slot="title">
                  <i :class=subItem.icon></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item
              :index="item.path"
              :key="item.id"
              @click="addTab(item)"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.authName }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-drawer>
    <!-- 头部区域 -->
    <el-header>
      <div
        class="logo"
        v-if="!isMobile"
      >
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
        <span>TiKuHai</span>
      </div>
      <!-- 导航栏 -->
      <el-tabs
        v-if="!isMobile"
        @tab-click="changeRoute()"
        v-model="editableTabsValue"
        type="card"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          :closable="item.closable"
          v-for="(item) in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <!-- 退出登录 -->
      <el-button
        @click="exit()"
        class="exit-btn"
      >退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside v-if="!isMobile">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          active-text-color="#4e46dd"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <template v-for="item in menuList">
            <template v-if="item.children">
              <el-submenu
                :index="item.id + ''"
                :key="item.id"
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item
                  :index="subItem.path"
                  v-for="subItem in item.children"
                  :key="subItem.id"
                  @click="addTab(subItem)"
                >
                  <template slot="title">
                    <i :class=subItem.icon></i>
                    <span>{{ subItem.authName }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item
                :index="item.path"
                :key="item.id"
                @click="addTab(item)"
              >
                <i :class="item.icon"></i>
                <span slot="title">{{ item.authName }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main v-loading="loading">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from "@/router";
export default {
  name: "userAdmin",
  created() {
    const _this = this;
    this.getUserInfo();
    this.activePath = _this.$route.path;
    // 监听前进后退
    window.addEventListener("popstate", () => {
      _this.activePath = _this.$route.path;
      _this.saveNavState(_this.$route.path);
    });
    // 标签页
    if (sessionStorage.getItem("editableTabs")) {
      this.editableTabsValue = _this.$route.path;
      this.editableTabs = JSON.parse(sessionStorage.getItem("editableTabs"));
    }
  },
  methods: {
    // 删除标签
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      // 切换到新的路由
      this.$router.push(this.editableTabsValue);
      this.saveNavState(this.editableTabsValue);
    },
    // 添加标签
    addTab(item) {
      // 判断是否存在
      let isExist = false;
      let path = item.path;
      // 判断是否存在
      this.editableTabs.forEach((tab) => {
        if (tab.name === item.path) {
          isExist = true;
        }
      });
      // 不存在添加
      if (!isExist) {
        this.editableTabs.push({
          title: item.authName,
          name: path,
          closable: true,
        });
      }
      this.editableTabsValue = path;
      this.saveNavState(path);
    },
    // 获取用户信息
    getUserInfo() {
      this.$http.get("/v1/u/info").then((res) => {
        if (res.data.code == 401) {
          router.push("/login");
          this.$message("登录过期，请重新登录");
        } else if (res.data.code !== 200) {
          router.push("/login");
          this.$message.error(res.data.msg);
        }
      });
    },
    // 存储当前会话路径
    saveNavState(activePath) {
      sessionStorage.setItem("activePath", activePath);
      sessionStorage.setItem("editableTabs", JSON.stringify(this.editableTabs));
      this.activePath = activePath;
    },
    // 退出登录
    exit() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/login");
    },
    // tab切换路由
    changeRoute() {
      this.$router.push(this.editableTabsValue);
      this.saveNavState(this.editableTabsValue);
    },
  },
  data() {
    return {
      isMobile: false,
      drawer: true,
      direction: "ltr",
      loading: false,
      editableTabsValue: "/admin/dashboard",
      editableTabs: [
        {
          title: "概览",
          name: "/admin/dashboard",
          closable: false,
        },
      ],
      activePath: "",
      menuList: [
        {
          id: 1,
          authName: "概览",
          icon: "el-icon-s-data",
          path: "/admin/dashboard",
        },
        {
          id: 2,
          authName: "公众号管理",
          icon: "el-icon-film",
          children: [
            {
              id: 3,
              authName: "公众号粉丝",
              icon: "el-icon-s-custom",
              path: "/admin/officialAccountsFans",
            },
            {
              id: 4,
              authName: "公众号列表",
              icon: "el-icon-menu",
              path: "/admin/officialAccountsList",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.home-container {
  min-width: 800px;
  height: 100%;
  .el-header {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    .exit-btn {
      background-color: #4e46dd;
      color: #fff;
      position: absolute;
      right: 20px;
    }
    .logo {
      display: flex;
      img {
        height: 50px;
      }
      > span {
        color: #000;
        font-weight: bolder;
        font-size: 25px;
        align-self: flex-end;
      }
    }
    .el-tabs {
      position: absolute;
      left: 300px;
      align-self: flex-end;
      /deep/ .el-tabs__header {
        user-select: none;
        margin-bottom: 0;
      }
      /deep/ .el-tabs__nav {
      }
      /deep/ .el-tabs__item {
        border-radius: 1px;
      }
      /deep/ .el-tabs__item:hover {
        color: #4e46dd;
      }
      /deep/ .is-active {
        color: #4e46dd;
        border-top: 2px solid #4e46dd;
      }
    }
  }
  // .el-aside {
  //   width: fit-content !important;
  // }
  .el-menu {
    border-right: 2px solid #4e46dd;
    span {
      user-select: none;
    }
  }
  /deep/ .el-drawer {
    width: 210px !important;
  }
}

.el-main {
  height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: #f1f1f1;
  box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.15) !important;
}
</style>