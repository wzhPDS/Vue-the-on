<template>
  <div class="login">
    <div class="container">
      <el-form :model="LoginForm" :rules="rules" ref="LoginForm" class="demo-ruleForm">
                  <img src="../assets/avatar.jpg" alt="" class="avatar">
        <el-form-item label prop="username">
          <el-input v-model="LoginForm.username" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="LoginForm.password" prefix-icon="myicon myicon-key"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click='loginSubmit("LoginForm")'>登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>

// 引入登录验证方法
import { login } from '@/api/users_index.js'
export default {
  data () {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          //   说明用户输入合法，那么就可以提交
          //   发送登陆验证请求
          login(this.LoginForm)
            .then((result) => {
              if (result.meta.status === 200) {
                // 将token数据存储到本地存储
                console.log(result)
                // 将用户名存储到vuex
                // this.$store.state.currentUerName = result.data.username
                // 同步方式的调用
                // this.$store.commit('setUserName', result.data.username)
                // 通过dispatch调用Actions中的方法--异步方式
                this.$store.dispatch('setUserNameAction', result.data.username)
                localStorage.setItem('itcastpro_token', result.data.token)
                // 要进行路由的跳转
                this.$router.push({ name: 'Home' })
              } else {
                this.$message.error(result.meta.msg)
              }
            })
        } else {
          this.$message.error('数据输入不合法')
          return false
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
