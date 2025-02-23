<template>
<div ref="container" class="main">
  <ParticleSystem />
  <div class="header">
    <a href="#">LOGIN</a>
    <a href="#">ABOUT</a>
  </div>

    <div class="svgContainer">
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
  import * as THREE from 'three'
  import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
  import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
  import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
  import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
  import ParticleSystem from "@/components/ParticleSystem.vue";
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
      tDtest() {
    // 初始化 Three.js 场景
    const scene = new THREE.Scene();
    const camera = this.createCamera();
    const renderer = this.createRenderer();
    this.$refs.threeContainer.appendChild(renderer.domElement);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 加载 3D 模型并创建粒子系统
    this.loadModel(scene, camera, renderer);

    // 初始化后处理效果
    this.setupPostProcessing(scene, camera, renderer);
  },

  createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 0, 4);
    return camera;
  },

  createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  },

  loadModel(scene, camera, renderer) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/ball.mtl', (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('/ball.obj', (object) => {
        this.createParticleSystem(scene, object, renderer, camera);
      });
    });
  },

  createParticleSystem(scene, object, renderer, camera) {
    const geometry = object.children[0].geometry;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = geometry.attributes.position.array;
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.01,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    this.startAnimation(scene, camera, renderer, particles);
  },

  startAnimation(scene, camera, renderer, particles) {
    const animate = () => {
      requestAnimationFrame(animate);

      if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    };
    animate();
  },

  setupPostProcessing(scene, camera, renderer) {
    // 创建 EffectComposer
    const composer = new EffectComposer(renderer);

    // 添加 RenderPass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // 添加模糊效果
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    composer.addPass(bloomPass);

    // 替换 renderer.render 调用
    const animate = () => {
      requestAnimationFrame(animate);

      composer.render();
    };
    animate();
  },

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
    created(){                  //页面初始化钩子函数
        this.getcaptchaImg();
    },
    mounted(){
      // this.tDtest()
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
      animation: stroke 5s forwards alternate;
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
