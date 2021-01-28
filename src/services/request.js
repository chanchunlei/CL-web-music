import axios from 'axios';

import { TIMEOUT, BASE_URL } from './config';


//封装axios
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})


//拦截器
instance.interceptors.request.use(//请求前
  config => {
    // if(store.state.token){//判断token是否存在,验证
    //   config.headers.Authorization = `Bearer ${store.state.token}`;//拼接token
    // }
    
    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(//请求结束
  response => {
    
    //console.log(response);
    //去除掉其他信息
    return response.data;
  },
  error => {
    if (error.response) {
      
    }
    console.log(error.response)
    return Promise.reject(error.response) // 返回接口返回的错误信息
  });


//项目中直接使用instance
export default instance;