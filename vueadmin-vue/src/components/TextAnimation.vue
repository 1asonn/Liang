<template>
    <svg viewBox="0 0 400 200">
        <text 
            x="50%" 
            y="50%" 
            text-anchor="middle" 
            dominant-baseline="middle" 
            class="text"
        >
            {{text}} 
        </text>
    </svg> 
</template>

<script>
    export default{
        name: 'TextAnimation',
        props:{
            text: {
                type: String,
                default: 'Welcome to EIMS'
            }
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Bangers&family=Homemade+Apple&family=Sacramento&display=swap");
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
