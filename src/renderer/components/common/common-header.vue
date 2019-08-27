<template>
  <div class="common-header">
    <div :class="['left', $route.path === '/notebook' ? 'grey' : '']"></div>
    <div :class="['right', $route.path === '/chat' ? 'grey' : '']">
      <div class="mean-left"></div>
      <ul class="mean">
        <li class="el-icon-refresh" @click="handlerRefresh"></li>
        <li class="el-icon-minus" @click="handlerMin"></li>
        <li class="el-icon-close" @click="handlerClose"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    isShowLeft: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    ...mapState("userInfo", ["userInfo"])
  },
  methods: {
    ...mapActions("addTask", ["_clear_task"]),
    ...mapActions("userList", ["clearUserList"]),
    ...mapActions("friend", ["clearFriend"]),
    ...mapActions("userInfo", ["clearUserInfo"]),
    handlerClose() {
      // 关闭前清空所有state数据
      this.clearFriend();
      this.clearUserList();
      // this.clearUserInfo();
      this._clear_task();
      window.Io.send(
        JSON.stringify({
          type: "logout",
          userId: this.userInfo.id
        })
      );
      this.$electron.ipcRenderer.send("closeClient", 0);
    },
    handlerMin() {
      this.$electron.ipcRenderer.send("minClient", 0);
    },
    handlerRefresh() {
      // this.clearFriend();
      this.clearUserList();
      // this.clearUserInfo();
      // this._clear_task();
      this.$electron.ipcRenderer.send("reload");
    }
  }
};
</script>
<style lang="scss" scoped>
.common-header {
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
  .left {
    height: 100%;
    width: 250px;
    flex: none;
    -webkit-app-region: drag;
  }
  .right {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .mean-left {
      width: 100%;
      height: 100%;
      -webkit-app-region: drag;
    }
    ul {
      flex: none;
    }

    li {
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .grey {
    background-color: rgb(243, 243, 243);
  }
}
</style>
