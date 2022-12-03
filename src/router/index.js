import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/musicLayout.vue";

import FindDiscover from "../views/find/findDis/findDiscover.vue";
import FindTopList from "@/views/find/topList/topList.vue";

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
        component: FindDiscover,
      },
      {
        path: "/find/discover",
        alias: "/",
        component: FindDiscover,
      },
      {
        path: "/find/toplist",
        component: FindTopList,
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
