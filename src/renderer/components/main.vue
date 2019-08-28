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
  data() {
    return {
      copyUserInfo: ""
    };
  },
  computed: {
    ...mapState("userList", ["currentSession"]),
    ...mapState("userInfo", ["userInfo"])
  },
  methods: {
    ...mapActions("userList", ["SET_HISTRY_CACHE", "clearUserList"]),
    ...mapActions("friend", ["clearFriend"]),
    ...mapActions("userInfo", ["clearUserInfo"]),
    ...mapActions("addTask", ["_set_addTask", "_deltel_task"]),
    async handlerMessage(data) {
      const { type, re, mesg } = data;
      if (type === "pong") {
        return false;
      }
      // 添加好友逻辑
      if (type === "add") {
        this._set_addTask(data);
      } else {
        if (type === "addSucess") {
          // 接收到添加成功消息后1.重新获取好友列表
          const result = await this.Api.getUserList(this.userInfo.id);
          const {
            data: { status, message, data }
          } = result;
          if (status === 0) {
            this.$store.dispatch("friend/SET_USER_LIST", data);
          }
          // 添加成功后删除添加任务
          this._deltel_task(re.id);
          this.$store.dispatch("userList/SET_CURRENT_SESSION", re);
          this.$router.push({ path: "/chat" });
        }
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
          // 不属于当前会话的消息处理
          this.$electron.ipcRenderer.send("dealCache", {
            type: 2,
            key: re.id,
            data
          });
        }
        const userInfo = {
          id: re.id,
          nick: re.nick,
          icon: re.icon,
          des: re.des,
          lastMsg: {
            date: mesg.time,
            content: mesg.content
          }
        };
        this.copyUserInfo = userInfo;
        re.id !== this.currentSession.id && (userInfo.badge = true);
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
  },
  created() {
    window.IP = "10.45.215.231";
    this.$electron.ipcRenderer.send("dealCache", { type: 1, key: "userInfo" });
    this.$electron.ipcRenderer.on("dealCacheResp", (e, args) => {
      const { key, data } = args;
      if (key === "userInfo") {
        // 用户信息
        const userId = data[0].id;
        const Io = new socketIo({
          url: `ws://${window.IP}:3030`,
          userId,
          cb: this.handlerMessage
        });
        window.Io = Io;
      }
      if (key === "userList") {
        // 获取历史记录列表
        this.$store.dispatch("userList/SET_USER_LIST", data || []);
        const currentSession = data ? data.slice()[0] : null;
        this.$store.dispatch(
          "userList/SET_CURRENT_SESSION",
          currentSession || {}
        );
      }
    });
    this.$electron.ipcRenderer.on("isWinMin", (e, args) => {
      if (args) {
        const isMac = (function() {
          return /macintosh|mac os x/i.test(navigator.userAgent);
        })();
        if (isMac) {
          let myNotification = new Notification(`${this.copyUserInfo.nick}`, {
            body: `${this.copyUserInfo.lastMsg.content}`,
            dir: "rtl"
          });
          myNotification.onclick = () => {
            this.$electron.ipcRenderer.send("showWin");
          };
        } else {
          this.$electron.ipcRenderer.send("flashFrame");
        }
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100;
  height: 100%;
  display: flex;
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
