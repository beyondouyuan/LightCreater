<template>
    <div class="web-register_container">
        <section class="container">
            <div class="login-box">
                <h1>LightCreater</h1>
                <el-form status-icon ref="registerForm">
                    <el-form-item prop="email">
                        <el-input class="input" placeholder="邮箱地址" prefix-icon="el-icon-message" v-model="form.email">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input class="input" minlength="4" maxlength="16" placeholder="用户名，4-16位字母 数字 _ - 组成" v-model="form.username">
                            <i slot="prefix" class="el-input__icon iconfont" style="position:relative;left: 5px;">&#xe604;</i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="nickname">
                        <el-input class="input" minlength="1" maxlength="10" placeholder="昵称" v-model="form.nickname">
                            <i slot="prefix" class="el-input__icon iconfont" style="position:relative;left: 5px;">&#xe604;</i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input minlength="6" maxlength="16" class="input" type="password" placeholder="密码" prefix-icon="el-icon-mobile-phone" v-model="form.password">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
                        <el-input class="input" type="password" minlength="8" maxlength="16" placeholder="确认密码" v-model="form.confirmPassword">
                            <i slot="prefix" class="el-input__icon iconfont" style="position:relative;left: 5px;">&#xe62d;</i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn-register" size="big" type="primary" @click="handleRegister">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>
<script>
import { requestUserRegister } from '@/api'
export default {
    name: 'Webregister',
    data() {
        return {
            form: {
                email: '',
                password: '',
                username: '',
                nickname: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        handleRegister() {
            const data = {
                ...this.form
            }
            requestUserRegister(data)
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
                    setTimeout(() => {
                      location.href = '/login'
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
.web-register_container {
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

    .btn-register {
        width: 100%
    }
}
</style>
