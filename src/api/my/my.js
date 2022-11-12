import request from "@/utils/request";
import qs from "qs";

// 获取我关注的歌手
export const getMySingerApi = (params) => {
  return request({
    url: "/artist/sublist?" + qs.stringify(params),
    method: "get",
  });
};

// 获取我关注的电台
export const getMyRadioApi = (params) => {
  return request({
    url: "/dj/sublist?" + qs.stringify(params),
    method: "get",
  });
};

// 获取我的歌单
export const getMyCreateListApi = (params) => {
  return request({
    url: "/user/playlist?" + qs.stringify(params),
    method: "get",
  });
};

// 获取对应歌单的所有歌曲
export const getListAllApi = (params) => {
  return request({
    url: "/playlist/detail?" + qs.stringify(params),
    method: "get",
  });
};
