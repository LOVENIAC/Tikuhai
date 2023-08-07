import Vue from "vue";
import VueRouter from "vue-router";
import userLogin from "@/pages/login";
import userIndex from "@/pages/index";
import userAdmin from "@/pages/admin";
import dashboard from "@/components/dashboard";
import officialAccountsFans from "@/components/officialAccountsFans";
import officialAccountsList from "@/components/officialAccountsList";

let originPush = VueRouter.prototype.push; //备份原push方法

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //如果传了回调函数，直接使用
    originPush.call(this, location, resolve, reject);
  } else {
    //如果没有传回调函数，手动添加
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: userIndex,
      meta: {
        title: "题库海",
      },
    },
    {
      path: "/login",
      component: userLogin,
      meta: {
        title: "用户登录",
      },
    },
    {
      path: "/admin",
      component: userAdmin,
      redirect: "/admin/dashboard",
      meta: {
        title: "管理后台",
      },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: dashboard,
          meta: { title: "管理后台" },
        },
        {
          path: "officialAccountsFans",
          name: "officialAccountsFans",
          component: officialAccountsFans,
          meta: { title: "管理后台" },
        },
        {
          path: "officialAccountsList",
          name: "officialAccountsList",
          component: officialAccountsList,
          meta: { title: "管理后台" },
        },
      ],
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const token = localStorage.getItem("token");
  if (to.path === "/admin") {
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
