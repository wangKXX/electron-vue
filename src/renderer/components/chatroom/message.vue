<template>
  <div :class="['message', 'self']" v-if="isSelf">
  <div class="content">
  {{item.mesg.content}}
  </div>
  <div class="icon">
    <img :src="item.user.icon | urlPatten">
  </div>
  </div>
  <div :class="['message']" v-else>
  <div class="icon">
    <img :src="item.user.src">
  </div>
  <div class="content">
  {{item.mesg.content}}
  </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  props: ['item'],
  computed: {
    ...mapState('userInfo', ['userInfo']),
    isSelf() {
      return this.item.user.id = this.userInfo[0].id;
    }
  },
}
</script>
<style lang="scss" scoped>
.message{
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  .icon{
    height: 45px;
    width: 45px;
    flex: none;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .content{
    max-width: 300px;
    word-wrap:break-word;
  }
}
.self{
  justify-content: flex-end;
}
</style>
