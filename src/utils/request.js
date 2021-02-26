import axios from 'axios'
import { getToken, removeToken } from '@/utils/token.js';
import { Message } from 'element-ui';
import router from '@/router/index.js'
var instance = axios.create({
    baseURL:"http://127.0.0.1/heimamm/public",
    withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(getToken()){
        config.headers.token = getToken()
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code === 200){

        return response.data;
    }else if(response.data.code === 0){
        Message.error('手机号已经注册过了')
        return Promise.reject(new Error());
    }else if(response.data.code === 206){
        Message.error('token错误')
        removeToken()
        router.push('/login')
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance