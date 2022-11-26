<template>
  <div class="content">
    <div class="left">
      <ul class="recommend">
        <!-- 个性化推荐 -->
        <li class="personality">
          <div class="per_title">
            <div class="circular">
              <div class="circular_inside"></div>
            </div>
            <span class="text">个性化推荐</span>
          </div>
          <ul class="per_content">
            <li class="per_content_li day">
              <div class="day_title">{{ dayRecWeek }}</div>
              <div class="day_content">{{ dayRec }}</div>
              <div class="text">
                <span class="text_title">每日歌曲推荐</span>
                <span class="text_content">根据你的口味生成,每天6:00更新</span>
              </div>
            </li>
            <li
              class="per_content_li"
              v-for="(item, index) in recommend"
              :key="index"
              @click="jumpSheet(item.id)"
            >
              <div
                class="card"
                :style="{ backgroundImage: `url(${item.picUrl})` }"
              >
                <div class="play">
                  <div class="num">
                    <span class="iconfont icon-tingge"></span>
                    <span>{{ item.playcount }}</span>
                  </div>
                  <span class="iconfont icon-bofang icon"></span>
                </div>
              </div>
              <div class="text">
                <span class="text_title">{{ item.name }}</span>
                <span class="text_content">猜你喜欢</span>
              </div>
            </li>
            <li class="per_content_li" v-if="recommend" style="font-size: 14px">
              登陆即可查看推荐哦
            </li>
          </ul>
        </li>
        <!-- 个性化推荐 end -->

        <!-- 热门推荐 -->
        <li class="personality" style="margin-top: 245px">
          <div class="per_title">
            <div class="circular">
              <div class="circular_inside"></div>
            </div>
            <span class="text">热门推荐</span>
          </div>
          <ul class="per_content">
            <li
              class="per_content_li"
              v-for="(item, index) in hotPlayList"
              :key="index"
              @click="jumpSheet(item.id)"
            >
              <div
                class="card"
                :style="{ backgroundImage: `url(${item.coverImgUrl})` }"
              >
                <div class="play">
                  <div class="num">
                    <span class="iconfont icon-tingge"></span>
                    <span>{{ item.playCount }}</span>
                  </div>
                  <span class="iconfont icon-bofang icon"></span>
                </div>
              </div>
              <div class="text">
                <span class="text_title">{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </li>
        <!-- 热门推荐 end -->
      </ul>
    </div>
    <div class="right">
      <div v-if="!userInfo" class="right_none">
        登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
      </div>
      <div v-else class="right_collection">
        <div
          v-for="(item, index) in playlist"
          :key="index"
          class="collection_list"
          @click="jumpSheet(item.id)"
        >
          <img :src="item.coverImgUrl" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserCollectionApi,
  getUserPersonalityApi,
  getHotListApi,
} from "@/api/find/discoverContent";
export default {
  data() {
    return {
      dayRecWeek: "", // 每日推荐显示的今天周几
      dayRec: "", // 每日推荐显示的今天几号
      userInfo: "", //当前登录者的信息
      playlist: [], // 当前登录者的收藏歌单
      recommend: [], // 为当前登录者推荐的热门歌单
      hotPlayList: [], // 热门歌单推荐列表
    };
  },
  async created() {
    this.dayRecWeek = this.getWeek(new Date().getDay());
    this.dayRec = new Date().getDate();
    this.userInfo = localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : "";

    this.getUserCollectionList();
    this.getUserPersonality();
    this.getHotList();
  },
  methods: {
    jumpSheet(id) {
      this.jump("songSheet", { id });
    },
    //获取每日推荐的当前周几
    getWeek(day) {
      let week = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      return week[day];
    },
    //获取当前用户的收藏歌单以及自建的歌单、
    async getUserCollectionList() {
      let res = await getUserCollectionApi({
        uid: this.userInfo.userId,
      });
      if (res.code === 200) {
        this.playlist = res.playlist;
      }
    },

    // 获取当前用户的个性化推荐歌单
    async getUserPersonality() {
      let res = await getUserPersonalityApi({
        cookie: localStorage.getItem("cookie"),
      });
      if (res.code === 200) {
        this.recommend = res.recommend.slice(0, 3);
      }
    },

    async getHotList() {
      let res = await getHotListApi();
      if (res.code === 200) {
        this.hotPlayList = res.playlists.slice(0, 8);
      }
      // console.log(this.hotPlayList);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 980px;
  margin: 0 auto;
  display: flex;
  .left {
    width: 730px;
    padding: 20px;
    box-sizing: border-box;
    .recommend {
      .circular {
        border-radius: 50%;
        background-color: #c10d0c;
        width: 15px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        .circular_inside {
          border-radius: 50%;
          background-color: #fff;
          width: 7px;
          height: 7px;
        }
      }
      .personality {
        position: relative;
        .per_title {
          display: flex;
          align-items: center;
          padding: 8px 10px;
          padding-right: 0px;
          box-sizing: border-box;
          border-bottom: 2px solid #c10d0c;
          .text {
            font-size: 20px;
          }
        }
        .per_content {
          margin: 20px 0 4px 0;
          position: absolute;
          left: -42px;
          top: 40px;
          .per_content_li {
            float: left;
            width: 182px;
            height: 217px;
            padding: 0 0 30px 42px;
            box-sizing: border-box;
            .card {
              width: 100%;
              height: 140px;
              position: relative;
              background-size: 140px 140px;

              .play {
                width: 100%;
                height: 27px;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                color: #ccc;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                box-sizing: border-box;
                .num {
                  font-size: 12px;
                  .iconfont {
                    margin-right: 5px;
                    font-size: 10px;
                  }
                }
              }
            }
            .text {
              flex: 1;
              display: flex;
              flex-direction: column;
              .text_title {
                margin: 8px 0 3px 0;
                font-size: 14px;
              }
              .text_content {
                margin-top: 3px;
                font-size: 12px;
                line-height: 1.4;
                color: #999;
              }
            }
          }
          .day {
            display: flex;
            flex-direction: column;
            .day_title {
              width: 100%;
              height: 33px;
              background: url("https://s2.music.126.net/style/web2/img/date.png?d1a1fe01764b4e328c6ff18ede2fd459")
                no-repeat;
              line-height: 33px;
              text-align: center;
              color: #fff;
              font-size: 14px;
            }
            .day_content {
              height: 107px;
              background: url("https://s2.music.126.net/style/web2/img/date.png?d1a1fe01764b4e328c6ff18ede2fd459")
                no-repeat 0 -151px;
              line-height: 107px;
              text-align: center;
              font-size: 80px;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
  .right {
    flex: 1;
    .right_none {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      background-color: #741313;
      color: #fff;
      font-size: 12px;
      line-height: 30px;
    }
    .right_collection {
      .collection_list {
        display: flex;
        margin: 15px 0px;
        align-items: center;
        background-color: #fff;
        padding: 15px;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: 4px 3px 10px 0px rgba($color: #000000, $alpha: 0.5);
        img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
        }
        span {
          flex: 1;
          font-size: 12px;
          margin-left: 10px;
          color: #000;
        }
      }
    }
  }
}
</style>
