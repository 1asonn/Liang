import axios from "axios";
import router from "./router";
import Element from "element-ui";

// axios.defaults.baseURL = "https://localhost:8080"

const request = axios.create({
    timeout:5000,
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    }
})

// /* 请求拦截器 */
// request.interceptors.request.use(config =>{                                   
//     config.headers['Authorization'] = localStorage.getItem('token')
//     return config
// })



/* 响应拦截器 */
request.interceptors.response.use(
    response =>{
    const res = response.data
    
    if(res.id || res.code === 200){                 
        return response }

    else{
        // Element.Message.error(res.msg,res.msg,'System Error!')  //弹窗错误警告
        return Promise.reject(response.data.msg)}   
    },
    error =>{
    console.log("error",error)
    if(error.response.data){
        error.message = error.response.data.msg}
    
    if(error.response.data.code === 401){
        this.$router.push('/login')}

    Element.Message.error(error.message,{duration:3000}) //弹窗错误警告
    return Promise.reject(error)
    
    }
)

export default request