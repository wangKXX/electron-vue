<template>
  <div :class="['message', 'self']" v-if="isSelf">
    <div class="content">{{item.mesg.content}}</div>
    <div class="icon">
      <img :src="item.re.icon | urlPatten" />
    </div>
  </div>
  <div :class="['message']" v-else>
    <div class="icon">
      <img :src="item.re.icon | urlPatten" />
    </div>
    <div class="content">{{item.mesg.content}}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      default: {
        re: {}
      }
    }
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    isSelf() {
      return (this.item.re.id === this.userInfo.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.message {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  .icon {
    height: 38px;
    width: 38px;
    flex: none;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    max-width: 300px;
    word-wrap: break-word;
    background-color: rgb(176, 228, 110);
    padding: 8px;
    border-radius: 5px;
    position: relative;
    margin: 0 12px;
    height: fit-content;
  }
  .content:before {
    content: '';
    position: absolute;
    top: 8px;
    left: -16px;
    width: 0;
    height: 0;
    border-width: 8px;
    border-style: solid;
    border-color: transparent rgb(176, 228, 110) transparent transparent;
  }
}
.self {
  justify-content: flex-end;
  .content:before {
    content: '';
    position: absolute;
    top: 8px;
    left: 100%;
    width: 0;
    height: 0;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent transparent rgb(176, 228, 110);
  }
}
</style>
