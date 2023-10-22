import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
/* Layout */
import Layout from "@/layout/index.vue";

/* Router modules */
import componentsRouter from "./modules/components";
import chartsRouter from "./modules/charts";
import tableRouter from "./modules/table-mgt";
Vue.use(VueRouter);

/*
 注意：子菜单仅在childs.length>=1时出现
 详细信息请参见: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'            当使用＜keep-alive＞时，name字段是必需的，它还应该与组件的name属性相匹配详细信息请参见: https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                     如果设置为“noredirect”，则单击面包屑时不会触发重定向操作
  meta: {
    roles: ['admin', 'editor']   将控制页面角色（允许设置多个角色）
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             侧边栏中显示的图标
    hidden: true                 如果为true，则该路由不会显示在侧边栏中（默认值为false）
    alwaysShow: true             如果为true，将始终显示根菜单（默认值为false）
                                 如果为false，则在具有少于或等于一个子路由时隐藏根菜单
    breadcrumb: false            如果为false，则该项将隐藏在breadcrumb中（默认值为true）
    noCache: true                如果为true，则不会缓存页面（默认值为false）
    affix: true                  如果为true，则标签将粘贴在标签视图中
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示您设置的路径
  }
*/

/**
  常量路由
  没有权限要求的基本页
  可以访问所有角色
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import(/* webpackChunkName: "redirect" */ "@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/auth-redirect",
    component: () =>
      import(/* webpackChunkName: "auth-redirect" */ "@/views/login/auth-redirect.vue"),
    meta: { hidden: true },
  },
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/error-page/404.vue"),
    meta: { hidden: true },
  },
  {
    path: "/401",
    component: () => import(/* webpackChunkName: "401" */ "@/views/error-page/401.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          affix: true,
        },
      },
    ],
  },
  // {
  //   path: "/table",
  //   component: Layout,
  //   redirect: "/table/list",
  //   meta: { title: "table", icon: "table", affix: true, noCache: true },
  //   children: [
  //     {
  //       path: "list",
  //       component: () => import(/* webpackChunkName: "table" */ "@/views/table/index.vue"),
  //       name: "Table",
  //       meta: { title: "table", icon: "table", affix: true, noCache: true },
  //     },
  //   ],
  // },
  tableRouter,
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    meta: { hidden: true },
    children: [
      {
        path: "index",
        component: () => import(/* webpackChunkName: "profile" */ "@/views/profile/index.vue"),
        name: "Profile",
        meta: {
          title: "profile个人中心",
          icon: "user",
          noCache: true,
        },
      },
    ],
  },
];

/**
 *异步路由
 *需要根据用户角色动态加载的路由
 */
export const asyncRoutes: RouteConfig[] = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/directive",
    meta: {
      title: "permission[权限文档页面]",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true, // will always show the root menu
    },
    children: [
      {
        path: "page",
        component: () =>
          import(/* webpackChunkName: "permission-page" */ "@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "pagePermission",
          roles: ["admin"], // or you can only set roles in sub nav
        },
      },
      {
        path: "directive",
        component: () =>
          import(/* webpackChunkName: "permission-directive" */ "@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "directivePermission",
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: "role",
        component: () =>
          import(/* webpackChunkName: "permission-role" */ "@/views/permission/role.vue"),
        name: "RolePermission",
        meta: {
          title: "rolePermission",
          roles: ["admin"],
        },
      },
    ],
  },
  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import(/* webpackChunkName: "icons" */ "@/views/icons/index.vue"),
        name: "Icons",
        meta: {
          title: "icons图标库",
          icon: "icon",
          noCache: true,
        },
      },
    ],
  },
  // /** when your routing map is too long, you can split it into small modules **/
  componentsRouter, // 组件
  chartsRouter, // 图表
  // {
  //   path: "/example",
  //   component: Layout,
  //   redirect: "/example/list",
  //   meta: {
  //     title: "example",
  //     icon: "example"
  //   },
  //   children: [
  //     {
  //       path: "create",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "example-create" */ "@/views/example/create.vue"
  //         ),
  //       name: "CreateArticle",
  //       meta: {
  //         title: "createArticle",
  //         icon: "edit"
  //       }
  //     },
  //     {
  //       path: "edit/:id(\\d+)",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "example-edit" */ "@/views/example/edit.vue"
  //         ),
  //       name: "EditArticle",
  //       meta: {
  //         title: "editArticle",
  //         noCache: true,
  //         activeMenu: "/example/list",
  //         hidden: true
  //       }
  //     },
  //     {
  //       path: "list",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "example-list" */ "@/views/example/list.vue"
  //         ),
  //       name: "ArticleList",
  //       meta: {
  //         title: "articleList",
  //         icon: "list"
  //       }
  //     }
  //   ]
  // },
  {
    path: "/error",
    component: Layout,
    redirect: "noredirect",
    meta: {
      title: "errorPages",
      icon: "404",
    },
    children: [
      {
        path: "401",
        component: () =>
          import(/* webpackChunkName: "error-page-401" */ "@/views/error-page/401.vue"),
        name: "Page401",
        meta: {
          title: "page401",
          noCache: true,
        },
      },
      {
        path: "404",
        component: () =>
          import(/* webpackChunkName: "error-page-404" */ "@/views/error-page/404.vue"),
        name: "Page404",
        meta: {
          title: "page404",
          noCache: true,
        },
      },
    ],
  },
  // {
  //   path: "/error-log",
  //   component: Layout,
  //   redirect: "noredirect",
  //   children: [
  //     {
  //       path: "log",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "error-log" */ "@/views/error-log/index.vue"
  //         ),
  //       name: "ErrorLog",
  //       meta: {
  //         title: "errorLog",
  //         icon: "bug"
  //       }
  //     }
  //   ]
  // },
  {
    path: "/i18n",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import(/* webpackChunkName: "i18n-demo" */ "@/views/i18n-demo/index.vue"),
        name: "I18n",
        meta: {
          title: "i18n",
          icon: "international",
        },
      },
    ],
  },
  // {
  //   path: "https://github.com/Armour/vue-typescript-admin-template",
  //   meta: {
  //     title: "externalLink",
  //     icon: "link"
  //   }
  // },
  {
    path: "*",
    redirect: "/404",
    meta: { hidden: true },
  },
];

const createRouter = () =>
  new VueRouter({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
