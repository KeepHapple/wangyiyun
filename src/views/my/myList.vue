<template>
  <div class="my">
    <div class="left">
      <ul class="my_tab">
        <li @click="clickType = 0">
          <div>我的歌手（{{ mySingerList.length }}）</div>
        </li>
        <li @click="clickType = 1">
          <div>我的电台（{{ myRedioList.length }}）</div>
        </li>

        <li class="my_create">
          <div class="title" @click="myListView">
            <span class="test">
              <span class="iconfont icon-anniu_jiantouzhankai"></span>
            </span>
            <span style="margin-left: 5px">创建的歌单</span>
          </div>
          <div class="content" v-if="myLiHeightFlag">
            <ul class="content_ul">
              <li
                v-for="(item, i) in myListenList"
                :key="i"
                class="content_li"
                @click="jumpList(item.id, i)"
              >
                <img :src="item.coverImgUrl" alt="" />
                <div class="text">
                  <span>{{ i === 0 ? "我喜欢的音乐" : item.name }}</span>
                  <span>{{ item.trackCount }}首</span>
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li @click="clickType = 3"><div>收藏的歌单</div></li>
      </ul>
    </div>
    <div class="right">
      <!-- 我的歌手 -->
      <div v-if="clickType === 0" class="my_singer">
        <div class="title">我的歌手（{{ mySingerList.length }}）</div>
        <ul>
          <li v-for="(item, i) in mySingerList" :key="i" class="singer">
            <img :src="item.img1v1Url" alt="" class="aver" />
            <div class="text">
              <span>{{ item.name }}</span>
              <div class="text_spli">
                <span>{{ item.albumSize }}个专辑</span>
                <span>{{ item.mvSize }}个mv</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 我的歌手 end -->

      <!-- 我的电台 -->
      <div v-if="clickType === 1" class="my_redio">
        <div class="title">我订阅的电台（{{ myRedioList.length }}）</div>
        <ul>
          <li v-for="(item, i) in myRedioList" :key="i" class="redio">
            <div class="redio_left">
              <img :src="item.picUrl" alt="" srcset="" class="aver" />
              <div class="redio_text">
                <span>{{ item.name }}</span>
                <span class="spli">{{ "by     " + item.dj.nickname }}</span>
              </div>
            </div>
            <span class="redio_time">{{ item.programCount }}期</span>
          </li>
        </ul>
      </div>
      <!-- 我的电台 end -->

      <!-- 我创建的歌单 -->
      <div v-if="clickType === 2 && songsList.length !== 0" class="my_list">
        <div class="my_list_title">
          <div class="title_avg">
            <img :src="myListenList[nowMyCreateIndex].coverImgUrl" alt="" />
          </div>
          <div class="title_info">
            <div class="name">
              {{ myListenList[nowMyCreateIndex].name }}
            </div>
            <div class="infomation">
              <img
                :src="myListenList[nowMyCreateIndex].creator.avatarUrl"
                alt=""
              />
              <span class="creater_name">
                {{ myListenList[nowMyCreateIndex].creator.nickname }}
              </span>
              <span class="create_time"
                >{{
                  formDate(myListenList[nowMyCreateIndex].createTime)
                }}
                创建</span
              >
            </div>
          </div>
        </div>

        <div class="list_header">
          <div class="header_title">
            <span class="header_title_name">歌曲列表</span>
            <span class="header_title_num">{{
              songsList.length + "首歌"
            }}</span>
          </div>
          <span class="header_play"
            >播放：<span style="color: #c20c0c; font-weight: 700">{{
              myListenList[nowMyCreateIndex].playCount
            }}</span
            >次</span
          >
        </div>
        <div class="table_title">
          <span style="width: 15%">序号</span>
          <span style="width: 40%">歌曲标题</span>
          <span style="width: 15%">时长</span>
          <span style="width: 15%">歌手</span>
          <span style="width: 15%">专辑</span>
        </div>
        <ul>
          <li
            v-for="(item, i) in songsList"
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
      </div>
      <!-- 我创建的歌单 end -->

      <!-- 我收藏的歌单 -->
      <!-- 我收藏的歌单 end -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  getMySingerApi,
  getMyRadioApi,
  getMyCreateListApi,
  getListAllApi,
} from "@/api/my/my";
export default {
  data() {
    return {
      mySingerList: [], // 我的歌手
      myRedioList: [], // 我的电台
      myListenList: [], // 我的歌单
      myCollectionList: [], // 收藏的歌单
      clickType: 0, // 当前点击的tab值
      myLiHeightFlag: false, // 我创建的歌单的展示标志
      songsList: [], // 点击对应歌单的所有歌曲
      songsInfo: {}, // 点击对应歌单的歌单信息
      nowMyCreateIndex: 0, // 当前点击的 歌单 的索引
    };
  },
  created() {
    this.getMySinger();
    this.getMyRadio();
    this.getMyCreateList();
  },
  computed: {},
  methods: {
    ...mapActions({
      actionSetPlayList: "bar/ACTION_PLAY",
    }),

    // 双击播放歌曲
    handlePlayMusic(id, i) {
      this.actionSetPlayList({
        playList: this.songsList,
        nowPlayId: id,
        index: i,
      });
    },

    // 获取我的歌手
    async getMySinger() {
      let res = await getMySingerApi({
        cookie: localStorage.getItem("cookie"),
      });
      if (res.code === 200) {
        this.mySingerList = res.data;
      }
    },

    //获取我的电台
    async getMyRadio() {
      let res = await getMyRadioApi({
        cookie: localStorage.getItem("cookie"),
      });
      if (res.code === 200) {
        this.myRedioList = res.djRadios;
      }
    },

    //获取我的歌单
    async getMyCreateList() {
      let userInfo = JSON.parse(localStorage.getItem("profile"));
      let res = await getMyCreateListApi({
        uid: userInfo.userId,
      });
      res.playlist.forEach((item) => {
        if (item.creator.nickname === userInfo.nickname)
          this.myListenList.push(item);
        else this.myCollectionList.push(item);
      });
    },

    // 展开创建歌单的列表
    myListView() {
      this.myLiHeightFlag = !this.myLiHeightFlag;
    },

    // 展示对应歌单的所有歌曲
    async jumpList(id, index) {
      this.nowMyCreateIndex = index;
      let res = await getListAllApi({
        id,
      });

      if (res.code === 200) {
        this.songsInfo = res.playlist;
        this.songsList = res.playlist.tracks;
      }
      this.clickType = 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.my {
  width: 980px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  .left {
    height: 100vh;
    width: 232px;
    overflow: scroll;
    background-color: #a10f28;
    &::-webkit-scrollbar {
      display: none;
    }
    .my_tab {
      padding: 20px;
      box-sizing: border-box;
      li {
        padding: 15px;
        box-sizing: border-box;
        color: #fff;
        font-size: 14px;
      }
      .my_create {
        .content {
          padding: 0;
          .content_ul {
            .content_li {
              padding: 10px 0;
              box-sizing: border-box;
              display: flex;
              img {
                width: 40px;
                height: 40px;
              }
              .text {
                display: flex;
                flex-direction: column;
                font-size: 12px;
                margin-left: 10px;
                span:last-child {
                  font-size: 10px;
                  color: #b6b6b6;
                  margin-top: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
  .right {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .my_singer,
    .my_redio {
      padding: 15px;
      box-sizing: border-box;
      .title {
        font-size: 25px;
        padding-bottom: 10px;
        box-sizing: border-box;
        border-bottom: 2px solid #c20c0c;
      }
      .singer {
        padding: 15px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #d8d8d8;
        display: flex;
        .aver {
          width: 80px;
          height: 80px;
        }
        .text {
          margin-left: 20px;
          .text_spli {
            font-size: 12px;
            color: #8b8b8b;
            margin-top: 20px;
            span:last-child {
              margin-left: 10px;
            }
          }
        }
      }
    }

    .my_redio {
      .redio {
        padding: 15px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #d8d8d8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .redio_left {
          display: flex;
          .aver {
            width: 80px;
            height: 80px;
          }
          .redio_text {
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .spli {
              margin-top: 20px;
              font-size: 12px;
              color: #8b8b8b;
            }
          }
        }
        .redio_time {
          font-size: 12px;
          color: #8b8b8b;
        }
      }
    }

    .my_list {
      .my_list_title {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        .title_avg {
          width: 208px;
          height: 208px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title_info {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          .name {
            font-size: 24px;
            font-weight: 700;
          }
          .infomation {
            margin-top: 20px;
            display: flex;
            // justify-content: center;
            align-items: center;
            img {
              width: 35px;
              height: 35px;
            }
            .creater_name {
              font-size: 12px;
              color: #0c73c2;
              margin-left: 10px;
            }
            .create_time {
              margin-left: 10px;
              font-size: 12px;
            }
          }
        }
      }
      .list_header {
        padding: 10px 20px;
        box-sizing: border-box;
        border-bottom: 2px solid #c20c0c;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .header_title {
          .header_title_name {
            font-size: 24px;
            font-weight: 700;
          }
          .header_title_num {
            font-size: 12px;
            color: #8b8b8b;
            margin-left: 20px;
          }
        }
        .header_play {
          font-size: 12px;
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
}
</style>
