import axios from "axios";
import { ElMessage } from 'element-plus'


//ts封装axios
const request = axios.create({
    baseURL: '/api/v1',
    timeout: 5000
})
//请求拦截
request.interceptors.request.use(

    config => {
        config.headers['Content-Type'] = 'application/json'
        let token = localStorage.getItem('token')
        if(token){
            config.headers['Authorization'] = token
        }
        else{
            config.headers['Authorization'] = ''
        }
        //console.log(config)
        return config
    },
    error => {
        console.error(error)
        return Promise.reject(error)
    }
)

//响应拦截
request.interceptors.response.use(
    res => {
        //与后端约定 操作成功响应代码
        const SUCCESSCODE = 1
        if(res.data.detail){ 
            ElMessage.error(res.data.detail.message)
            return Promise.reject(res.data.detail)
        }
        if (res.status === 200) {
            //console.log(res);
            
            if (res.data.code === SUCCESSCODE) {
                return res.data
            }
            else {

                ElMessage.error(res.data.message)
                return Promise.reject(res.data)
            }
        }
    },
    error => {
        // 这里用来处理 http 常见错误，进行全局提示
        const mapErrorStatus = new Map([
            [400, '请求方式错误'],
            [401, '请重新登录'],
            [403, '拒绝访问'],
            [404, '请求地址有误'],
            [500, '服务器出错'],
        ])
        const message =
            mapErrorStatus.get(error.response.status) || '请求出错，请稍后再试'
        // 此处全局报错
        ElMessage.error(message)
        console.error(message)
        return Promise.reject(error.response)
    }
)

export default request
