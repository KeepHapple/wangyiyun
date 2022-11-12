import request from "@/utils/request";
import qs from "qs";

// 获取推荐的轮播图
export const getSwiperUrlApi = (params) => {
  return request({
    url: "/banner?" + qs.stringify(params),
    method: "get",
  });
};
