<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project',
    created() {
      this.$electron.ipcRenderer.send('initCache', '1944821630');
      this.$electron.ipcRenderer.send('dealCache', {type: 1, key: 'userList'});
      this.$electron.ipcRenderer.on('dealCacheResp', (e, args) => {
        const { key, data } = args;
        if (key === 'userList') {
          this.$store.dispatch('userList/SET_USER_LIST', data);
        }
      });
      this.$store.dispatch('friend/GET_USER_LIST', {});
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
