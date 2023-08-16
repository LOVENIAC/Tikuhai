import Vue from "vue";
import VueRouter from "vue-router";
import userLogin from "@/pages/login";
import userIndex from "@/pages/index";
import userAdmin from "@/pages/admin";
import AdminDashboard from "@/components/Dashboard";
import OfficialAccountsFans from "@/components/OfficialAccountsCenter/OfficialAccountsFans";
import OfficialAccountsList from "@/components/OfficialAccountsCenter/OfficialAccountsList";
import AccountSettings from "@/components/financeCenter/AccountSettings"
import WithdrawalRecord from "@/components/financeCenter/WithdrawalRecords"
import BalanceDetail from "@/components/financeCenter/BalanceDetail"
import EditOfficialAccount from "@/components/OfficialAccountsCenter/EditOfficialAccount"


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
      redirect: "/admin/Dashboard",
      meta: {
        title: "管理后台",
      },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: AdminDashboard,
          meta: { title: "概览" },
        },
        {
          path: "officialAccountsFans",
          name: "officialAccountsFans",
          component: OfficialAccountsFans,
          meta: { title: "公众号粉丝" },
        },
        {
          path: "officialAccountsList",
          name: "officialAccountsList",
          component: OfficialAccountsList,
          meta: { title: "公众号列表" },
        },
        {
          path: "accountSettings",
          name: "accountSettings",
          component: AccountSettings,
          meta: { title: "提现配置" },
        },
        {
          path: "withdrawalRecord",
          name: "withdrawalRecord",
          component: WithdrawalRecord,
          meta: { title: "提现记录" },
        },
        {
          path: "balanceDetail",
          name: "balanceDetail",
          component: BalanceDetail,
          meta: { title: "余额明细" },
        },
        {
          path: "editOfficialAccount/:id",
          name: "editOfficialAccount",
          component: EditOfficialAccount,
          meta: { title: "公众号配置" },
        },
      ],
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   const token = localStorage.getItem("token");
//   if (to.path === "/admin") {
//     if (token) {
//       next();
//     } else {
//       next("/login");
//     }
//   } else {
//     next();
//   }
// });

export default router;
