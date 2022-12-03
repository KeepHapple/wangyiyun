<template>
  <div class="top">
    <div class="left">
      <div class="special">
        <span class="title"> 云音乐特色榜单 </span>
        <ul style="margin-top: 20px">
          <li
            v-for="(item, i) in cloudRankingList"
            :key="i"
            class="item"
            @click="handerTopList(item.id)"
          >
            <img class="cover" :src="item.coverImgUrl" alt="" />
            <div class="name">
              <span>{{ item.name }}</span>
              <span>{{ item.updateFrequency }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="special">
        <span class="title"> 全球媒体榜单 </span>
        <ul style="margin-top: 20px">
          <li
            v-for="(item, i) in allRankingList"
            :key="i"
            class="item"
            @click="handerTopList(item.id)"
          >
            <img class="cover" :src="item.coverImgUrl" alt="" />
            <div class="name">
              <span>{{ item.name }}</span>
              <span>{{ item.updateFrequency }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="right">
      <!-- 头部 -->
      <div class="head">
        <img :src="songInfo.coverImgUrl" alt="" class="cover" />
        <div class="head_text">
          <span class="name">{{ songInfo.name }}</span>
          <span class="time"
            >最近更新：{{
              formDate(songInfo.trackUpdateTime).split(" ")[0]
            }}</span
          >
        </div>
      </div>
      <!-- 头部 end -->

      <!-- 标题 -->
      <div class="list_title">
        <div>
          <span class="text">歌曲列表</span>
          <span class="song_count">{{ songInfo.trackCount }}首歌</span>
        </div>
        <span class="play_count"
          >播放：<span style="color: #c20c0c">{{ songInfo.playCount }}</span
          >次</span
        >
      </div>
      <!-- 标题 end -->

      <!-- 歌曲列表 -->
      <div class="table_title">
        <span style="width: 15%">序号</span>
        <span style="width: 40%">歌曲标题</span>
        <span style="width: 15%">时长</span>
        <span style="width: 15%">歌手</span>
        <span style="width: 15%">专辑</span>
      </div>
      <ul>
        <li
          v-for="(item, i) in songList"
          :key="i"
          class="song"
          @dblclick="handlePlayMusic(item.id, i)"
        >
          <div class="song_num" style="width: 15%">{{ i + 1 }}</div>
          <div class="song_title" style="width: 40%">{{ item.name }}</div>
          <div class="song_time" style="width: 15%" ref="songTime">
            {{
              formDate(item.dt).split(" ")[1].split(":")[1] +
              ":" +
              formDate(item.dt).split(" ")[1].split(":")[2]
            }}
          </div>
          <div class="song_songer" style="width: 15%">
            {{ item.ar[0].name }}
          </div>
          <div class="song_album" style="width: 15%">{{ item.al.name }}</div>
        </li>
      </ul>
      <!-- 歌曲列表 end -->
    </div>
  </div>
</template>

<script>
import {
  getRankingListApi,
  getRankingSongListApi,
} from "@/api/topList/topList.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      cloudRankingList: [], // 云音乐特色榜单
      allRankingList: [], // 全球媒体榜单
      songList: [], // 当前点击的榜单的所有歌曲
      songInfo: {}, // 当前点击的榜单的所有歌曲
    };
  },
  async mounted() {
    await this.getRankingList();
    this.getRankingSongList({ id: this.cloudRankingList[0].id });
  },
  methods: {
    ...mapActions({
      actionSetPlayList: "bar/ACTION_PLAY",
    }),
    // 双击播放歌曲
    handlePlayMusic(id, i) {
      this.actionSetPlayList({
        playList: this.songList,
        nowPlayId: id,
        index: i,
      });
    },
    handerTopList(id) {
      this.getRankingSongList({ id });
    },
    async getRankingList() {
      let res = await getRankingListApi();
      this.rankingList = res.list;
      this.cloudRankingList = res.list.slice(0, 4);
      this.allRankingList = res.list.slice(4);
    },

    async getRankingSongList(parmas) {
      let res = await getRankingSongListApi(parmas);
      this.songInfo = res.playlist;
      this.songList = res.playlist.tracks;
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 980px;
  margin: 0 auto;
  display: flex;
  .left {
    width: 240px;
    .special {
      width: 100%;
      margin-top: 40px;
      .title {
        font-size: 16px;
        font-weight: 700;
        padding: 0 10px 12px 15px;
        box-sizing: border-box;
      }
      .item {
        padding: 10px 0 10px 20px;
        box-sizing: border-box;
        display: flex;
        .cover {
          width: 40px;
          height: 40px;
        }
        .name {
          font-size: 12px;
          color: #666;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 10px;
          overflow: hidden;
        }
      }
    }
  }
  .right {
    flex: 1;
    padding: 40px;
    box-sizing: border-box;
    .head {
      display: flex;
      .cover {
        width: 150px;
        height: 150px;
      }
      .head_text {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        .name {
          font-size: 18px;
          font-weight: 700;
          margin: 20px 0;
        }
        .time {
          font-size: 12px;
          color: #666;
        }
      }
    }
    .list_title {
      border-bottom: 2px #c20c0c solid;
      font-size: 12px;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 30px;
      padding: 5px 0;
      box-sizing: border-box;
      .text {
        font-size: 20px;
      }
      .song_count {
        margin-left: 20px;
      }
    }

    .table_title {
      width: 100%;
      span {
        display: inline-block;
        padding: 10px 5px;
        box-sizing: border-box;
        font-size: 12px;
      }
    }
    .song {
      display: flex;
      width: 100%;
      div {
        padding: 10px 5px;
        box-sizing: border-box;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
