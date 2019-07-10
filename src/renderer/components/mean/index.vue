<template>
    <ul class="mean">
        <li v-for="(item, index) in meanData" :key="`mean${index}`" :class="[item.icon, isActive === index ? 'active' : '']" @click="openPath(item.path, index)"></li>
    </ul>
</template>
<script>
export default {
  data() {
    return {
      meanData: [{
        path: '/chat',
        icon: 'el-icon-chat-round'
      },{
        path: '/notebook',
        icon: 'el-icon-notebook-1'
      },{
        path: '/showtime',
        icon: 'el-icon-orange'
      }],
      isActive: 0
    }
  },
  methods: {
    openPath(url, index) {
      this.isActive = index;
      this.$router.push({path: url});
    }
  }
}
</script>
<style lang="scss" scoped>
.mean{
  width: 100%;
  height: 34px;
  font-size: 35px;
  color: #fff;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 36px;
  li{
    margin: 0;
    padding: 0;
    cursor: pointer;
    margin-bottom: 36px;
    font-weight: 100;
    &.active{
      color: #79D275;
    }
  }
}
</style>
