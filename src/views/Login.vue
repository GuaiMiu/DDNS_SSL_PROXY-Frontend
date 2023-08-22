<template>
    <div class="container">
        <div class="login">
            <div class="login-header">
                <h3>欢迎登录</h3>
            </div>

            <div class="login-input">
                <el-input placeholder="请输入账号" v-model="userData.username" clearable size="large"></el-input>
                <el-input placeholder="请输入密码" type="password" v-model="userData.password" clearable show-password
                    size="large" style="margin-top: 10px;"></el-input>
            </div>
            <div class="login-text">
                <el-checkbox v-model="userData.remember">记住密码</el-checkbox>
            </div>
            <div class="login-button">
                <el-button type="primary" style="width: 100%;" size="large" @click="dpostlogin">登录</el-button>
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { Login } from '@/request/api'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { debounce } from '@/hook/debounce'
const router = useRouter()
const userData = reactive({
    username: '',
    password: '',
    remember: false,
})

onMounted(() => {
    if (localStorage.getItem('userData')) {
        //获取本地存储用户信息
        let localUserData = JSON.parse(localStorage.getItem('userData') as string)
        userData.username = localUserData.username
        userData.password = localUserData.password
        userData.remember = localUserData.remember
    }
})
/**
 * 登录
 * @param 没有参数
 * @return 没有返回
 * @description 
 */
interface UserGet {
    code: number,
    message: string
    token: string
}


const postLogin = () => {
    
    //如果勾选记住密码 则存储 
    if (userData.remember) {
        userData.password = userData.password
        localStorage.setItem('userData', JSON.stringify(userData))
    }
    else {
        localStorage.removeItem('userData')
    }
    //登录 
    Login(userData).then(res => {

        ElMessage.success(res.message)
        localStorage.setItem('token', res.data.token)
        router.push({ name: 'Home' })
    }).catch(err => {
        console.error(err.message)
    })

}
const dpostlogin = debounce(postLogin, 100)

</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-image: url(https://api.vvhan.com/api/bing);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}


@media only screen and (max-width: 767px) {
    .login {
        width: 100%;
        height: 100%;

    }

}

.login {
    max-width: 25rem;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 6px 6px 6px 6px;
    box-shadow: inset 0 0 0 3000px rgba(255, 255, 255, 0.5);
}

.login-input {
    width: 80%;
    height: 90px;
}



.login-button {
    width: 80%;
    margin-top: -40px;
    height: 40px;
}

.login-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 80%;
    text-align: center;
    margin: auto;
    padding: 0;
}

.login-text {
    width: 80%;
    height: 20px;
    margin-top: -30px;
    padding: 0;
}

.login-text .el-checkbox {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}
</style>