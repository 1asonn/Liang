<template>
  <div>
    <div>this is the page of index!</div>
    <div class="AiAgent">
    </div>
  </div>
</template>

<script>
  import AiAgent from '../components/AiAgent.vue'

  export default{
      name:"Index",
      components:{
        AiAgent
      }
  }
</script>
 
<style scoped>
 .AiAgent {
    position:fixed;
    bottom: 10%;
    right: 10%;
  }
</style>
