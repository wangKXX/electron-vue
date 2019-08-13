<template>
  <div class="login">
    <header-back>
      <template slot="right">
        <top-mean :isShowLeft="false"></top-mean>
      </template>
    </header-back>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <span slot="label">
            <i class="el-icon-date"></i> 登录
          </span>
          <el-form
            :model="numberValidateForm"
            ref="numberValidateForm"
            label-width="51px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="账号"
              prop="number"
              :rules="[
                { required: true, message: '账号不能为空'},
                { type: 'number', message: '账号必须为数字值'}
              ]"
            >
              <el-input type="age" v-model.number="numberValidateForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="pass"
              :rules="[
                { required: true, message: '密码不能为空'}
              ]"
            >
              <el-input type="password" v-model.number="numberValidateForm.pass" autocomplete="off"></el-input>
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
import socketIo from "../../utils/socket";
import headerBack from "../common/header-back";
import topMean from "../common/common-header"
export default {
  components: {
    headerBack, topMean
  },
  data() {
    return {
      activeName: "first",
      numberValidateForm: {
        number: "",
        pass: ""
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { number, pass } = this.numberValidateForm;
          const res = await this.Api.getLogin({ id: number, pwd: pass });
          console.log("success", res);
          const {
            data: { status, message, data }
          } = res;
          if (status === 0) {
            // 从后段获取userInfo信息写入本地
            this.created(number);
            console.log('login')
            this.$electron.ipcRenderer.send("dealCache", {
              type: 2,
              key: "userInfo",
              data: data[0]
            });
            sessionStorage.setItem("userInfo", this.numberValidateForm.number);
            this.$router.push({ path: "/chat" });
          } else {
            return message;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      // this.$refs[formName].resetFields();
      // this.$electron.ipcRenderer.send('openWin', {url: '/register'});
      this.$router.push({ path: "/register" });
    },
    async created(userId) {
      //const userId = localStorage.getItem('userInfo')
      this.$electron.ipcRenderer.send("initCache", userId);
      this.$electron.ipcRenderer.send("dealCache", {
        type: 1,
        key: "userList"
      });
      // this.$store.dispatch("friend/GET_USER_LIST");
      const Io = new socketIo({
        url: "ws://10.45.208.141:3030",
        userId,
        cb: () => {}
      });
      window.Io = Io;
      const result = await this.Api.getUserList(userId);
      console.log(result, 'res')
      const {
            data: { status, message, data }
          } = result;
      if (status === 0) {
        this.$store.dispatch("friend/SET_USER_LIST", data);
      }
      console.log(userId);
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  .content {
    width: 500px;
    height: 300px;
    margin-top: 100px;
  }
}
</style>
