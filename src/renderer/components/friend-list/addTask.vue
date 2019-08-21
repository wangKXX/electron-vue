<template>
  <div class="card">
    <div class="icon">
      <img :src="userInfo.icon | urlPatten" />
    </div>
    <div class="right">
      <div class="r-top">{{ userInfo.nick }}</div>
      <div class="r-btm">
        <span class="r-btm-l">{{ userInfo.des }}</span>
      </div>
    </div>
    <span class="el-icon-circle-plus-outline text-icon" @click="handlerClick"></span>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["userInfo"],
  computed: {
    ...mapState("userInfo", {
      user: state => state.userInfo
    })
  },
  methods: {
    handlerClick() {
      const mesgContent = {
        mesg: {
          re: { id: this.user.id },
          user: { id: this.userInfo.id },
          type: "re_add"
        },
        type: "re_add"
      };
      console.log(this.user, "user", this.userInfo);
      window.Io.send(JSON.stringify(mesgContent));
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 30px;
  box-sizing: border-box;
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    flex: none;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    display: flex;
    padding: 5px;
    width: 100%;
    flex-direction: column;
    font-size: 14px;
    font-weight: 500;
    .r-btm {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
      font-weight: 200;
    }
  }
  .text-icon {
    font-size: 16px;
    cursor: pointer;
  }
}
.el-drawer__body {
  border-top: 1px solid #e8e8e8;
  padding-top: 10px;
}
</style>