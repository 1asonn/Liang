<template>
    <div ref="threeContainer" class="three-container"></div>
  </template>
  
  <script>
  import * as THREE from "three";
  import GetFlatGeometry from "@/utils/GetFlatGeometry.js";
  import g from "@/assets/gradient.png";
  
  export default {
    mounted() {
      this.initThree();
    },
    methods: {
      initThree() {
        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.FogExp2(328972, 0.001)
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
          85,
          window.innerWidth / window.innerHeight,
          0.1,
          1400
        );
        camera.position.set(110, 200, 600);
        camera.lookAt(new THREE.Vector3(0,0,0)); // 固定相机朝向
        
        // const axesHelper = new THREE.AxesHelper(500)
        // scene.add(axesHelper)
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = true
        renderer.setClearColor(scene.fog.color)
        
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.$refs.threeContainer.appendChild(renderer.domElement);
  
        // 添加粒子系统
        const particles = GetFlatGeometry();
        scene.add(particles);
  
        // 添加环境光
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
  
        // 添加点光源
        const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
        pointLight.position.set(500, 500, 500);
        scene.add(pointLight);
  
        // 动画循环
        let time = 0;
        const animate = () => {
          requestAnimationFrame(animate);
  
          // 更新波浪效果
          const positions = particles.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const z = positions[i + 2];
            positions[i + 1] = Math.sin((x + time) * 0.5) * 50 + Math.cos((z + time) * 0.5) * 50;
          }
          particles.geometry.attributes.position.needsUpdate = true;
  
          // 渲染场景
          renderer.render(scene, camera);
          time += 0.01; // 控制波浪的动态变化速度
        };
        animate();
  
        // 响应窗口大小调整
        window.addEventListener("resize", () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .three-container {
    width: 100%;
    height: 100vh;
  }
  </style>