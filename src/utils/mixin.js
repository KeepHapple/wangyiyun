import Vue from "vue";

Vue.mixin({
  methods: {
    jump(path) {
      if (path === this.$route.path) return;
      return this.$router.push(path);
    },
    formDate(time) {
      let str = "";
      str += new Date(time).getFullYear() + "/";
      str +=
        new Date(time).getMonth() + 1 < 10
          ? "0" + (new Date(time).getMonth() + 1) + "/"
          : new Date(time).getMonth() + 1 + "/";
      str +=
        new Date(time).getDate() < 10
          ? "0" + new Date(time).getDate() + " "
          : new Date(time).getDate() + " ";
      str +=
        new Date(time).getHours() < 10
          ? "0" + new Date(time).getHours() + ":"
          : new Date(time).getHours() + ":";
      str +=
        new Date(time).getMinutes() < 10
          ? "0" + new Date(time).getMinutes() + ":"
          : new Date(time).getMinutes() + ":";
      str +=
        new Date(time).getSeconds() < 10
          ? "0" + new Date(time).getSeconds()
          : new Date(time).getSeconds();
      return str;
    },
  },
});
