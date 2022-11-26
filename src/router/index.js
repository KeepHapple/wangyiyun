import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/musicLayout.vue";

import FindDiscover from "../views/find/findDis/findDiscover.vue";

import MyList from "@/views/my/myList.vue";

// 全局的歌单组件
import SongSheet from "@/components/songSheet.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "/find",
        alias: "/",
        component: FindDiscover,
        children: [
          {
            path: "/find/discover",
            alias: "/find",
            component: FindDiscover,
          },
        ],
      },
      {
        path: "/my",
        component: MyList,
      },
      {
        path: "/songsheet",
        name: "songSheet",
        component: SongSheet,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
