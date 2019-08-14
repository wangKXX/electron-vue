<template>
  <div class="main">
    <div class="left">
      <div class="icon">
        <img :src="userInfo[0].icon | urlPatten" />
      </div>
      <mean></mean>
    </div>
    <div class="right">
      <common-header></common-header>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import socketIo from "../utils/socket";
import mean from "@/components/mean";
import commonHeader from "@/components/common/common-header";
import { mapState, mapActions } from "vuex";
export default {
  components: { mean, commonHeader },
  computed: {
    ...mapState("userList", ["currentSession"]),
    ...mapState("userInfo", ["userInfo"])
  },
  methods: {
    ...mapActions("friend", ["clearFriend"]),
    ...mapActions("userList", ["clearUserList"]),
    ...mapActions("userInfo", ["clearUserInfo"])
  },
  methods: {
    ...mapActions("userList", ["SET_HISTRY_CACHE"]),
    handlerMessage(data) {
      data = JSON.parse(data);
      const { type, re } = data;
      if (type === "pong") {
        return false;
      }
      console.log(data, "recvice");
      if (re.id === this.currentSession.id) {
        this.SET_HISTRY_CACHE({
          type: 1,
          mesg: data
        });
        this.$electron.ipcRenderer.send("dealCache", {
          type: 2,
          key: this.currentSession.id,
          data
        });
      } else {
        this.$electron.ipcRenderer.send("dealCache", {
          type: 2,
          key: re.id,
          data
        });
      }
    }
  },
  created() {
    this.$electron.ipcRenderer.send("dealCache", { type: 1, key: "userInfo" });
    this.$electron.ipcRenderer.on("dealCacheResp", (e, args) => {
      const { key, data } = args;
      if (key === "userInfo") {
        // 用户信息
        this.$store.dispatch("userInfo/SET_USER_INFO", data);
        const userId = data[0].id;
        console.log(data, "id");
        const Io = new socketIo({
          url: "ws://10.45.208.141:3030",
          userId,
          cb: this.handlerMessage
        });
        window.Io = Io;
      }
      if (key === "userList") {
        // 获取历史记录列表
        this.$store.dispatch("userList/SET_USER_LIST", data);
        console.log(data, "data");
        const currentSession = data ? data.slice(-1)[0] : null;
        this.$store.dispatch("userList/SET_CURRENT_SESSION", currentSession);
      }
    });
  },
  destroyed() {
    this.clearFriend();
    this.clearUserList();
    this.clearUserInfo();
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100;
  height: 100%;
  display: flex;
  // align-items: center;
  justify-content: center;
  .left {
    width: 60px;
    flex: none;
    height: 100%;
    background-color: #051b32;
    box-sizing: border-box;
    padding: 20px 13px;
    .icon {
      width: 100%;
      height: 34px;
      background-color: #fff;
      font-size: 34px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
