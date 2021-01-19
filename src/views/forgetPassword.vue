<template>
  <div class="login">
    <!-- 前端样式部分 -->
    <el-form ref="getForm" :model="getForm" :rules="getRules" class="login-form">
      <h3 class="title">找回密码</h3>
      <el-form-item prop="username">
        <el-input v-model="getForm.username" type="text" auto-complete="off" placeholder="请输入您的账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="getForm.email"
          type="email"
          auto-complete="off"
          placeholder="请输入您的邮箱"
         

        >
          <svg-icon slot="prefix" icon-class="email" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
   

      <el-form-item style="width:100%;">
        <el-button
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="toAmend"
        >
        <span>提交</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2019 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>


import {forgetPassword}  from "@/api/forget"

export default {
  name: "Forget",
  data() {
    return {
        
      getForm: {
        username: "",
        email: "",
        url:"http://27.223.26.82:7080/resetPassword"      
            
      },
      // 规则检验
      getRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
         email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
       
      },
     
      redirect: undefined
    };
  },
 
  methods: {
    //点击提交方法
    toAmend() {
      this.$refs.getForm.validate(valid => {
        if (valid) {
          
          forgetPassword(this.getForm).then(res=>{
            if(res.code  == '200'){
              this.$message({
                message: '请前往您的邮箱查看',
                type: 'success'
              });
            }
          }).catch(err=>{
            console.log(666,err)
          })
        }
      });
    }




    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/image/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
