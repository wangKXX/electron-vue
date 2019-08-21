<template>
  <div class="friend" @click="handlerClick(item)" :class="isActive ? 'active' : ''">
    <div class="icon">
      <img :src="item.icon | urlPatten" />
    </div>
    <div class="nick">{{ item.nick }}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["item"],
  filters: {
    urlPatten(val) {
      return `http://10.45.210.5:3000/${val}`;
    }
  },
  computed: {
    ...mapState("friend", ["selectUser"]),
    isActive() {
      return this.selectUser.id === this.item.id;
    }
  },
  methods: {
    handlerClick(item) {
      console.log(item, "item");
      this.$store.dispatch("friend/SET_SELECT_USER", item);
    }
  }
};
</script>
<style lang="scss" scoped>
.friend {
  & {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    padding: 14px;
  }
  &:hover {
    background-color: rgb(215, 216, 218);
  }
  &.active {
    background-color: rgb(215, 216, 218);
  }
  .icon {
    height: 45px;
    width: 45px;
    flex: none;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .nick {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 14px;
    font-size: 20px;
    font-weight: 300;
  }
}
</style>
