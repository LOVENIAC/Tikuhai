import Vue from "vue";
import VueRouter from "vue-router";
import userLogin from "@/pages/login";
import userIndex from "@/pages/index";
import userAdmin from "@/pages/admin";

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
      meta: {
        title: "管理后台",
      },
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
