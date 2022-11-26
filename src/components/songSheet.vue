<template>
  <div class="song_sheet">
    <div class="left">
      <!-- 左边头部 -->
      <div class="head">
        <div class="avg">
          <img :src="songInfo.coverImgUrl" alt="" srcset="" />
        </div>
        <div class="info">
          <span class="title">{{ songInfo.name }}</span>
          <div class="author">
            <img :src="songInfo.creator.avatarUrl" alt="" />
            <span class="name">{{ songInfo.creator.nickname }}</span>
          </div>
          <div class="tag">
            <span class="tag_title">标签：</span>
            <template v-if="songInfo.tags.length !== 0">
              <span v-for="item in songInfo.tags" :key="item" class="tag_all">
                {{ item }}
              </span>
            </template>
            <template v-else>
              <span style="font-size: 12px; color: #666">暂无标签</span>
            </template>
          </div>
          <div class="introduce">
            <span>介绍：</span>
            <template v-if="songInfo.description">
              <div v-for="item in songInfo.description.split('\n')" :key="item">
                {{ item }}
              </div>
            </template>
            <template v-else>
              <span>暂无简介</span>
            </template>
          </div>
        </div>
      </div>
      <!-- 左边头部 end -->

      <!-- 左边标题 -->
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
      <!-- 左边标题 end -->

      <!-- 左边歌曲列表 -->
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
      <!-- 左边歌曲列表 end -->
    </div>
    <div class="right">
      <div class="reader">
        <div class="reader_title">喜欢这个歌单的人</div>
        <div class="reader_avg" v-if="reader.length !== 0">
          <img
            :src="item.avatarUrl"
            v-for="(item, i) in reader"
            :key="i"
            alt=""
            srcset=""
          />
        </div>
        <div v-else>
          <span style="font-size: 12px; margin: 10px 0">暂无更多人喜欢</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongById } from "@/api/songSheet/songSheet.js";
import { mapActions } from "vuex";

export default {
  created() {
    this.id = this.$route.query.id;
    this.getSong();
  },
  data() {
    return {
      id: "", // 上个页面传过来的id值
      songList: [], // 当前歌单的所有歌曲
      songInfo: {}, // 当前歌单的简介信息
      reader: [], // 当前歌单所有的订阅者
    };
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
    // 获取当前歌单的简介信息以及 所有歌曲
    async getSong() {
      let res = await getSongById({
        id: this.id,
      });
      this.songInfo = res.playlist;
      this.songList = res.playlist.tracks;
      this.reader = res.playlist.subscribers;
    },
  },
};
</script>

<style lang="scss" scoped>
.song_sheet {
  width: 980px;
  margin: 0 auto;
  display: flex;
  .left {
    padding: 47px 30px 40px 39px;
    box-sizing: border-box;
    width: 710px;
    .head {
      display: flex;
      .avg {
        width: 208px;
        height: 208px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .title {
          font-size: 20px;
        }
        .author {
          display: flex;
          align-items: center;
          margin: 20px 0;
          img {
            width: 35px;
            height: 35px;
          }
          .name {
            margin-left: 10px;
            font-size: 12px;
            color: #0c73c2;
          }
        }
        .tag {
          margin: 10px 0;
          .tag_title {
            font-size: 12px;
            color: #666666;
          }
          .tag_all {
            display: inline-block;
            padding: 0 10px;
            box-sizing: border-box;
            height: 20px;
            line-height: 20px;
            border-radius: 12px;
            font-size: 12px;
            color: #666666;
            box-shadow: 0px 0px 2px 0px rgba($color: #000000, $alpha: 0.5);
            margin: 0 5px;
          }
        }
        .introduce {
          font-size: 12px;
          color: #666666;
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
  .right {
    flex: 1;
    padding: 20px 40px 40px 30px;
    box-sizing: border-box;
    border-left: 2px solid #f8f8f8;
    border-right: 2px solid #f8f8f8;
    .reader {
      .reader_title {
        padding: 5px 0;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #666;
      }
      .reader_avg {
        padding: 10px 0;
        img {
          height: 40px;
          width: 40px;
          margin: 0 9px 10px 0;
        }
      }
    }
  }
}
</style>
