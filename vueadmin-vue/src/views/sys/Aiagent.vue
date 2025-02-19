<template>
    <div ref='container' class="main">
        <div ref="chatBox" class="chat-box">
                <!-- 消息列表 -->
                 <div v-for="(message,index) in messages"> 
                  
                    <div v-if="message.role === 'user'" class="message-user">{{ message.text }}</div>
                  
                    <div class="message-contaniner">
                      <div :ref="'response-' + index" v-if="message.role === 'assistant'" v-html="marked2html(message.text)" class="message-assistant"></div>
                      <div v-show="showCursor && message.role != 'user' && index === messages.length - 1" class="cursor"></div>
                    </div>
                 </div>
        </div>
        <div class="input-box">
            <el-input
                type="textarea"
                :rows="4"
                v-model="inputMessage"
                @input.native="handleChange"
                @keydown.native.enter="handleKeydown"
                placeholder="请在此输入您的内容"
                class="inputArea"
            />
            <div class="tool-box">
              <el-button type="primary" @click="sendMessage" :disabled="isButtonDisabled" class="button-send">发送</el-button>
              <button @click="tDtest()">test</button>
            </div>
        </div>
    </div>
</template>
  
  <script>
  import {marked} from 'marked'
  import * as THREE from 'three'
  import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
  import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
  
  function debounce(){
        let timerId
        return function(){
          clearTimeout(timerId)
          timerId = setTimeout(() => {
            console.log("Go!!!")
          },5000)
        }
      }
      

  export default {
    data() {
      return {
        messages: [],
        inputMessage: '',
        generateData:'',
        apiKey: '4U6PWmOxJJpPjf56zZ0I22P7EKKnWzO9qvCrfTpxStmYntIllBCQ5hHALi6EOmCIB',
        generateData: '',
        isResponse:false,
        showCursor:false,
        pos:{
          x:0,
          y:0
        }
  
      };
    },
    computed:{
      isButtonDisabled(){
        return this.isResponse || !this.inputMessage 
      }
    },
    mounted() {
      this.messages = localStorage.getItem('chatHistory') ? JSON.parse(localStorage.getItem('chatHistory')) : [];  //从缓存中取出用户历史消息列表
      if (this.messages.length > 50) {
        this.messages = this.messages.slice(-50); // 只保留最近的 50 条消息
      }
    },

    updated(){
      if(this.$refs[`response-${this.messages.length - 1}`][0] && this.showCursor){ 
        this.$nextTick(()=>this.updateCursor())
      }
      this.scrollChatBoxToBottom()
      console.log("refresh")
    },
  
    methods: {
      tDtest() {
        // 初始化 Three.js 场景
        const scene = new THREE.Scene();
        const camera = this.createCamera();
        const renderer = this.createRenderer();
        this.$refs.threeContainer.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {
        renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight);
        camera.aspect =this.$refs.container.clientWidth/ this.$refs.container.clientHeight;
        camera.updateProjectionMatrix();
        })
        
        // 添加环境光
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        // 添加点光源
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        
        // 加载 3D 模型并创建粒子系统
        this.loadModel(scene, camera, renderer);
      },

      createCamera() {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(4, 0, 4);
        return camera;
      },

      createRenderer() {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight);
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
          size: 0.001,
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


      demo(){
        console.log("Go!!!")
      },

      callDebunce:debounce(),

      test(dom){
        let NodeList = dom.childNodes
        for(let i = NodeList.length - 1 ; i >=  0; i--){
          const node = NodeList[i]
          if(node.nodeType === Node.TEXT_NODE && /\S/.test(node.nodeValue)){
            return node
          }else{
            if(NodeList[i].nodeType === Node.ELEMENT_NODE){
              const last =this.test(node)
              if(last){
                return last
              }
            }
          }
        }
        return null
      },

      //更新光标位置
      updateCursor(){
        const lastIndex = this.messages.length - 1
        const textNode = document.createTextNode('\u200b')
        const contentDom = this.$refs[`response-${lastIndex}`][0]
        const lastTextNode = this.test(contentDom)
        if(lastTextNode){
          lastTextNode.parentElement.appendChild(textNode)
        }else{
          contentDom.appendChild(textNode)
        }
        const domRect = contentDom.getBoundingClientRect()
        const range = document.createRange()
        range.setStart(textNode,0)
        range.setEnd(textNode,0)
        const rect = range.getBoundingClientRect()
        this.pos.x = rect.left - domRect.left
        this.pos.y = rect.top - domRect.top
        textNode.remove()
      },

      //markdown 转 html
      marked2html(data){
        return marked.parse(data)
      },

      handleKeydown(event) {
      // 检测是否按下 Shift + Enter
      if (event.shiftKey && event.key === 'Enter' ) {
        // 允许换行，不做任何处理
        return;
      }

      // 检测是否仅按下 Enter
      if (event.key === 'Enter' && !event.isComposing) {
        // 阻止默认换行行为
        event.preventDefault();
        // 触发表单提交
        this.sendMessage();
      }
      },

      async sendMessage() {
      
        if(this.isResponse || !this.inputMessage){   //当前正在回复消息 不允许用户再次进行请求
          // alert('Be patient~')
          return
        }
        
        this.showCursor = true
        let message = this.inputMessage;
        this.messages.push({ role: 'user', text: message, loading: false});
        this.inputMessage = '';

        const requestBody = {
          model: 'step-1-8k',
          stream: true,
          messages: [
            {
              role: 'system',
              content: '你是由阶跃星辰提供的AI聊天助手，你擅长中文，英文，以及多种其他语言的对话。你的输出内容格式应为markdown。在保证用户数据安全的前提下，你能对用户的问题和请求，作出快速和精准的回答。同时，你的回答和建议应该拒绝黄赌毒，暴力恐怖主义的内容。',
            },
            {
              role: 'user',
              content: message,
            }
          ],
        };
        this.messages.push({ role: 'assistant', text: '\u200b', loading: true }); // 给即将读取的回复预留位置，以便后续流式输出进行内容填充
        //调用api获取回答
        try{
          const resp = await fetch('https://api.stepfun.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify(requestBody)
          })

        const reader = resp.body.getReader()
        const decoder = new TextDecoder()
        //接收流式数据
        while(1){
          const {done,value} = await reader.read()
          if(done){
            this.isResponse = false;
            this.generateData = ''
            this.$store.commit('setchatHistory',this.messages)
            this.showCursor = false
            break;
          }

          const str =decoder.decode(value)
          const lines = str.split('\n')
          for (const line of lines){
            if(line){
              const jsonLine = line.replace(/^data: /, '');
              if (jsonLine.trim() !== "[DONE]") {
                const data = JSON.parse(jsonLine);
                //实现打字机效果
                await this.typeWriterEffect(data.choices[0].delta.content,100)
              }
            }
          }

        }
        }catch(error){
          console.error('Fetch error:', error);
        }
      },

      //容器自动下滚
      scrollChatBoxToBottom() {
        const chatBox = this.$refs.chatBox;
        chatBox.scrollTop = chatBox.scrollHeight;
      },

      //处理用户输入框高度动态变化
      handleChange(e){
      const textarea = e.target
      textarea.style.height = 'auto'
      if(textarea.scrollHeight > 400){
        textarea.style.height = 400 + 'px'
      }else{
        textarea.style.height = textarea.scrollHeight + 'px'
      }
      },

      //模拟打字机效果
      async typeWriterEffect(content,speed){
        for (let i =0; i < content.length; i++){
          await new Promise(resolve => setTimeout(resolve, speed))
          this.messages[this.messages.length - 1].text += content[i]
        }
      },

      handleScroll(){
        const chatbox = this.$refs.chatBox
        if(chatbox.scrollTop = chatBox.scrollHeight){
          console.log("bottom!")
        }
      }   
  }};
  </script>
  
  
  <style scoped>

  html, body {
    overflow: hidden !important;
  }

  .main{
    position: relative;
    height: 80vh;
    overflow-y: hidden;
  }
  
  .three-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 防止遮挡页面交互 */
  }

  .chat-box {
    display: flex;
    flex-direction: column;
    height: 80%;
    overflow-y: scroll;
    padding: 5% 5%;
    box-sizing: border-box;
  }

  .input-box /deep/ .el-textarea__inner{
    border-radius: 10px ;
  }
  .input-box {
    position: absolute;
    bottom: 0;
    left: 5%;
    border-radius: 10px ;
    height:auto;
    width:90%;
  }

  .inputArea{
    border-radius: 10px ;
    height:100%;
    width:100%;
  }

  .tool-box{
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
  
  
  .button-send {
    position: relative;

  }

  .message-user {
    float: right;
  }
  
  .message-assistant {
    float: left;
  }
  
  .message-user {
    position: relative;
    background-color: #e1ffc8; /* 用户消息的背景颜色 */
    border-radius: 10px;
    padding: 10px 10px;
    max-width: 70%; /* 限制消息宽度 */
    text-align: right;
    font-size: 14px;
    height: auto;
  }
  
  .message-assistant  {
    background-color: #c8e1ff; /* 助手消息的背景颜色 */
    border-radius: 10px;
    padding: 0px 10px;
    width: 60%; /* 限制消息宽度 */
    text-align: left;
  }
  
  .message-contaniner{
    position: relative;
    display: flex;
    align-items: center;
  }

  .cursor{
    content: '';
    position: absolute;
    width: 10px;
    height: 16px;
    background: black;
    animation: toggle 0.6s infinite;
    opacity: 0;
    /* transform: translateY(2px); */
    left :calc(v-bind('pos.x')*1px);
    top: calc(v-bind('pos.y')*1px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes toggle{
    30%{
      opacity: 1;
    }
  }

  </style>