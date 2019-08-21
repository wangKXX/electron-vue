<template>
  <div class="chat">
    <div class="left">
      <common-user-list>
        <template v-slot:search>
          <el-input placeholder="搜索" v-model="searchVal" size="mini"></el-input>
          <el-button size="mini" type="text" class="el-icon-circle-plus-outline" @click="$refs.showAdd.handlerShowAdd()"></el-button>
        </template>
        <template v-slot:user>
          <el-collapse>
            <el-collapse-item title="新的朋友">
              <item v-for="(item, index) in taskList" :key="`item${index}`" :userInfo="item.re"></item>
            </el-collapse-item>
          </el-collapse>
          <friend-item v-for="(item, index) in friendList" :key="`friend${index}`" :item="item"></friend-item>
        </template>
      </common-user-list>
    </div>
      <add-friend ref="showAdd"></add-friend>
    <div class="right">
      <right-mean></right-mean>
    </div>
  </div>
</template>
<script>
import commonUserList from "@/components/common/common-user-list";
import friendItem from "./friend-item";
import rightMean from "./right-mean";
import addFriend from '../add-friend'
import item from './addTask'
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchVal: ""
    };
  },
  computed: {
    ...mapState("friend", ["friendList"]),
    ...mapState("addTask", ["taskList"])
  },
  components: {
    commonUserList,
    friendItem,
    rightMean,
    item,
    addFriend
  }
};
</script>
<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .left {
    width: 250px;
    flex: none;
    background-color: rgb(243, 243, 243);
  }
  .right {
    width: 100%;
  }
}
</style>
