import request from "@/utils/request";
import qs from "qs";

// 获取所有的榜单信息
export const getRankingListApi = async (params) => {
  return request({
    url: "/toplist?" + qs.stringify(params),
    methods: "get",
  });
};

// 通过id获取榜单的详细信息 以及 所有的歌曲
export const getRankingSongListApi = async (params) => {
  return request({
    url: "/playlist/detail?" + qs.stringify(params),
    methods: "get",
  });
};
