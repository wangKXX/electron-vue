<template>
  <div class="register">
    <header-back>
      <i class="el-icon-back" slot="left" @click="$router.back()"></i>
    </header-back>
    <el-form
      :model="registerData"
      label-width="80px"
      ref="register"
      class="register-form"
      :rules="rules"
    >
      <el-form-item
        label="账号"
        prop="account"
        :rules="[
                { required: true, message: '账号不能为空'},
                { type: 'number', message: '账号必须为数字值'}
              ]"
      >
        <el-input
          type="number"
          v-model.number="registerData.account"
          autocomplete="off"
          placeholder="手机号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="pass"
        :rules="[
                { required: true, message: '密码不能为空'}
              ]"
      >
        <el-input type="pass" v-model="registerData.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" :rules="[{required: true, message: '确认密码不能为空'}]">
        <el-input type="pass" v-model="registerData.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick" :rules="[{required: true, message: '昵称不能为空'}]">
        <el-input type="text" v-model="registerData.nick" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="上传头像" prop="icon">
        <el-input type="file" v-model="registerData.icon"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input type="textarea" v-model="registerData.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('register')">提交</el-button>
        <el-button @click="resetForm('register')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import headerBack from '../common/header-back';
export default {
  components: { headerBack },
  data() {
    const checkPassValidator = (rule, value, callback) => {
      if (value !== this.registerData.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        checkPass: [{ validator: checkPassValidator, trigger: "blur" }]
      },
      registerData: {
        account: 0,
        icon: null,
        desc: "",
        pass: "",
        checkPass: "",
        nick: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  .register-form{
    width: 400px;
  }
}
</style>
