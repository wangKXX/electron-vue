<template>
  <div class="login">
    <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane label="用户管理" name="first">
        <span slot="label"><i class="el-icon-date"></i> 登录</span>
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="51px" class="demo-ruleForm">
        <el-form-item
              label="账号"
              prop="age"
              :rules="[
                { required: true, message: '账号不能为空'},
                { type: 'number', message: '账号必须为数字值'}
              ]"
            >
              <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="pass"
              :rules="[
                { required: true, message: '密码不能为空'}
              ]"
            >
              <el-input type="pass" v-model.number="numberValidateForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
              <el-button @click="register" type="text">去注册？</el-button>
            </el-form-item>
          </el-form>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      numberValidateForm: {
          age: ''
        }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('success',this);
          // 从后段获取userInfo信息写入本地
          const userInfo = {};
          this.$electron.ipcRenderer.send('dealCache', {type: 2, key: 'userInfo', data: userinfo});
          localStorage.setItem('userInfo', this.numberValidateForm.age);
          this.$router.push({path: '/main/chat'})
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    register() {
      // this.$refs[formName].resetFields();
      // this.$electron.ipcRenderer.send('openWin', {url: '/register'});
      this.$router.push({path: '/register'});
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content{
    width: 500px;
    height: 300px;
  }
}
</style>
