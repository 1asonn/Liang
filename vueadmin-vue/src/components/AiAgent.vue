<template>
  <el-popover
    placement="right"
    width="400"
    trigger="click">
    <div class="chat-box">
      <div class="messages">
        <!-- 聊天消息列表 -->
        <div
          v-for="message in messages"
          :key="message.id"
          :class="{'message-user': message.role === 'user', 'message-assistant': message.role === 'assistant'}"
        >
          <p>{{ message.text }}<span v-if="message.loading" class="loading-indicator"></span></p>
        </div>
      </div>
      <div class="input-area">
        <!-- 输入框 -->
        <el-input
          v-model="inputMessage"
          placeholder="输入消息"
          @keyup.enter.native="sendMessage"
        />
        <!-- 发送按钮 -->
        <el-button type="primary" @click="sendMessage" :disabled="isButtonDisabled">发送</el-button>
      </div>
    </div>
    <el-button slot="reference">聊天</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      inputMessage: '',
      apiKey: '4U6PWmOxJJpPjf56zZ0I22P7EKKnWzO9qvCrfTpxStmYntIllBCQ5hHALi6EOmCIB',
      generateData: '',
      displayQueue: [], // 用于管理待显示的字符,
      isResponse:false

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
    // console.log("页面刷新!!!!");
    // console.log("历史消息", localStorage.getItem('chatHistory'));
    // console.log("对话变量", this.messages);
  },

  methods: {
  sendMessage() {
    

    if(this.isResponse || !this.inputMessage){   //当前正在回复消息 不允许用户再次进行请求
      // alert('Be patient~')
      return
    }

    this.isResponse = true
    let message = this.inputMessage;
    this.messages.push({ role: 'user', text: message, loading: false });
    this.inputMessage = '';
    const requestBody = {
      model: 'step-1-8k',
      stream: true,
      messages: [
        {
          role: 'system',
          content: '你是由阶跃星辰提供的AI聊天助手，你擅长中文，英文，以及多种其他语言的对话。在保证用户数据安全的前提下，你能对用户的问题和请求，作出快速和精准的回答。同时，你的回答和建议应该拒绝黄赌毒，暴力恐怖主义的内容。',
        },
        {
          role: 'user',
          content: message,
        }
      ],
    };

    fetch('https://api.stepfun.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(requestBody)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (!response.body) {
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const processTextStream = ({ done, value }) => {
        if (done) {
          console.log("Stream complete!");
          this.generateData = ''; // 重置流式输出内容
          this.processQueue(); // 确保队列中的剩余字符被处理
          this.messages[this.messages.length - 1].loading = false; // 结束加载状态
          this.isResponse = false
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.trim()) {
            try {
              const jsonLine = line.startsWith("data: ") ? line.slice(6) : line; // 处理成可进行解析的 JSON 格式数据
              if (jsonLine.trim() !== "[DONE]") {
                const data = JSON.parse(jsonLine);
                this.enqueueText(data.choices[0].delta.content || ''); // 将内容加入队列
              }
            } catch (parseError) {
              console.error("Error parsing JSON", parseError);
            }
          }
        }

        return reader.read().then(processTextStream);
      };

      this.messages.push({ role: 'assistant', text: '', loading: true }); // 给即将读取的回复预留位置，以便后续流式输出进行内容填充
      this.displayQueue = []; // 初始化队列
      return reader.read().then(processTextStream);
    })
    .catch((error) => {
      console.error("Error", error);
      this.messages[this.messages.length - 1].loading = false; // 确保加载状态结束
      this.messages[this.messages.length - 1].text = "消息发送失败，请检查网络或重试。"; // 提示用户
      this.isResponse = false;
    });
  },

  enqueueText(content) {
    // 将新内容逐字加入队列
    for (const char of content) {
      this.displayQueue.push(char);
    }
    this.processQueue(); // 开始处理队列
  },

  processQueue() {
    console.log("Queue",this.displayQueue)
    if (this.displayQueue.length === 0) {
      this.$store.commit('setchatHistory', this.messages);
      return
    }

    const char = this.displayQueue.shift(); // 从队列中取出一个字符
    this.messages[this.messages.length - 1].text += char; // 将字符添加到消息中
    

    // 使用 requestAnimationFrame 确保逐帧显示
    requestAnimationFrame(() => {
      requestAnimationFrame(this.processQueue);
    });
    // setTimeout(() => {
    //   this.processQueue();
    // }, 
    // 1000);

  }
}
};
</script>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 300px;
}
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
  overscroll-behavior: contain;
}

.message {
  margin-bottom: 10px;
}
.input-area {
  display: flex;
  padding: 0px;
}

.message-user {
  text-align: right;
}

.message-assistant {
  text-align: left;
}

.message-user p {
  background-color: #e1ffc8; /* 用户消息的背景颜色 */
  border-radius: 5px;
  padding: 5px 10px;
  display: inline-block;
  max-width: 70%; /* 限制消息宽度 */
  margin: 5px 0;
}

.message-assistant p {
  background-color: #c8e1ff; /* 助手消息的背景颜色 */
  border-radius: 5px;
  padding: 5px 10px;
  display: inline-block;
  max-width: 70%; /* 限制消息宽度 */
  margin: 5px 0;
}

.loading-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color:black;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>