<template>
    <div class="chat">
        <div class="left">
            <common-user-list>
              <template v-slot:search>
                <el-input placeholder="搜索" v-model="searchVal" size="mini"></el-input>
                <el-button size="mini">+</el-button>
              </template>
              <template v-slot:user>
                <user-item :user='item' v-for="(item, index) in userList" :key="`user${index}`"></user-item>
              </template>
            </common-user-list>
        </div>
        <div class="right">
            right
        </div>
    </div>
</template>
<script>
import commonUserList from '@/components/common/common-user-list';
import userItem from './user-item';
import { mapState } from 'vuex';
export default {
  components: {
    commonUserList, userItem
  },
  data() {
    return {
      searchVal: '',
    }
  },
  computed: {
    ...mapState('userList', ['userList'])
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
