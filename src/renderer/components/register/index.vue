<template>
  <div class="register">
    <header-back>
      <i class="el-icon-back" slot="left" @click="$router.back()"></i>
      <template slot="right">
        <top-mean :isShowLeft="false"></top-mean>
      </template>
    </header-back>
    <el-form
      :model="registerData"
      label-width="80px"
      ref="register"
      class="register-form"
      :rules="rules"
      label-position="left"
      size="medium"
    >
      <el-form-item label="账号" prop="id">
        <el-input type="age" v-model.number="registerData.id" autocomplete="off" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="pwd"
        :rules="[
                { required: true, message: '密码不能为空'}
              ]"
      >
        <el-input type="password" v-model="registerData.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" :rules="[{required: true, message: '确认密码不能为空'}]">
        <el-input type="password" v-model="registerData.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick" :rules="[{required: true, message: '昵称不能为空'}]">
        <el-input type="text" v-model="registerData.nick" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="上传头像" prop="icon">
        <input type="file" ref="upload" />
      </el-form-item>
      <el-form-item label="简介" prop="des">
        <el-input type="textarea" v-model="registerData.des"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('register')">提交</el-button>
        <el-button @click="resetForm('register')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import headerBack from "../common/header-back";
import topMean from "../common/common-header";
export default {
  components: { headerBack, topMean },
  data() {
    const checkPassValidator = (rule, value, callback) => {
      if (value !== this.registerData.pwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      console.log(value)
      if (/^1[3456789]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入手机号'));
      }
    };
    return {
      rules: {
        checkPass: [{ validator: checkPassValidator, trigger: "blur" }],
        id: [{ required: true, message: '账号不能为空'}, { validator: checkPhone, trigger: "blur" }]
      },
      registerData: {
        id: null,
        des: "",
        pwd: "",
        checkPass: "",
        nick: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const file = this.$refs.upload.files[0];
          const form = new FormData();
          form.append("icon", file);
          form.append("id", +this.registerData.id);
          form.append("pwd", this.registerData.pwd);
          form.append("nick", this.registerData.nick);
          form.append("des", this.registerData.des);
          const res = await this.Api.register(form);
          const {
            data: {data: { status, message, data }}
          } = res;
          if (status === 0) {
            this.$router.back();
          } else if (status === 1062) {
            console.log(status, 'status');
            const { mesgContent } = data;
            this.$message({
              type: 'error',
              message: mesgContent
            })
          }
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
  .register-form {
    width: 400px;
  }
}
</style>
