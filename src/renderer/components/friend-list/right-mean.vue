<template>
  <div class="right-mean">
    <div class="userinfo">
      <div class="ico">
        <img :src="selectUser.src">
      </div>
      <div>{{ selectUser.nick }}</div>
      <el-button type="success" @click="handlerClick(selectUser.id)">发消息</el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('friend', ['selectUser'])
  }
}
</script>
<style lang="scss" scoped>

</style>
