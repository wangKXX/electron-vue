<template>
<div class="user-list">
  <div class="search-input">
    <slot name="search"></slot>
  </div>
  <div class="user-map">
    <slot name="user"></slot>
  </div>
</div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.user-list{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-input{
    flex: none;
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px;
    display: flex;
  }
  .user-map{
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
.el-input--mini{
  margin-right: 15px;
}
</style>
