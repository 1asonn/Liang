<template>
    <div class="container">
    <!-- 尾线 -->
    <svg class="g-svg" width="400" height="160" xmlns="http://www.w3.org/2000/svg">
      <path id="svgpath" d="M 350 40 C 1200 1000, -550 1000, 350 1960" stroke="black" fill="transparent" />
    </svg>
    <!-- 箭头 -->
    <div class="tra"></div>
    <div class="point point1"></div>
    <div class="point point2"></div>
    <div class="point point3"></div>
    <p class="p1">欢迎来到AIA信息智慧管理平台</p>
    <p class="p2">欢迎来到AIA信息智慧管理平台欢迎来到智慧管理平台欢迎来到AIA信息智AIA信息智慧管理平台</p>
    <p class="p3">欢迎来到AIA信息智慧管理平台</p>
    <h2 class="title">Welcome to AIA Intelligent Information Management Platform!</h2>
  </div>
</template>

<script>
</script>

<style scoped>

    h2 {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 100px;
    font-size: 42px;
    color: #fff;
    }
    
  .g-svg {
    position: absolute;
    top: 0;
    left: 50%;
    width: 700px;
    height: 2000px;
    transform: translate(-50%, 0);
  }

  #svgpath {
    stroke: #ff5722;
    stroke-width: 2px;
    /* 第一部分为实线长度 第二部分为虚线长度 */
    stroke-dasharray: 2222,2222;
    animation: lineMove 3s linear;
    animation-timeline: scroll();
  }

  @keyframes lineMove {
    /* 初始状态为实线刚好结束，将要进入虚线的状态 */
      0% {
          stroke-dashoffset: 2222;
      }
      /* 将实线拖出来 */
      100% {
          stroke-dashoffset: 0;
      }
  }
  
  .tra {
    position: absolute;
    width: 40px;
    height: 40px;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    offset-path: path("M 350 40 C 1200 1000, -550 1000, 350 1960");
    background: linear-gradient(270deg, #673AB7, #FF5722);
    animation: move 1s linear;
    animation-timeline: scroll();
    z-index: 10;
  }

    .container{
      position: absolute;
      top: 0;
      left: 50%;
      width: 700px;
      height: 2000px;
      transform: translate(-50%, 0);
    }

    .container::before{ 
      content: "";
      position: absolute;
      inset: 0 -30vw;
      background: linear-gradient(#000, purple);
    }
    
    .point{
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ff5722;
      opacity: 0;
      animation: show 1s linear forwards;
      animation-timeline: scroll();
    }

    .point::before,
    .point::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, .5);
      animation: circleScale 2s infinite ease-in;
      z-index: -1;
    }
    .point::after {
        animation-delay: -.5s;
    }
    
    .point1{
      top: 510px;
      left: 570px;
      animation-range: 150px 200px;
    }

    .point2 {
      top: 910px;
      left: 370px;
      animation-range: 400px 450px;
    }

    .point3 {
      top: 1410px;
      left: 66px;
      animation-range: 650px 700px;
    }

    p{
      position: absolute;
      top: 0;
      left: 0;
      width: 50vw;
      font-size: 24px;
      padding: 16px;
      text-align: justify;
      font-style: italic;
      color: #fff;
      opacity: 0;
      border: 4px dashed #fff;
      /* forwards ---> 设置动画结束后停留在最后一帧 */
      animation: textshow 1s linear forwards;  
      animation-timeline: scroll();
    }

    .p1{
      --x:-500px;
      top: 410px;
      left: 60px;
      width: 400px;
      animation-range: 150px 200px;
    }

    .p2{
      --x:-150px;
      width:600px;
      top: 840px;
      left: 300px;
      animation-range: 350px 450px;
    }

    .p2::before {
    content: "";
    float: left;
    width: 240px;
    height: 200px;
    shape-outside: polygon(80% 0, 90% 0, 0 90%, 0 80%);
    }

    .p3{
      --x:-500px;
      top: 1310px;
      left: 190px;
      width: 450px;
      animation-range: 650px 700px;
    }


  @keyframes textshow {
    0%{
      transform: translate(var(--x),0);
      opacity: 0;
    }
    100%{
      transform: translate(0,0);
      opacity: 1;
    }
  }

  @keyframes move{
    0%{
      offset-distance: 0%;
    }
    50% {
        transform: scale(2.5);
    }
    100%{
      offset-distance: 100%;
    }
  }

  @keyframes circleScale {
    80%,
    100% {
        transform: scale(4);
        opacity: .1;
    }
  }

  @keyframes show {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
    
  }
</style>