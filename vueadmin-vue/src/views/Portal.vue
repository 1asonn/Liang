<template>
<div ref="container" class="main">
  <ParticleSystem />
  <div class="header">
    <router-link class="router-link" to="/login">LOGIN</router-link>
    <router-link class="router-link" to="/about">ABOUT</router-link>
  </div>

    <div class="svgContainer" v-if="true">
      <TextAnimation :text="title"></TextAnimation>
    </div>  
</div>
</template>


<script>
  import request from 'axios'
  import ParticleSystem from "@/components/ParticleSystem.vue";
  import { RouterLink } from 'vue-router';
  import router from '@/router';
  import TextAnimation from '@/components/TextAnimation.vue'
  export default {
    components: {
      ParticleSystem,
      TextAnimation
    },
    data() {
      return {
        title:"Welcome to EIMS",
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
      top: 25%;
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

</style>
