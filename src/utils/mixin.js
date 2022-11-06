import Vue from "vue";

Vue.mixin({
  methods: {
    jump(path) {
      if (path === this.$route.path) return;
      return this.$router.push(path);
    },
  },
});
