<template>
  <div class="top">
    <!-- 第一个tabs -->
    <div class="firTabs">
      <div class="logo" @click="jumpIndex()"></div>

      <div class="tab">
        <ul class="tab_father">
          <li
            :class="{ tab_item: true, active: index === actvieIndex }"
            v-for="(item, index) in tabs"
            :key="index"
            @click="changeBackColor(index)"
          >
            <em class="tab_title" @click="jump(item.url)">{{ item.title }}</em>
          </li>
        </ul>
      </div>

      <div class="seach">
        <span class="iconfont icon-seach icon"></span>
        <input
          type="text"
          class="seach_ipt"
          placeholder="音乐/视频/电台/用户"
        />
      </div>
      <div v-if="userInfo.nickname" class="login">
        <img
          :src="userInfo.avatarUrl"
          alt=""
          style="width: 32px; height: 32px; border-radius: 50%"
        />
      </div>
      <div class="login" @click="login" v-else>登录</div>

      <LoginDialg v-if="loginDialgFlag" @closeDialg="closeDialg"></LoginDialg>
    </div>
    <!-- 第一个tabs end -->
    <!-- 第二个tabs -->
    <div class="socTabs">
      <ChildTop
        :childIndex="childIndex"
        :childTabs="tabs[actvieIndex].chliden.tabs"
      ></ChildTop>
    </div>
    <!-- 第二个tabs end -->
  </div>
</template>

<script>
import ChildTop from "./components/childTop.vue";
import LoginDialg from "./components/loginDialg.vue";
export default {
  components: {
    ChildTop,
    LoginDialg,
  },
  created() {
    this.cookies = localStorage.getItem("cookies");
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo);
  },
  data() {
    return {
      userInfo: {},
      cookies: "",
      tabs: [
        {
          title: "发现音乐",
          url: "/find",
          chliden: {
            tabs: [
              { title: "推荐", url: "/find/discover" },
              { title: "排行榜", url: "/find/toplist" },
              { title: "歌单", url: "/find/playlist" },
              { title: "主播电台", url: "/find/djradio" },
              { title: "歌手", url: "/find/artist" },
              { title: "新碟上架", url: "/find/album" },
            ],
          },
        },
        { title: "我的音乐", url: "/my", chliden: { tabs: [] } },
        { title: "关注", url: "/care", chliden: { tabs: [] } },
        { title: "商城", url: "/shop", chliden: { tabs: [] } },
        { title: "音乐人", url: "/music", chliden: { tabs: [] } },
        { title: "下载客户端", url: "/download", chliden: { tabs: [] } },
      ],
      actvieIndex: 0,
      childIndex: 0,
      loginDialgFlag: false,
    };
  },
  methods: {
    changeBackColor(i) {
      this.actvieIndex = i;
      this.childIndex = i;
    },
    jumpIndex() {
      this.jump("/");
      this.actvieIndex = 0;
      this.childIndex = 0;
    },
    login() {
      this.loginDialgFlag = true;
    },
    closeDialg() {
      this.loginDialgFlag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  .firTabs {
    display: flex;
    background-color: #242424;
    justify-content: center;
    align-items: center;
    .logo {
      width: 157px;
      height: 69px;
      margin-right: 20px;
      background-image: url("https://s2.music.126.net/style/web2/img/frame/topbar.png?bf8e11af3180da8a9b9f13ae878219a3");
    }
    .tab {
      .tab_father {
        .tab_item {
          width: 94px;
          height: 70px;
          float: left;
          display: flex;
          justify-content: center;
          align-items: center;
          .tab_title {
            font-style: normal;
            color: #fff;
            font-size: 14px;
            display: inline-block;
            height: 100%;
            line-height: 70px;
            cursor: default;
          }
        }
        .tab_item:hover {
          background-color: #000;
        }
        .active {
          background-color: #000;
        }
      }
    }

    .seach {
      margin-left: 70px;
      position: relative;
      .seach_ipt {
        width: 158px;
        height: 32px;
        border-radius: 20px;
        border: 0;
        padding-left: 30px;
        box-sizing: border-box;
        &:focus {
          outline: none;
        }
        &::placeholder {
          font-size: 12px;
          color: #b8b8b8;
        }
      }
      .icon {
        position: absolute;
        top: 50%;
        left: 8px;
        transform: translateY(-55%);
        color: #666666;
      }
    }
    .login {
      margin-left: 30px;
      color: #fff;
      font-size: 14px;
      cursor: default;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
