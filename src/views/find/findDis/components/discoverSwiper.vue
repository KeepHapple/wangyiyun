<template>
  <div class="swiper">
    <div class="left">
      <img :src="collectionUrl[nowUrlIndex]" alt="" />
    </div>
    <div class="right">
      <div class="download"></div>
      <span>PC 安卓 iPhone WP iPad Mac 六大客户端</span>
    </div>
    <div class="to_left" @click="toPerv()">
      <em class="iconfont icon-xiangzuojiantou perv"></em>
    </div>
    <div class="to_right" @click="toNext()">
      <em class="iconfont icon-xiangyoujiantou next"></em>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    setInterval(() => {
      this.nowUrlIndex++;
      if (!this.collectionUrl[this.nowUrlIndex]) this.nowUrlIndex = 0;
    }, 4000);
  },
  data() {
    return {
      collectionUrl: [
        "https://p1.music.126.net/PDkAxjUCGdHjsnJcjri1EQ==/109951167969231633.jpg?imageView&quality=89",
        "https://p1.music.126.net/v-5zM3S_yrvlYt3PtLdJCg==/109951167969172098.jpg?imageView&quality=89",
        "https://p1.music.126.net/RJbFDpt6JnFfu5MrNNla6g==/109951167969160589.jpg?imageView&quality=89",
        "https://p1.music.126.net/Ac0TKQ-jNL5wtN1aZzjTgg==/109951167969164179.jpg?imageView&quality=89",
        "https://p1.music.126.net/_hlENdztCMH_8v5Otpqnrg==/109951167969241138.jpg?imageView&quality=89",
        "https://p1.music.126.net/bNBbAI4KV_fZl-0VtF0Qrg==/109951167969533322.jpg?imageView&quality=89",
        "https://p1.music.126.net/MRiedZGGQ8tnG9BcPSX43Q==/109951167969253609.jpg?imageView&quality=89",
        "https://p1.music.126.net/EDjUuwUm_lHlwi0vOV-n4Q==/109951167969215423.jpg?imageView&quality=89",
      ],
      nowUrlIndex: 0,
    };
  },
  methods: {
    toPerv() {
      this.nowUrlIndex--;
      if (this.nowUrlIndex < 0)
        this.nowUrlIndex = this.collectionUrl.length - 1;
    },
    toNext() {
      this.nowUrlIndex++;
      if (this.nowUrlIndex >= this.collectionUrl.length) this.nowUrlIndex = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 980px;
  margin: 0 auto;
  display: flex;
  position: relative;
  .left {
    height: 284px;
    width: 730px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 284px;
    text-align: center;
    background-image: url("https://s2.music.126.net/style/web2/img/index/download.png?c0b82edc744fd585031c774c15782682");
    // background-color: pink;
    .download {
      width: 215px;
      height: 56px;
      margin: 186px 0 0 19px;
      //   flex: 1;
    }
    .download:hover {
      background-image: url("https://s2.music.126.net/style/web2/img/index/download.png?c0b82edc744fd585031c774c15782682");
      background-position: 0% 98%;
    }
    span {
      font-size: 12px;
      margin: 10px 0;
      color: #8d8d8d;
      cursor: default;
    }
  }
  .to_left {
    .perv {
      position: absolute;
      top: 120px;
      left: -80px;
      font-size: 50px;
    }
  }

  .to_right {
    .next {
      position: absolute;
      top: 120px;
      right: -80px;
      font-size: 50px;
    }
  }
}
</style>
