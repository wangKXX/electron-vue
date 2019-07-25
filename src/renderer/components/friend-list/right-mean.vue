<template>
  <div class="right-mean">
    <div class="userinfo">
      <div class="ico">
        <img :src="selectUser.icon | urlPatten">
      </div>
      <div class="nick">{{ selectUser.nick }}</div>
      <el-button type="success" @click="handlerClick(selectUser)">发消息</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('friend', ['selectUser'])
  },
  methods: {
    ...mapActions('userList', ['SET_CURRENT_SESSION']),
    handlerClick(userinfo) {
      console.log(userinfo, 'userinfo');
      userinfo = {
        id: userinfo.id,
        nick: userinfo.nick,
        icon: userinfo.icon,
        lastMsg: {
          date: new Date(),
          content: ''
        }
      };
      this.SET_CURRENT_SESSION(userinfo);
      // this.$store.dispatch("userList/ADD_USER_LIST", data);
      this.$electron.ipcRenderer.send('dealCache', {type: 2, key: 'userList', data: userinfo});
      this.$electron.ipcRenderer.send("dealCache", {
        type: 1,
        key: "userList"
      });
      this.$router.push({path: '/chat'});
    }
  },
}
</script>
<style lang="scss" scoped>
.right-mean{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .userinfo{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .nick{
      margin: 8px 0;
    }
    .ico{
      width: 45px;
      height: 45px;
      overflow: hidden;
      img{
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
