<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view/>
  </div>
</template>



<script>
  export default {
    name:'App',
    watch:{
      /* 页面刷新后保持选中的标签页 */
      $route(to,from){
        if(to.path !='/login'){
          let obj = {
            name  : to.name,
            title : to.meta.title
          }

          this.$store.commit("addTab",obj)
        }
      }

    }
  }
</script>



<style>

body,html{
  height: 100%;
  width: 100%;
  margin:0;
}

p{
  font-size: 14px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
