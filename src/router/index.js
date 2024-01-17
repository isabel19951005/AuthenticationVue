import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Chain from '../views/Chain.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        component:Main,
        redirect: '/home',
        children:[
            { path: 'home', name:'home', component: Home }, //首页
            { path: 'user', name:'user', component: User },  //用户信息
            { path: 'chain', name:'chain', component: Chain} ,// 区块链信息
            { path: 'page1', name:'page1', component: PageOne}, // 区块链信息
            { path: 'page2', name:'page2', component: PageTwo} // 区块链信息
        ]
    }
  ]

 const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })

export default router