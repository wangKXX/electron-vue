<template>
  <div class="main">
    <div class="left">
      <div class="icon">
        <img :src="userInfo.icon | urlPatten" />
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
    ...mapActions("userList", ["SET_HISTRY_CACHE", "clearUserList"]),
    ...mapActions("friend", ["clearFriend"]),
    ...mapActions("userInfo", ["clearUserInfo"]),
    ...mapActions("addTask", ["_set_addTask"]),
    handlerMessage(data) {
      // data = JSON.parse(data);
      const { type, re, mesg } = data;
      if (type === "pong") {
        return false;
      }
      // 添加好友逻辑
      if (type === "add") {
        console.log(data, "add");
        this._set_addTask(data);
      } else {
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
          // 不属于当前绘画的消息处理
          this.$electron.ipcRenderer.send("dealCache", {
            type: 2,
            key: re.id,
            data
          });
          const userInfo = {
            id: re.id,
            nick: re.nick,
            icon: re.icon,
            lastMsg: {
              date: mesg.time,
              content: mesg.content
            }
          };
          this.$electron.ipcRenderer.send("dealCache", {
            type: 2,
            key: "userList",
            data: userInfo
          });
          this.$electron.ipcRenderer.send("dealCache", {
            type: 1,
            key: "userList"
          });
        }
      }
    }
  },
  created() {
    this.$electron.ipcRenderer.send("dealCache", { type: 1, key: "userInfo" });
    this.$electron.ipcRenderer.on("dealCacheResp", (e, args) => {
      const { key, data } = args;
      if (key === "userInfo") {
        // 用户信息
        const userId = data[0].id;
        const Io = new socketIo({
          url: "ws://10.45.215.199:3030",
          userId,
          cb: this.handlerMessage
        });
        window.Io = Io;
      }
      if (key === "userList") {
        // 获取历史记录列表
        console.log(data, "data");
        this.$store.dispatch("userList/SET_USER_LIST", data || []);
        const currentSession = data ? data.slice(-1)[0] : null;
        this.$store.dispatch(
          "userList/SET_CURRENT_SESSION",
          currentSession || {}
        );
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
    background-color: #000;
    box-sizing: border-box;
    padding: 20px 13px;
    .icon {
      width: 100%;
      height: 34px;
      background-color: #fff;
      font-size: 34px;
      border-radius: 3px;
      overflow: hidden;
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
