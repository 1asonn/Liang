<template>
<div ref="container" class="main">
  <ParticleSystem />
  <div class="header">
    <router-link class="router-link" to="/login">LOGIN</router-link>
    <router-link class="router-link" to="/about">ABOUT</router-link>
  </div>

    <div class="svgContainer" v-if="true">
      <svg viewBox="0 0 400 200">
        <text x="0" y="50%" class="text"> Welcome to EIMS </text>
      </svg> 
    </div>  
        <!-- <el-image style="width: auto; height: 200px;" :src="require('@/assets/jinan.jpg')"></el-image>
        <p>LOVE FROM L1ANG</p>
        <p>关注暨南大学公众号 回复【xxx】获取账户密码</p> -->

    <!-- <el-col :span="1" v-if=false>
        <el-divider direction="vertical"></el-divider>
    </el-col> -->

    <!-- <el-col :xl="6" :lg="7" v-if=false>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
            <el-form-item label="用户名" prop="username" style="width: 380px;">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" style="width: 380px;">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code" style="width: 380px;">
                <el-input v-model="loginForm.code" style="width: 172px; float: left;"></el-input>
                <el-image  :src="captchaImg" class="captchaImg"></el-image>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-col> -->
</div>
</template>


<script>
  import request from 'axios'
  import ParticleSystem from "@/components/ParticleSystem.vue";
import { RouterLink } from 'vue-router';
import router from '@/router';
  export default {
    components: {
      ParticleSystem
    },
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        testForm:{
          username: 'Test2',
          password: '1234'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        captchaImg:null
      };
    },
    methods: {

      submitForm(formName) {
        const loginData = this.testForm
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$axios.post('/login',this.loginForm).then(res => {
            //     const jwt = res.headers['authorization']

            //     this.$store.commit('SET_TOKEN',jwt)
            //     this.$router.push('/index')
            // })
            this.$axios.post('http://localhost:4000/user/login',loginData,{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              transformRequest: (data) => {
                return new URLSearchParams(data).toString();
              }
            }).then((response) => {
            console.log("response",response)
            }).catch(
            (error) => {
              console.log("error",error)})

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      getcaptchaImg(){
        this.$axios.get('/captcha').then(res => {
            console.log("res",res)
            this.loginForm.token = res.data.data.token;
            this.captchaImg = res.data.data.captchaImg;
        })
      },
      async test(){
        const username = "Test2"
        const password = "1234"
        const response = await this.$axios.post('http://localhost:4000/user/login', {
          username,
          password
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: (data) => {
            return new URLSearchParams(data).toString();
          }
        });
      }
    },

    created(){                //页面初始化钩子函数
        this.getcaptchaImg();
    },

    mounted() {
    // 在组件挂载后添加样式
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    },

    beforeDestroy() {
      // 在组件销毁前移除样式
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Bangers&family=Homemade+Apple&family=Sacramento&display=swap");

    a{
      color: white;
      text-decoration: none;  
    }
    
    .header{
      position: absolute;
      display: flex;
      right: 30px;
      top: 0;
      margin-top:20px ;
      gap: 20px;
    }

    .main{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .svgContainer{
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }

   .el-row{
    background-color: rgba(red, green, blue, 0);
    height: 100vh;
    display: flex;
    align-items:center;
    text-align: center;
   }
   
    .el-divider{
        height: 200px;
    }

    .captchaImg{
      float:left;
      margin-left:8px;
      border-radius:4px;
    }

    svg {
    width: 700px;
    height: 300px;
    margin: auto;
    }

    svg text {
      font-family: "Bangers", cursive;
      text-transform: uppercase;
      animation: stroke 5s forwards alternate infinite;
      letter-spacing: 5px;
      font-size: 60px;
    }
    
  @keyframes stroke {
    0% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgb(136, 154, 183);
        stroke-dashoffset: 25%;
        stroke-dasharray: 0 50%;
        stroke-width: 0.2;
    }
    50% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(136, 154, 183);
        stroke-width: 0.5;
    }
    70% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgb(136, 154, 183);
        stroke-width: 1;
    }
    90%,
    100% {
        fill: rgb(202, 216, 230);
        stroke: rgba(54, 95, 160, 0);
        stroke-dashoffset: -25%;
        stroke-dasharray: 50% 0;
        stroke-width: 0;
    }
  }

</style>
