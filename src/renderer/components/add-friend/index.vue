<template>
  <el-drawer
    :visible.sync="drawer"
    :direction="direction"
    size="300px"
    :modal="false"
    :show-close="false"
    custom-class="add-friend-dialog"
    :before-close="handleClose"
  >
    <template slot="title">
      <el-input placeholder="请输入对方微信号" prefix-icon="el-icon-search" v-model="keyword" size="mini" :clearable="true" @change="handlerChange"></el-input>
    </template>
    <item :user="userInfo" v-if="userInfo.id"></item>
  </el-drawer>
</template>
<script>
import item from './item'
export default {
  components: {
    item
  },
  data() {
    return {
      drawer: false,
      direction: "ttb",
      keyword: '',
      timer: null,
      userInfo: {}
    };
  },
  methods: {
    handleClose() {
      this.drawer = false;
    },
    handlerShowAdd() {
      this.drawer = true;
    },
    handlerChange() {
      clearTimeout(this.timer);
      setTimeout(async () => {
        const res = await this.Api.getUserById(this.keyword);
        const { data: { data }} = res;
        if (data.length) {
          this.userInfo = data[0];
        }  
      }, 300);
    }
  }
};
</script>
<style lang="scss">
.el-drawer.ttb.add-friend-dialog {
  width: 400px;
  left: 50%;
  margin-left: -200px;
}
</style>