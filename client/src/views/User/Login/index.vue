<template>
  <div class="web-login_container">
    <section class="container">
      <div class="login-box">
        <h1 class="login-tips">LightCreater</h1>
        <el-form status-icon ref="loginForm">
          <el-form-item prop="email">
            <el-input class="input" placeholder="邮箱地址" prefix-icon="el-icon-message" v-model="form.email">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input minlength="6" maxlength="16" class="input" type="password" placeholder="密码" prefix-icon="el-icon-mobile-phone" v-model="form.password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-login" size="big" type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
import { requestUserLogin } from '@/api'
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      const data = {
        ...this.form
      }
      requestUserLogin(data)
        .then(res => {
          const {
            code,
            message,
            data
          } = res
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: message,
              type: 'success'
            })
            this.$store.dispatch('userInfoAction', data)
            setTimeout(() => {
              location.href = '/'
            }, 300)
          } else {
                    this.$notify({
                      title: '失败',
                      message: message,
                      type: 'error'
                    })
                }
        })
    }
  }
}

</script>
<style lang="scss" scoped>
.web-login_container {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #1F2D3D;
}

.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 35vw;
  max-width: 35vw;
  padding: 35px 35px 15px 35px;
  margin-bottom: 20px;
  color: #FFFFFF;
  background: transparent;

  .btn-login {
    width: 100%
  }

  .login-tips {
    margin-bottom: 10px;
  }
}

</style>
