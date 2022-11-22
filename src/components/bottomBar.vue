<template>
  <div class="bar">
    <audio
      autoplay
      :src="nowPlaySrc"
      ref="play"
      @ended="playEnd"
      @timeupdate="playUpdataTime"
    ></audio>

    <div class="left">
      <!-- <div>{{ songInfo[index].al.picUrl }}</div> -->
      <div class="ave">
        <img
          :src="playList.length !== 0 ? playList[newIndex].al.picUrl : ''"
          alt=""
        />
      </div>
      <div class="text">
        <span class="song_name">{{
          playList.length !== 0 ? playList[newIndex].name : ""
        }}</span>
        <span class="songer_name">{{
          playList.length !== 0 ? playList[newIndex].ar[0].name : ""
        }}</span>
      </div>
    </div>

    <div class="center">
      <div class="bar_style">
        <span class="iconfont icon-shangyishou" @click="contrlBack"></span>
        <span
          :class="isPlay ? 'iconfont icon-pausecircle' : 'iconfont icon-bofang'"
          @click="contrlPlay"
        ></span>
        <span class="iconfont icon-xiayishou" @click="contrlNext"></span>
      </div>
      <div class="play_time">
        <span class="start_time">{{ songTimed }}</span>
        <div class="progress">
          <div
            :style="{ width: nowTimeProportion + 'px' }"
            class="progress_include"
          ></div>
        </div>
        <span class="end_time">{{ nowSongTime }}</span>
      </div>
    </div>

    <div class="right"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import vuex from "vuex";
export default {
  data() {
    return {
      isPlay: true, // 播放或者暂停flag
      playListById: [], // 当前 歌单 的 id列表
      nowSongTime: "00:00", // 当前播放歌曲的 总时长
      songTimed: "00:00", // 当前播放歌曲的 已播放时长
      nowTimeProportion: 0, // 当前歌曲播放的时长百分比
      index: this.$store.state.bar.index, // 当前播放歌曲的索引
    };
  },
  computed: {
    ...mapState({
      nowPlaySrc: (state) => state.bar.nowPlaySrc,
      playList: (state) => state.bar.playList,
      newIndex: (state) => state.bar.index,
    }),
  },
  methods: {
    ...mapActions({
      changNewPlayIndex: "bar/ACTION_INDEX",
    }),

    // 音乐播放时长改变时触发
    playUpdataTime() {
      let time = this.$refs.play.duration;
      let time1 = this.$refs.play.currentTime;
      this.nowTimeProportion = Math.floor((time1 / time) * 100);
      this.nowSongTime = this.formMusicTime(time);
      this.songTimed = this.formMusicTime(time1);
    },

    // 格式化歌曲时间
    formMusicTime(time) {
      let str = "";
      str =
        parseInt(time / 60) < 10
          ? "0" + parseInt(time / 60) + ":"
          : parseInt(time / 60);
      str +=
        parseInt(time % 60) < 10
          ? "0" + parseInt(time % 60)
          : parseInt(time % 60);
      return str;
    },

    // 控制音乐的播放与暂停
    contrlPlay() {
      this.isPlay ? this.$refs.play.pause() : this.$refs.play.play();
      this.isPlay = !this.isPlay;
    },

    // 控制下一首
    contrlNext() {
      this.getNowIndex();
      this.index += 1;
      this.changNewPlayIndex({
        index: this.index,
        playListById: this.playListById,
      });
    },

    // 控制上一首
    contrlBack() {
      this.getNowIndex();
      this.index -= 1;
      this.changNewPlayIndex({
        index: this.index,
        playListById: this.playListById,
      });
    },

    // 播放结束事件
    playEnd() {
      this.getNowIndex();
      this.index += 1;
      this.changNewPlayIndex({
        index: this.index,
        playListById: this.playListById,
      });
    },

    // 获取当前播放歌曲的索引
    getNowIndex() {
      this.index = this.$store.state.bar.index;
      this.playListById = this.$store.state.bar.playListById;
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 10px 0px rgba($color: #000000, $alpha: 0.5);
  background-color: #fff;
  display: flex;
  .left {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .ave {
      overflow: hidden;
      border-radius: 5px;
      width: 50px;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .song_name {
        font-size: 16px;
        font-weight: 700;
        color: #2d2d2d;
      }
      .songer_name {
        font-size: 12px;
        margin-top: 10px;
        color: #2d2d2d;
      }
    }
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .bar_style {
      padding: 10px 0;
      box-sizing: border-box;
      span {
        margin-left: 20px;
        font-size: 30px;
      }
    }
    .play_time {
      display: flex;
      justify-content: center;
      align-items: center;
      .progress {
        width: 400px;
        height: 5px;
        border-radius: 5px;
        background-color: #cecece;
        .progress_include {
          height: 5px;
          border-radius: 5px;
          background-color: #ff4e4e;
          transition: all linear 0.1;
        }
      }
      .start_time {
        font-size: 12px;
        margin-right: 10px;
      }
      .end_time {
        font-size: 12px;
        margin-left: 10px;
      }
    }
  }
  .right {
    width: 40%;
    height: 100%;
  }
}
</style>
