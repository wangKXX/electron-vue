<template>
    <div class="main">
        <div class="left">
            <div class="icon el-icon-s-custom"></div>
            <mean></mean>
        </div>
        <div class="right">
          <common-header></common-header>
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
import mean from '@/components/mean'
import commonHeader from '@/components/common/common-header'
export default {
  components: { mean, commonHeader }
}
</script>
<style lang="scss" scoped>
.main{
    width: 100;
    height: 100%;
    display: flex;
    // align-items: center;
    justify-content: center;
    .left{
        width: 60px;
        flex: none;
        height: 100%;
        background-color: #051B32;
        box-sizing: border-box;
        padding: 20px 13px;
        .icon{
            width: 100%;
            height: 34px;
            background-color: #fff;
            font-size: 34px;
        }
    }
    .right{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
}
</style>
