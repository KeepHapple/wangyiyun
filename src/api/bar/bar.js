import request from "@/utils/request";
import qs from "qs";

export const getMusicSrcApi = (params) => {
  return request({
    url: "/song/url?" + qs.stringify(params),
    method: "get",
  });
};
