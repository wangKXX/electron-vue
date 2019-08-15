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
      this.$refs.content && (this.$refs.content.scrollTop = this.$refs.content.scrollHeight);
    }, 50);
  },
  watch: {
    histryCache() {
      setTimeout(() => {
        this.$refs.content && (this.$refs.content.scrollTop = this.$refs.content.scrollHeight);
      }, 50);
    }
  },
  methods: {
    ...mapActions("userList", ["SET_HISTRY_CACHE"]),
    handlerMessage() {
      console.log(this.currentSession);
      const { id, nick, icon, des } = this.currentSession;
      console.log(this.userInfo);
      const message = {
        re: this.userInfo[0],
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
        this.$refs.content && (this.$refs.content.scrollTop = this.$refs.content.scrollHeight);
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
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    border-top: 1px solid #ebe9e8;
    border-bottom: 1px solid #ebe9e8;
    overflow-y: auto;
  }
  footer {
    width: 100%;
    height: 150px;
    flex: none;
    padding: 5px;
    box-sizing: border-box;
    padding-top: 0;
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
    }
  }
}
</style>
