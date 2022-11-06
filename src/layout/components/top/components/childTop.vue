<template>
  <div class="childTop">
    <div
      class="tabs"
      :style="{ height: childTabs.length === 0 ? '5px' : '35px' }"
    >
      <ul class="list">
        <li
          :class="{ list_item: true }"
          v-for="(item, index) in childTabs"
          :key="index"
        >
          <em
            @click="changFindClass(index, item.url)"
            :class="{ jump: true, jump_active: index === activeIndex }"
          >
            {{ item.title }}
          </em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    childIndex: {
      type: Number,
      required: true,
    },
    childTabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: this.childIndex,
    };
  },
  methods: {
    changFindClass(i, url) {
      this.activeIndex = i;
      this.jump(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.childTop {
  .tabs {
    width: 100%;
    height: 35px;
    background-color: #c20c0c;
    display: flex;
    justify-content: center;
    align-content: center;
    position: relative;
    .list {
      .list_item {
        list-style: none;
        float: left;
        width: 84px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 13px;
        box-sizing: border-box;
        .jump {
          display: inline-block;
          font-style: normal;
          font-size: 12px;
          color: #fff;
          height: 20px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          cursor: default;
          // line-height: 21px;
        }
        :hover {
          background-color: #9b0909;
        }
        .jump_active {
          background-color: #9b0909;
        }
      }
    }
    .triangle {
      position: absolute;
      border-top: 5px solid transparent;
      border-bottom: 5px solid #9b0909;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      top: -10px;
      left: 618px;
    }
  }
}
</style>
