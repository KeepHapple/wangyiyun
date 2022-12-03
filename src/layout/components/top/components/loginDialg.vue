<template>
  <div class="dialg">
    <div class="messbox_saoma" v-if="!saomaFlag">
      <div class="head">
        <span>登录</span>
        <span class="iconfont icon-close" @click="closeDialg"></span>
      </div>
      <div class="content">
        <div class="saoma">
          <img
            src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png"
            alt=""
            class="saoma_img"
          />
          <div class="qr">
            <div class="qr_title">扫码登录</div>
            <img :src="qrimgSrc" alt="" class="qr_img" />
            <div class="qr_user_mether">
              使用
              <a class="qr_jump" href="https://music.163.com/#/download"
                >网易云音乐APP</a
              >
              扫码登录
            </div>
          </div>
        </div>
        <div class="btn" @click="changeStuts">选择其他登录模式</div>
      </div>
    </div>

    <div class="messbox_other" v-if="saomaFlag">
      <div class="head">
        <span>登录</span>
        <span class="iconfont icon-close" @click="closeDialg"></span>
      </div>
      <div class="number">
        <div class="left">
          <!-- 判断是哪种登陆方式 -->

          <!-- 手机号码的登陆方式 -->
          <div v-if="nowType === 0" class="login_type">
            <input
              name=""
              id="phone"
              :placeholder="loginType[nowType].text"
              v-model="loginType[nowType].iptValue.num"
            />
            <input
              type="password"
              name=""
              id="phone"
              :placeholder="loginType[nowType].pwsText"
              v-model="loginType[nowType].iptValue.pws"
            />
            <div class="login_btn" @click="loginByNum">登录</div>
          </div>
          <!-- 手机号码的登陆方式 -->

          <!-- 注册 -->
          <div v-else-if="nowType === 1" class="login_type">
            <input name="" id="phone" :placeholder="loginType[nowType].text" />
            <input
              type="password"
              name=""
              id="phone"
              :placeholder="loginType[nowType].pwsText"
            />
            <input type="password" name="" id="phone" placeholder="确认密码" />
            <div class="login_btn">注册</div>
          </div>
          <!-- 注册 end -->

          <!-- 邮箱登录 -->
          <div v-else class="login_type">
            <input name="" id="phone" :placeholder="loginType[nowType].text" />
            <input
              type="password"
              name=""
              id="phone"
              :placeholder="loginType[nowType].pwsText"
            />
            <div class="login_btn">登录</div>
          </div>
          <!-- 邮箱登录 end -->

          <!-- 判断是哪种登陆方式 end -->
        </div>
        <div class="right">
          <div
            v-for="(item, index) in loginType"
            :key="index"
            @click="loginTypeChange(index)"
          >
            <span v-if="nowType !== index" class="change_type">{{
              item.title
            }}</span>
          </div>
        </div>
        <div class="to_saoma" @click="handleToSaoma">
          <img
            src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9656441793/9f07/c197/3af2/f07b8d6ef20964be159ce812841fc9d2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQcKeyApi, getQcApi, getQcStateApi } from "@/api/login";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      saomaFlag: false, //扫码登录的标记
      loginType: [
        //登录方式的数组
        {
          title: "手机登录",
          value: "0",
          text: "请输入手机号码",
          pwsText: "请输入密码",
          iptValue: {
            num: "",
            pws: "",
          },
        },
        {
          title: "注册",
          value: "1",
          text: "请输入手机号码",
          pwsText: "请输入密码",
        },
        {
          title: "邮箱登录",
          value: "2",
          text: "请输入邮箱地址",
          pwsText: "请输入密码",
        },
        { title: "游客登录", value: "3" },
      ],
      nowType: 0, //当前登录的方式

      qrimgSrc: "", //二维码的图片链接

      t: {}, //查询二维码状态的定时器
    };
  },
  async created() {
    this.startSaoma();
  },
  methods: {
    //切换登陆方式
    loginTypeChange(i) {
      this.nowType = i;
    },
    //关闭登录弹窗
    closeDialg() {
      clearInterval(this.t);
      this.$emit("closeDialg");
    },
    //关闭扫码登录，切换到密码登录
    changeStuts() {
      this.saomaFlag = true;
      clearInterval(this.t);
    },
    //关闭密码登录，切换到扫码登录
    handleToSaoma() {
      this.saomaFlag = false;
      this.startSaoma();
    },
    //扫码登录，获取二维码以及其一系列动作
    async startSaoma() {
      if (!this.t) clearInterval(this.t);
      let key = "";
      let qrimgSrc = "";

      key = await getQcKeyApi();
      qrimgSrc = await getQcApi({ key: key.data.unikey, qrimg: " " });
      this.qrimgSrc = qrimgSrc.data.qrimg;

      this.t = setInterval(async () => {
        let res = await getQcStateApi({ key: key.data.unikey });
        console.log(res);
        if (res.code === 803) {
          localStorage.setItem("cookies", res.cookie);
          this.closeDialg();
          clearInterval(this.t);
        }
      }, 1000);
    },
    //通过手机号密码登录
    async loginByNum() {
      let phone = this.loginType[0].iptValue.num;
      let password = this.loginType[0].iptValue.pws;
      let res = await this.loginByPhone({
        phone,
        password,
      });
      if (res.code === 200) {
        this.loginType[0].iptValue.num = "";
        this.loginType[0].iptValue.pws = "";
        this.$emit("closeDialg");
      }
      this.$emit("loginBtn");
    },
    ...mapActions({
      loginByPhone: "login/LOGIN_PHONE",
    }),
  },
};
</script>

<style lang="scss" scoped>
.dialg {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  .messbox_saoma {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 530px;
    height: 366px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .head {
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2d2d2d;
      span {
        color: #fff;
        font-weight: 700;
      }
    }
    .content {
      flex: 1;
      padding: 35px 0;
      box-sizing: border-box;
      .saoma {
        width: 100%;
        height: 220px;
        display: flex;
        justify-content: center;
        .saoma_img {
          height: 100%;
        }
        .qr {
          margin: 0 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .qr_title {
            font-size: 18px;
          }
          .qr_img {
            width: 150px;
            height: 150px;
            margin: 15px 0;
          }
          .qr_user_mether {
            font-size: 12px;
            .qr_jump {
              margin: 0 5px;
              text-decoration: none;
              color: #0c73c2;
            }
          }
        }
      }
      .btn {
        margin: 20px auto;
        margin-bottom: 0;
        display: block;
        font-size: 12px;
        border-radius: 20px;
        border: 1px solid #888888;
        width: 118px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        cursor: pointer;
      }
    }
  }

  .messbox_other {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 530px;
    height: 366px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .head {
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2d2d2d;
      span {
        color: #fff;
        font-weight: 700;
      }
    }
    .number {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .left {
        display: flex;
        flex-direction: column;
        padding: 0 35px 3px 40px;
        box-sizing: border-box;
        border-right: 1px dashed #dddddd;
        width: 310px;
        .login_type {
          display: flex;
          align-items: center;
          flex-direction: column;
          input {
            height: 34px;
            width: 170px;
            border-radius: 5px;
            padding: 0 10px;
            margin-bottom: 10px;
            border: 1px solid #dddddd;
            &:focus {
              outline: none;
            }
            &::placeholder {
              font-size: 12px;
              color: #b8b8b8;
            }
          }
          .login_btn {
            background-color: #ff3a3a;
            width: 170px;
            border-radius: 5px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            margin-top: 20px;
          }
        }
      }
      .right {
        padding: 3px 0 3px 39px;
        box-sizing: border-box;
        .change_type {
          display: block;
          width: 80px;
          height: 25px;
          margin-bottom: 10px;
          line-height: 25px;
          text-align: center;
          border: 1px solid #d6d6d6;
          color: #797979;
          border-radius: 20px;
          font-size: 12px;
        }
      }
      .to_saoma {
        position: absolute;
        bottom: 0px;
        right: 0px;
        img {
          width: 52px;
          height: 52px;
        }
      }
    }
  }
}
</style>
