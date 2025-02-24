import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import axios from '../axios.js'

//解决多次点击重复跳转
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {

  return originalPush.call(this, location).catch(err => err)

}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index.vue')
      },
      {
        path: '/userCenter',
        name: 'userCenter',
        component: () => import('../views/userCenter.vue')
      }
    ]
  },
  {
    path: '/Portal',
    name: 'Portal',
    component: () => import('../views/Portal.vue')  //懒加载
  },
  {
    path:'/Login',
    name:'login',
    component: () => import('../views/Login.vue')  
  },
  {
    path:'/about',
    name:'about',
    component: () => import('../views/about.vue')  
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {

  let hasRoute = store.state.menu.hasRoutes

  //检查是否已经获得路由授权
  if(!hasRoute){
    axios.get('/sys/menu/nav').then(res => {

      store.commit('setMenuList',res.data.data.nav)
  
      store.commit('setPermitList',res.data.data.authoritys)
  
  
      /* 尽管 newRoutes 和 router.options.routes 指向同一个数组，
      但直接修改这个数组并不会触发 Vue Router 内部状态的更新。
      Vue Router 维护了一个内部的路由记录列表，这个列表在初始化时根据 routes 数组创建，
      并且不会自动同步后续对 routes 数组的修改。 */
      let newRoutes = router.options.routes
      
  
      res.data.data.nav.forEach(menu =>{
        if(menu.children){
          menu.children.forEach(child =>{
  
            //将菜单配置列表转换为路由数据类型
            let route = Menu2Routes(child)
  
            //将路由添加到路由管理器中
            if(route){
              newRoutes[0].children.push(route)
            }
  
          })
        }
        })
  
        /* 刷新路由 */
        // router.addRoutes(newRoutes)  该方法已弃用 
      
        newRoutes.forEach(route => {
          router.addRoute(route);
        });
    
    })
    hasRoute = true
    store.commit("changeRouteStatus",hasRoute)
  }

  next()

})




const Menu2Routes = (menu) => {
  if(!menu.component){
    return null
  }

  let route = {
    name : menu.name,
    path : menu.path,
    meta :{
      title : menu.title,
      icon : menu.icon
    }
  }
  
  /* 动态导入组件 */
  // route.component = () => import(`@/views/${menu.component}.vue`)
  route.component = () => import('@/views/' + menu.component +'.vue')
  console.log("comp",route)
  return route
}

export default router
