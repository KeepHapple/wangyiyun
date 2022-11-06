<template>
  <div class="discover">
    <div class="swiper">
      <Swiper></Swiper>
    </div>
    <div class="content">
      <Content></Content>
    </div>
  </div>
</template>

<script>
import Swiper from "./components/discoverSwiper.vue";
import Content from "./components/discoverContent.vue";
export default {
  components: {
    Swiper,
    Content,
  },
};
</script>

<style></style>
