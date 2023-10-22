import { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

const componentsRouter: RouteConfig = {
  path: "/components",
  component: Layout,
  redirect: "noRedirect",
  name: "ComponentDemo",
  meta: {
    title: "components",
    icon: "component",
  },
  children: [
    {
      path: "tinymce",
      component: () =>
        import(/* webpackChunkName: "tinymce" */ "@/views/components-demo/tinymce.vue"),
      name: "TinymceDemo",
      meta: { title: "tinymce" },
    },
    {
      path: "count-to",
      component: () =>
        import(/* webpackChunkName: "count-to" */ "@/views/components-demo/count-to.vue"),
      name: "CountToDemo",
      meta: { title: "countTo" },
    },
  ],
};

export default componentsRouter;
