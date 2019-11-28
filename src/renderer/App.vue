<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    // this.$electron.ipcRenderer.sendSync('getIp');
    // this.$electron.ipcRenderer.on('getIp', (e, args) => {
    //   const { ip } = args;
    //   console.log(ip, 'ip1')
    //   window.IP = ip;
    // });
  }
}
</script>
<style>
  /* CSS */
  html,body,#app{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: '微软雅黑';
  }
  ::-webkit-scrollbar{  
      width: 6px;    
      background-color: rgb(235, 233, 232);
  } 
  ::-webkit-scrollbar-track{    
      border-radius: 3px;  
      background-color: rgb(235, 233, 232);
  }   
  ::-webkit-scrollbar-thumb{    
      background-color: lightgray;
      border-radius: 3px 
  }  
  ::-webkit-scrollbar-button{
        display: none;
  }
</style>
