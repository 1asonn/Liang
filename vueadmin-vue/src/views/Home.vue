<template>
    <el-container>
    <el-aside width="205px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <h3>医院信息管理系统</h3>
        <div class="header_userMenu">
            <el-avatar  size="medium" :src=userInfo.avatar></el-avatar>
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">{{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/userCenter"><el-dropdown-item >个人中心</el-dropdown-item></router-link> 
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-link :underline="false" href="https://bilibili.com" target="_blank">B站</el-link> -->
        </div>
      </el-header>
      
      <el-main>
        <Tabs></Tabs>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
  import SideMenu from "./inc/SideMenu.vue"
  import Tabs from "./inc/Tabs.vue"
  export default{
      name:"Home",
      components:{
        SideMenu,
        Tabs
      },
      data(){
        return{
            userInfo:{
                id:"",
                avatar:"",
                username:""
            }
        }
      },
      methods:{
        getUserInfo(){
            this.$axios.get("/sys/userInfo").then(res => {
                this.userInfo = res.data.data
            })
        },
        logout(){
            this.$axios.post("/logout").then(res => {
                localStorage.clear()
                sessionStorage.clear()

                this.$store.commit("resetState")
                this.$router.push("/login")
                
            })
        },
      },
      created(){
        this.getUserInfo()
      }
  }
</script>


<style scoped>
  .el-header {
    position: relative;
    display: flex;
    background-color: rgba(79, 55, 55, 0.338);
    color: #333;
    text-align: center;
    line-height: 60px;
    align-items: center;
    justify-content: center;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding:0px;
  }

  .el-container{
    height: 100vh;
  }

  .el-dropdown{
    cursor: pointer;
  }

  .h3{
    text-align: center;
  }

  .header_userMenu{
    display: flex;
    position: absolute;
    right: 10px;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .el-menu-vertical-demo{
    height: 100vh;
    text-align: left;
  }

a{
    text-decoration: none;
}

  
  
</style>
