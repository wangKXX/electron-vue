<template>
  <div class="chat-room">
    <header>{{ currentSession.nick }}</header>
    <div class="content" ref="content">
      <message v-for="(item, index) in histryCache" :key="`cache${index}`" :item="item"></message>
    </div>
    <footer>
      <textarea class="text" @keydown.enter="handlerMessage" v-model="msg"></textarea>
    </footer>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import message from "./message";
export default {
  components: {
    message
  },
  data() {
    return {
      msg: ""
    };
  },
  computed: {
    ...mapState("userList", ["currentSession", "histryCache"]),
    ...mapState("userInfo", ["userInfo"])
  },
  mounted() {
    setTimeout(() => {
      this.$refs.content &&
        (this.$refs.content.scrollTop = this.$refs.content.scrollHeight);
    }, 50);
  },
  watch: {
    histryCache() {
      setTimeout(() => {
        this.$refs.content &&
          (this.$refs.content.scrollTop = this.$refs.content.scrollHeight);
      }, 50);
    },
    currentSession() {
      if (this.currentSession) {
        const id = this.currentSession.id
        this.$electron.ipcRenderer.send("dealCache", {
          type: 1,
          key: id
        });
        this.$electron.ipcRenderer.on("dealCacheResp", (e, args) => {
          const { key, data } = args;
          if (key === id) {
            this.$store.dispatch("userList/SET_HISTRY_CACHE", data || []);
          }
        });
      }
    }
  },
  methods: {
    ...mapActions("userList", ["SET_HISTRY_CACHE"]),
    handlerMessage() {
      console.log(this.msg, "msg");
      if (!this.msg.trim()) {
        this.msg = "";
        return false;
      }
      const { id, nick, icon, des } = this.currentSession;
      const message = {
        re: this.userInfo,
        user: {
          id,
          nick,
          icon,
          des
        },
        mesg: {
          time: new Date(),
          content: this.msg
        }
      };
      this.SET_HISTRY_CACHE({
        type: 1,
        mesg: message
      });
      setTimeout(() => {
        this.$refs.content &&
          (this.$refs.content.scrollTop = this.$refs.content.scrollHeight);
      }, 50);
      window.Io.send(
        JSON.stringify({
          type: "mesg",
          mesg: message
        })
      );
      this.$electron.ipcRenderer.send("dealCache", {
        type: 2,
        key: this.currentSession.id,
        data: message
      });
      const userinfo = {
        id,
        nick,
        icon,
        des,
        lastMsg: {
          date: new Date(),
          content: this.msg
        }
      };
      this.$electron.ipcRenderer.send("dealCache", {
        type: 2,
        key: "userList",
        data: userinfo
      });
      this.$electron.ipcRenderer.send("dealCache", {
        type: 1,
        key: "userList"
      });
      this.msg = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-room {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  header {
    width: 100%;
    height: 35px;
    flex: none;
    box-sizing: border-box;
    padding: 5px;
    font-weight: bold;
    font-size: 20px;
    background-color: rgb(243, 243, 243);
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    border-top: 1px solid #ebe9e8;
    border-bottom: 1px solid #ebe9e8;
    overflow-y: auto;
    background-color: rgb(243, 243, 243);
  }
  footer {
    width: 100%;
    height: 150px;
    flex: none;
    padding: 5px;
    box-sizing: border-box;
    padding-top: 0;
    background-color: rgb(243, 243, 243);
    textarea {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 8px;
      resize: none;
      border: 0;
      outline: none;
      font-size: 18px;
      overflow-y: auto;
      text-align: justify;
      background-color: rgb(243, 243, 243);
    }
  }
}
</style>
