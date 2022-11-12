<template>
  <div class="layout">
    <div class="top">
      <LayoutTop></LayoutTop>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import LayoutTop from "./components/top/layoutTop.vue";
export default {
  components: {
    LayoutTop,
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
</style>
