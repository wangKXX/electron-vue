<template>
  <div class="user-item" @click="openChat(user.id)" :class="isActive ? 'active' : ''">
    <div class="user-icon">
      <img :src="user.src"/>
    </div>
    <div class="user-msg">
      <div class="user-name">
        <div class="user-nick">{{ user.nick }}</div>
        <div class="user-date">{{ user.lastMsg.date | dateFormat }}</div>
      </div>
      <div class="user-histroy">{{ user.lastMsg.content }}</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  props: ['user'],
  data() {
    return {}
  },
  computed: {
    ...mapState('userList', ['currentSession']),
    isActive() {
      return this.currentSession.id === this.user.id;
    }
  },
  methods: {
    openChat(id) {
      const user = this.user;
      const userinfo = {
        id: user.id,
        nick: user.nick,
        src: user.src,
        lastMsg: {
          date: new Date(),
          content: ''
        }
      }
      this.$store.dispatch('userList/SET_CURRENT_SESSION', userinfo);
      this.$electron.ipcRenderer.send('dealCache', {type: 1, key: id});
      this.$electron.ipcRenderer.on('dealCacheResp', (e, args) => {
        const { key, data } = args;
        if (key === id) {
          this.$store.dispatch('userList/SET_HISTRY_CACHE', data || []);
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.user-item{
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 66px;
  padding: 14px;
  &:hover{
    background-color: rgb(215, 216, 218);
  }
  &.active{
    background-color: rgb(215, 216, 218);
  }
  .user-icon{
    height: 45px;
    width: 45px;
    flex: none;
    img{
      width: 100%;
      display: block;
    }
  }
  .user-msg{
    padding-left: 12px;
    width: 100%;
    .user-histroy {
      width: 100%;
      padding-right: 12px;
      color: #999;
      font-size: 10px;
    }
    .user-name{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .user-date{
        width: 45px;
        font-size: 12px;
        color: #999;
      }
      .user-nick{
        width: 100%;
        padding-right: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #000;
      }
    }
  }
}
</style>
