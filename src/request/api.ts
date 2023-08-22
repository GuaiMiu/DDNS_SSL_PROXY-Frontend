import request from "./index";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig, } from 'axios'


// export function Login(params: any) {
//   return http({
//     url: "/user/login", //此处为自己请求地址
//     method: "post",
//     data: params,
//   });
// }



interface BaseApiResponse {
  code: number
  message: string
  data: {}
}
interface UserData {
  username: string
  password: string
  remember: boolean
}
export const Login = (params: UserData):Promise<BaseApiResponse> => request({
  url: "/user/login",
  method: "post",
  data: params,
});


// export const GetServiceConfig = (params):Promise<BaseApiResponse> => request.get('/ddns/serviceconfig',{params: {
//   data: 12345
// }});

export const GetServiceConfig = (params) => request({
  url: "/ddns/serviceconfig",
  method: "get",
  params: params
});



export const POSTConfig = (params) => request({
  url: "/ddns/config",
  method: "post",
  data: params
});


export const DELETEConfig = (params) => request({
  url: "/ddns/config",
  method: "delete",
  data: params
});

export const GetConfig = (params) => request({
  url: "/ddns/config",
  method: "get",
  params: params
});