import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/musicLayout.vue";

import FindDiscover from "../views/find/findDis/findDiscover.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "/find/discover",
        alias: "/",
        component: FindDiscover,
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
