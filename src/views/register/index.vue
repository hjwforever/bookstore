/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册页面</h3>
      </div>

      <el-form-item prop="uname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="uname"
          v-model="registerForm.uname"
          placeholder="账户名称"
          name="uname"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="nickname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="nickname"
          v-model="registerForm.nickname"
          placeholder="用户昵称"
          name="nickname"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        >
          <el-button slot="append" :disabled="disabled" type="primary" @click="validateEmail">获取验证码</el-button>
        </el-input>
      </el-form-item>

      <el-form-item v-show="sentValidateRequest" prop="validateCode">
        <span class="svg-container">
          <svg-icon icon-class="validateCode" />
        </span>
        <el-input
          ref="validateCode"
          v-model="registerForm.validateCode"
          placeholder="验证码"
          name="validateCode"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="rePassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.rePassword"
          :type="passwordType"
          placeholder="rePassword"
          name="rePassword"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >Register</el-button>
      <span style="color: white">已有账户?</span><router-link to="/login" style="color: dodgerblue">去登录</router-link>
      <!--      <div class="tips">-->
      <!--        <span style="margin-right:20px;">username: admin</span>-->
      <!--        <span> password: any</span>-->
      <!--      </div>-->
    </el-form>
  </div>
</template>

<script>
import { validEmail, validUName } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUName(value)) {
        callback(new Error('Please enter the correct user name with length between 4~10'))
      } else {
        callback()
      }
    }
    // eslint-disable-next-line no-unused-vars
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please enter the correct Email'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 && value.length > 16) {
        callback(new Error("The password can't less than 6 can not be more than 16 digits"))
      } else {
        callback()
      }
    }

    const validateRePassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('The password must be the same'))
      } else {
        callback()
      }
    }
    return {
      rePassword: '',
      sentValidateRequest: false,
      registerForm: {
        uname: '',
        nickname: '',
        email: '',
        validateCode: '',
        password: '',
        rePassword: ''
      },
      registerRules: {
        uname: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        rePassword: [
          { required: true, trigger: 'blur', validator: validateRePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    disabled() {
      return !(this.registerForm.email.length > 0 && validEmail(this.registerForm.email))
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/register', this.registerForm)
            .then(res => {
              console.log(res)
              // this.$router.push({ path: this.redirect || '/dashboard' })
              this.$router.push({ path: '/login' })
              this.loading = false
            })
            .catch(err => {
              console.log(err)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    validateEmail() {
      // TODO: 请求验证码
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(this.registerForm.email)
          resolve({
            data: 'success'
          })
        }, 200)
      }).then(res => {
        this.sentValidateRequest = true
        const { data } = res
        console.log(data)
        this.$message.success('验证码发送成功')
      }).catch(err => {
        this.sentValidateRequest = false
        const { data } = err
        console.log(data)
        this.$message.error('验证码发送失败')
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    // display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
