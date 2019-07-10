<template>
    <div class="common-header">
      <div class="left"></div>
      <div class="right">
        <div class="mean-left"></div>
        <ul class="mean">
          <li class="el-icon-minus" @click="handlerMin"></li>
          <li class="el-icon-close" @click="handlerClose"></li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    handlerClose() {
      this.$electron.ipcRenderer.send('closeClient', 0);
    },
    handlerMin() {
      this.$electron.ipcRenderer.send('minClient', 0);
    }
  }
}
</script>
<style lang="scss" scoped>
.common-header{
  width: 100%;
  height: 28px;
  flex: none;
  display: flex;
  align-items: center;
  .left{
    height: 100%;
    width: 250px;
    flex: none;
    background-color: rgb(232, 233, 235);
    -webkit-app-region: drag;
  }
  .right{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .mean-left{
      width: 100%;
      height: 100%;
      -webkit-app-region: drag;
    }
    ul{
      flex: none;
    }

    li{
      cursor: pointer;
      margin-right: 10px;
    }
  }
}
</style>
