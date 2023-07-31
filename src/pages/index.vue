<template>
  <!-- <div class="wrapper">
    <div class="banner">
      <div class="banner-bg">
        <img class="backgroundImage" src="@/assets/img/banner-1.svg" alt="">
        <img class="banner-left" src="@/assets/img/banner-2.svg" alt="">
        <img class="banner-right" src="@/assets/img/banner-3.svg" alt="">
      </div>
      <div class="banner-text">
        <h1>想象这样一个场所……</h1>
      </div>
    </div>
  </div> -->
  <div>
    <!-- Main content -->
    <section class="slice py-7">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-12 col-md-5 col-lg-6 order-md-2 text-center">
            <!-- Image -->
            <figure class="w-100">
              <img
                alt="Image placeholder"
                src="@/assets/img/illustration-3.svg"
                class="img-fluid mw-md-120"
              >
            </figure>
          </div>
          <div class="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
            <!-- Heading -->
            <h1 class="display-4 text-center text-md-left mb-3">
              题库海 <strong class="text-primary">远程教育解决方案专家</strong>
            </h1>
            <!-- Text -->
            <p class="lead text-center text-md-left text-muted">
              题库海是专属于大学生的优质内容互动平台。以精选资讯+校内资源服务+助力校园社交的模式，全面覆盖同学们的学习、工作、生活、娱乐。

            </p>
            <!-- Buttons -->
            <div class="text-center text-md-left mt-5">
              <router-link
                class="btn btn-primary btn-icon"
                to="/login"
              >
                <span class="btn-inner--text">登录</span>
                <span class="btn-inner--icon"><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg></span>

              </router-link>
              <router-link
                class="btn btn-neutral btn-icon d-none d-lg-inline-block"
                to="/login"
              >

                <span class="btn-inner--text">注册</span>
                <span class="btn-inner--icon"><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg></span>

              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="slice slice-lg pt-lg-6 pb-0 pb-lg-6 bg-section-secondary">
      <div class="container">
        <!-- Title -->
        <!-- Section title -->
        <div class="row mb-5 justify-content-center text-center">
          <div class="col-lg-6">
            <span class="badge badge-soft-success badge-pill badge-lg">
              题库海校园解决方案
            </span>
            <h2 class=" mt-4">题库海智慧校园整体解决方案</h2>
            <div class="mt-2">
              <p class="lead lh-180">稳定运营时间久的校园第三方公众号服务开发管理平台</p>
            </div>
          </div>
        </div>
        <!-- Card -->
        <div class="row mt-5">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body pb-5">
                <div class="pt-4 pb-5">
                  <img
                    src="@/assets/img/illustration-5.svg"
                    class="img-fluid img-center"
                    style="height: 150px;"
                    alt="Illustration"
                  >
                </div>
                <h5 class="h4 lh-130 mb-3">官方微信</h5>
                <p class="text-muted mb-0">官方微信公众号解决方案致力于为官微全方位打造智慧校园新生态，通过官方资讯发布、教务查询管理、

                  新生入学报到等一系列场景落地，实现线上线下完美互通，进一步增强校园凝聚力和归属感，树立校园

                  文化新标杆。</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-body pb-5">
                <div class="pt-4 pb-5">
                  <img
                    src="@/assets/img/illustration-6.svg"
                    class="img-fluid img-center"
                    style="height: 150px;"
                    alt="Illustration"
                  >
                </div>
                <h5 class="h4 lh-130 mb-3">学校组织</h5>
                <p class="text-muted mb-0">学校组织涵盖招生就业处、团委、学生会、教务处等多个校园服务机构，解决方案努力帮助学校组织成

                  为校园内最智能的掌上服务能手，通过业务预约办理、招生就业指导，高效办理校园事务，展现互联网+校园新风貌。</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-body pb-5">
                <div class="pt-4 pb-5">
                  <img
                    src="@/assets/img/illustration-7.svg"
                    class="img-fluid img-center"
                    style="height: 150px;"
                    alt="Illustration"
                  >
                </div>
                <h5 class="h4 lh-130 mb-3">校园自媒体</h5>
                <p class="text-muted mb-0">校园自媒体解决方案用心助力自媒体成为校园最全面的生活助手，通过校园生活指南、学生创业实践、

                  自媒体运营变现等方面能帮助自媒体规模不断成长壮大，在校园生活里成为一股不可或缺的中坚力量。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="slice slice-lg">
      <div class="container">
        <div class="py-6">
          <div class="row row-grid justify-content-between align-items-center">
            <div class="col-lg-5 order-lg-2">
              <h5 class="h3">简单高效易操作的后台管理界面</h5>
              <p class="lead my-4">
                题库海轻松管理你的校园公众号，支持自定义DIY插件，高可用的拓展模块，清晰，直观，易响应的傻瓜式操作
              </p>
              <ul class="list-unstyled mb-0">
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-shape bg-primary text-white icon-sm rounded-circle mr-3">
                        <i class="fas fa-file-invoice"></i>
                      </div>
                    </div>
                    <div>
                      <span class="h6 mb-0">简单、轻便、高效、易响应</span>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-shape bg-primary text-white icon-sm rounded-circle mr-3">
                        <i class="fas fa-store-alt"></i>
                      </div>
                    </div>
                    <div>
                      <span class="h6 mb-0">快速、拓展、DIY、傻瓜式</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-lg-6 order-lg-1">
              <div class="card mb-0 mr-lg-5">
                <div class="card-body p-2">
                  <img
                    alt="Image placeholder"
                    src="@/assets/img/screen-1-1000x800.jpg"
                    class="img-fluid shadow rounded"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="py-6">
          <div class="row row-grid justify-content-between align-items-center">
            <div class="col-lg-5">
              <h5 class="h3">在题库海您的运营数据一目了然</h5>
              <p class="lead my-4">
                清晰直观的后台数据统计策略，在这里每日的运营数据将一目了然，见证自己的运营点滴，成长就在此刻！
              </p>
              <ul class="list-unstyled mb-0">
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-shape bg-primary text-white icon-sm rounded-circle mr-3">
                        <i class="fas fa-file-invoice"></i>
                      </div>
                    </div>
                    <div>
                      <span class="h6 mb-0">直观、数据、运营</span>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-shape bg-primary text-white icon-sm rounded-circle mr-3">
                        <i class="fas fa-store-alt"></i>
                      </div>
                    </div>
                    <div>
                      <span class="h6 mb-0">清晰、美观、化繁为简</span>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="icon icon-shape bg-primary text-white icon-sm rounded-circle mr-3">
                        <i class="fas fa-store-alt"></i>
                      </div>
                    </div>
                    <div>
                      <span class="h6 mb-0">分析、对比</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-lg-6">
              <div class="card mb-0 ml-lg-5">
                <div class="card-body p-2">
                  <img
                    alt="Image placeholder"
                    src="@/assets/img/screen-2-1000x800.jpg"
                    class="img-fluid shadow rounded"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="slice slice-lg bg-section-dark pt-5 pt-lg-8">
      <!-- SVG separator -->
      <div class="shape-container shape-line shape-position-top shape-orientation-inverse">
        <svg
          width="2560px"
          height="100px"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="none"
          x="0px"
          y="0px"
          viewBox="0 0 2560 100"
          style="enable-background:new 0 0 2560 100;"
          xml:space="preserve"
          class=""
        >
          <polygon points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
      <!-- Container -->
      <div class="container position-relative zindex-100">
        <div class="col">
          <div class="row justify-content-center">
            <div class="col-md-10 text-center">
              <div class="mt-4 mb-6">
                <h2 class="h1 text-white">
                  为什么选择题库海?
                </h2>
                <h4 class="text-white mt-3">专业的校园第三方微信服务平台</h4>
                <!-- Play button -->
                <a
                  href="#"
                  class="btn btn-primary btn-icon mt-4"
                >获取更多</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="slice pt-0">
      <div class="container position-relative zindex-100">
        <div class="row">
          <div class="col-xl-4 col-sm-6 mt-n7">
            <div class="card">
              <div class="d-flex p-5">
                <div>
                  <span class="badge badge-warning badge-pill">New</span>
                </div>
                <div class="pl-4">
                  <h5 class="lh-130">自由操作</h5>
                  <p class="text-muted mb-0">
                    模块化操作
                    定义您自己的内容
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-sm-6 mt-sm-n7">
            <div class="card">
              <div class="d-flex p-5">
                <div>
                  <span class="badge badge-success badge-pill">Tips</span>
                </div>
                <div class="pl-4">
                  <h5 class="lh-130">免费使用</h5>
                  <p class="text-muted mb-0">
                    海量免费功能，无限制均可使用
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-12 col-sm-6 mt-xl-n7">
            <div class="card">
              <div class="d-flex p-5">
                <div>
                  <span class="badge badge-danger badge-pill">Update</span>
                </div>
                <div class="pl-3">
                  <h5 class="lh-130">数据安全</h5>
                  <p class="text-muted mb-0">
                    全站采用云A+架构
                    多个RDS云数据库实时存储
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-4 col-sm-6">
            <div class="card">
              <div class="d-flex p-5">
                <div>
                  <span class="badge badge-warning badge-pill">New</span>
                </div>
                <div class="pl-4">
                  <h5 class="lh-130">值得信赖</h5>
                  <p class="text-muted mb-0">
                    专业的校园第三方微信服务平台之一
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-sm-6">
            <div class="card">
              <div class="d-flex p-5">
                <div>
                  <span class="badge badge-success badge-pill">Tips</span>
                </div>
                <div class="pl-4">
                  <h5 class="lh-130">题库丰富</h5>
                  <p class="text-muted mb-0">
                    海量题库资源数量，极速的响应，轻松获取
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-12 col-sm-6">
            <div class="card">
              <div class="d-flex p-5">
                <div>
                  <span class="badge badge-danger badge-pill">Update</span>
                </div>
                <div class="pl-3">
                  <h5 class="lh-130">资源充足</h5>
                  <p class="text-muted mb-0">
                    大学生学习资料库，涵盖200+个专业资源.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer
      class="position-relative"
      id="footer-main"
    >
      <div class="footer pt-lg-7 footer-dark bg-dark">
        <!-- SVG shape -->
        <div class="shape-container shape-line shape-position-top shape-orientation-inverse">
          <svg
            width="2560px"
            height="100px"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="none"
            x="0px"
            y="0px"
            viewBox="0 0 2560 100"
            style="enable-background:new 0 0 2560 100;"
            xml:space="preserve"
            class=" fill-section-secondary"
          >
            <polygon points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
        <!-- Footer -->
        <div class="container pt-4">
          <div class="row">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <!-- Theme's logo -->
              <router-link to="/">
                <img
                  alt="Image placeholder"
                  src="@/assets/img/qb.svg"
                  id="footer-logo"
                >
                题库海
              </router-link>
              <!-- Webpixels' mission -->
              <p class="mt-4 text-sm opacity-8 pr-lg-4">题库海是专属于大学生的优质内容互动平台。以精选资讯+校内资源服务+助力校园社交的模式，全面覆盖同学们的学习、工作、生活、娱乐。</p>
              <!-- Social -->

            </div>

            <hr class="divider divider-fade divider-dark my-4">
            <div class="row align-items-center justify-content-md-between pb-4">
              <div class="col-md-6">
                <div class="copyright text-sm font-weight-bold text-center text-md-left">
                  Copyright © 2021.题库海 All rights reserved.
                  <router-link to="/">
                    粤ICP备2023048614号
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import "@/assets/css/quick-website.css";
export default {
  name: "userIndex",
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less">
@keyframes hidePreloader {
  0% {
    width: 100%;
    height: 100%;
  }

  100% {
    width: 0;
    height: 0;
  }
}

body > div.preloader {
  position: fixed;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 1071;
  opacity: 0;
  transition: opacity 0.5s ease;
  overflow: hidden;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

body:not(.loaded) > div.preloader {
  opacity: 1;
}

body:not(.loaded) {
  overflow: hidden;
}

body.loaded > div.preloader {
  animation: hidePreloader 0.5s linear 0.5s forwards;
}
// .banner{
//   background-color: #434ee4;
//   position: relative;
//   width: 100%;
//   height: 500px;
//   .banner-bg{
//     position: absolute;
//     height: 100%;
//     width: 100%;
//     img{
//       position: absolute;
//       height: 100%;
//     }
//     .backgroundImage{
//       left: 0;
//     }
//     .banner-right{
//       height: 352px;
//       right: 0;
//       margin-right: -100px;
//       bottom: 0;
//     }
//     .banner-left{
//       height: 352px;
//       margin-left: -100px;
//       left: 0;
//       bottom: 0;
//     }
//   }
//   .banner-text{
//     padding-top: 100px;
//     z-index: 1;
//     h1{
//       font-size: 56px;
//       font-weight: 500;
//       color: white;
//     }
//   }
// }
</style>