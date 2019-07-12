<template>
    <div class="chat">
        <div class="left">
            <common-user-list>
              <template v-slot:search>
                <el-input placeholder="搜索" v-model="searchVal" size="mini"></el-input>
                <el-button size="mini">+</el-button>
              </template>
              <template v-slot:user v-if="userList && userList.length">
                <user-item :user='item' v-for="(item, index) in userList" :key="`user${index}`"></user-item>
              </template>
            </common-user-list>
        </div>
        <div class="right">
            <chat-room></chat-room>
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
    ...mapState('userList', ['userList'])
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
        flex: none;
        background-color: rgb(235, 233, 232);
    }
    .right{
        width: 100%;
    }
}
</style>
