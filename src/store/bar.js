import { getMusicSrcApi } from "@/api/bar/bar";
export default {
  namespaced: true,
  state: {
    playList: [], // 歌单的所有歌曲信息
    playListById: [], // 歌单的所有歌曲信息
    nowPlaySrc: "", // 当前播放歌曲的src
    nowPlayId: "", // 当前播放歌曲的id
    index: 0, // 当前歌曲在歌单中的索引
  },
  getters: {},
  mutations: {
    PLAY_LIST(state, payload) {
      state.playList = payload.playList;
      state.playListById = payload.playListById;
      state.nowPlaySrc = payload.nowPlaySrc;
      state.nowPlayId = payload.nowPlayId;
      state.index = payload.index;
    },
    PLAY_INDEX(state, payload) {
      state.index = payload.index;
      state.nowPlaySrc = payload.nowPlaySrc;
    },
  },
  actions: {
    async ACTION_PLAY(context, payload) {
      let playListById = [];
      payload.playList.forEach((item) => {
        playListById.push(item.id);
      });
      payload.playListById = playListById;
      let res = await getMusicSrcApi({
        id: payload.nowPlayId,
      });
      payload.nowPlaySrc = res.data[0].url;
      context.commit("PLAY_LIST", payload);
    },

    async ACTION_INDEX(context, payload) {
      let res = await getMusicSrcApi({
        id: payload.playListById[payload.index],
      });
      payload.nowPlaySrc = res.data[0].url;
      context.commit("PLAY_INDEX", payload);
    },
  },
};
