<template>
  <header>
    <slot name="left"></slot>
    <slot name="right"></slot>
  </header>
</template>
<style lang="scss" scoped>
header{
  display: flex;
  align-items: center;
  justify-content:space-between;
  width: 100%;
  height: 30px;
  padding: 15px;
  box-sizing: border-box;
}
</style>
