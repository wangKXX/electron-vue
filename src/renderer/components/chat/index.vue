<template>
    <div class="chat">
        <div class="left">
            <common-user-list>
              <template v-slot:search>
                <el-input placeholder="搜索" v-model="searchVal" size="mini"></el-input>
              </template>
              <template v-slot:user v-if="userList && userList.length">
                <user-item :user='item' v-for="(item, index) in userList" :key="`user${index}`"></user-item>
              </template>
            </common-user-list>
        </div>
        <div class="right">
            <div class="empty" v-if="!currentSession.icon">暂无聊天记录</div>
            <chat-room v-else></chat-room>
        </div>
    </div>
</template>
<script>
import commonUserList from '@/components/common/common-user-list';
import chatRoom from '../chatroom'
import userItem from './user-item';
import { mapState } from 'vuex';
export default {
  components: {
    commonUserList, userItem, chatRoom
  },
  data() {
    return {
      searchVal: '',
    }
  },
  computed: {
    ...mapState('userList', ['userList', 'currentSession']),
  },
  beforeRouteEnter (to, from, next) {
    // ...
    next(vm => {
      vm.$electron.ipcRenderer.send('dealCache', {type: 1, key: 'userList'});
    });
  }
}
</script>
<style lang="scss" scoped>
.chat{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    
    .left{
        width: 250px;
        height: 100%;
        flex: none;
        // background-color: rgb(235, 233, 232);
    }
    .right{
        width: 100%;
        height: 100%;
        .empty{
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #999;
          background-color: rgb(243, 243, 243);
        }
    }
}
</style>
