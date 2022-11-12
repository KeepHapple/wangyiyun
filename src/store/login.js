import { loginByNumApi } from "@/api/login";

export default {
  namespaced: true,
  state: {
    cookie: localStorage.getItem("cookie") || "",
    profile: localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : "",
  },
  getters: {},
  mutations: {
    UPDATA_PHONELOGIN(state, payload) {
      state.cookie = payload.cookie;
      state.profile = payload.profile;

      localStorage.setItem("cookie", payload.cookie);
      localStorage.setItem("profile", JSON.stringify(payload.profile));
    },
  },
  actions: {
    //手机号码登录状态存储
    async LOGIN_PHONE(context, payload) {
      let res = await loginByNumApi(payload);
      let mutations_payload = {
        cookie: res.cookie,
        profile: res.profile,
      };
      if (res.code === 200) {
        context.commit("UPDATA_PHONELOGIN", mutations_payload);
      }
      return res;
    },
  },
};
