import request from "@/utils/request";
import qs from "qs";

// 获取当前用户的收藏歌单
export const getUserCollectionApi = (params) => {
  return request({
    url: "/user/playlist?" + qs.stringify(params),
    method: "get",
  });
};

// 获取当前用户的个性化推荐歌单
export const getUserPersonalityApi = (params) => {
  return request({
    url: "/recommend/resource?" + qs.stringify(params),
    method: "get",
  });
};

// 获取热门推荐歌单
export const getHotListApi = (params) => {
  return request({
    url: "/top/playlist/highquality?" + qs.stringify(params),
    method: "get",
  });
};
