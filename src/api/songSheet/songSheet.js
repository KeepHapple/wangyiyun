import request from "@/utils/request";
import qs from "qs";

// 通过id获取歌单的详细信息 以及 所有的歌曲
export const getSongById = async (params) => {
  return request({
    url: "/playlist/detail?" + qs.stringify(params),
    methods: "get",
  });
};
