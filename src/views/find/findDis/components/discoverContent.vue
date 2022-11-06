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
            <li class="per_content_li">
              <div
                class="card"
                style="
                  background: url('https://p2.music.126.net/3I-73aQn3YCw-2cZdK1fQw==/109951166027478939.jpg?param=140y140');
                "
              >
                <div class="play">
                  <div class="num">
                    <span class="iconfont icon-tingge"></span>
                    <span>131.3亿</span>
                  </div>
                  <span class="iconfont icon-bofang icon"></span>
                </div>
              </div>
              <div class="text">
                <span class="text_title">私人雷达|根据听歌记录为你打造</span>
                <span class="text_content">猜你喜欢</span>
              </div>
            </li>
            <li class="per_content_li">
              <div
                class="card"
                style="
                  background: url('https://p2.music.126.net/FwPd8i3rPTBLjlecdNMTYQ==/109951164491685538.jpg?param=140y140');
                "
              >
                <div class="play">
                  <div class="num">
                    <span class="iconfont icon-tingge"></span>
                    <span>15.9万</span>
                  </div>
                  <span class="iconfont icon-bofang icon"></span>
                </div>
              </div>
              <div class="text">
                <span class="text_title">华语R&B华语乐坛新时代的中文r&b</span>
                <span class="text_content">最近在听</span>
              </div>
            </li>
            <li class="per_content_li">
              <div
                class="card"
                style="
                  background: url('https://p2.music.126.net/jQFHTr4j-31xmBTuob5fAA==/109951164022131588.jpg?param=140y140');
                "
              >
                <div class="play">
                  <div class="num">
                    <span class="iconfont icon-tingge"></span>
                    <span>142.2万</span>
                  </div>
                  <span class="iconfont icon-bofang icon"></span>
                </div>
              </div>
              <div class="text">
                <span class="text_title">欧美R&B：耳畔花火爱情的轻语</span>
                <span class="text_content">你可能感兴趣</span>
              </div>
            </li>
          </ul>
        </li>
        <!-- 个性化推荐 end -->

        <!-- 热门推荐 -->
        <!-- <li class="hot">
          <span>热门推荐</span>
        </li> -->
        <!-- 热门推荐 end -->
      </ul>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dayRecWeek: "",
      dayRec: "",
    };
  },
  created() {
    this.dayRecWeek = this.getWeek(new Date().getDay());
    this.dayRec = new Date().getDate();
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 980px;
  margin: 0 auto;
  .left {
    width: 730px;
    padding: 20px;
    box-sizing: border-box;
    // padding-right: 0;
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
}
</style>
