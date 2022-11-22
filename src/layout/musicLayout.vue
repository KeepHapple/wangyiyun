<template>
  <div class="layout">
    <div class="top">
      <LayoutTop></LayoutTop>
    </div>
    <div class="content">
      <router-view />
      <div style="height: 70px"></div>
    </div>
    <div class="bar">
      <BottomBar></BottomBar>
    </div>
  </div>
</template>

<script>
import LayoutTop from "./components/top/layoutTop.vue";
import BottomBar from "@/components/bottomBar.vue";
export default {
  components: {
    LayoutTop,
    BottomBar,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}
.content {
  height: 100%;
}
.bar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 70px;
}
</style>
