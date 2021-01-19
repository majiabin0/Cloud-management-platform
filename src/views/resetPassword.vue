<template>
  <div class="login">
    <!-- 前端样式部分 -->
    <el-form ref="resetForm" :model="resetForm" :rules="resetRules" class="login-form">
      <h3 class="title">重置密码</h3>
        <el-form-item prop="username">
            <el-input v-model="resetForm.username" type="text" auto-complete="off" placeholder="请输入您的账号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
            </el-input>
        </el-form-item>

        <el-form-item prop="password">
            <el-input v-model="resetForm.password" type="text" auto-complete="off" placeholder="请输入您的新密码">
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
            </el-input>
        </el-form-item>

        <el-form-item prop="checkPassword">
            <el-input
                v-model="resetForm.checkPassword"
                type="text"
                auto-complete="off"
                placeholder="请再次输入您的密码" 
            >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
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

import {resetPassword}  from "@/api/reset"
import {email}  from "@/api/email"


export default {
  name: "Forget",
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.resetForm.checkPassword !== '') {
            this.$refs.resetForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

    return {
        
      resetForm: {
        username:"",
        password:"",      
      },


      // 规则检验
      resetRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
            { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
        ],
      
       
      },
     
      redirect: undefined
    };
  },
  created() {
  
    email(this.$route.query).then(res=>{
      if(res.code == 200){
          this.$router.push({ path:'/resetPassword'  })
      }else{
      
        this.$router.push({ path:'/forgetPassword'  })
      }
    
    })
  },
  methods: {
      
    

    //点击提交方法
    toAmend() {

      this.$refs.resetForm.validate(valid => {
        if (valid) {
          resetPassword(this.resetForm).then(res=>{
            if(res.code  == '200'){
              this.$message({
                message: '修改成功111',
                type: 'success',
              });

            }
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
