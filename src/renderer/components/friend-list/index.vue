<template>
  <div class="chat">
      <div class="left">
          <common-user-list>
            <template v-slot:search>
              <el-input placeholder="搜索" v-model="searchVal" size="mini"></el-input>
              <el-button size="mini">+</el-button>
            </template>
            <template v-slot:user>
              <friend-item v-for="(item, index) in friendList" :key="`friend${index}`" :item="item"></friend-item>
            </template>
          </common-user-list>
      </div>
      <div class="right">
          <right-mean></right-mean>
      </div>
  </div>
</template>
<script>
import commonUserList from '@/components/common/common-user-list';
import friendItem from './friend-item';
import rightMean from './right-mean';
import { mapState } from 'vuex';
export default {
  data(){
    return {
      searchVal: ''
    }
  },
  computed: {
    ...mapState('friend', ['friendList'])
  },
  components: {
    commonUserList,
    friendItem,
    rightMean
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
        background-color: rgb(243, 243, 243);
    }
    .right{
        width: 100%;
    }
}
</style>
