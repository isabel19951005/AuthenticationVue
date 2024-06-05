import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Chain from '../views/Chain.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'

import UserLoginView from "@/views/user/UserLoginView.vue";
import store from "@/store";
import CrossDomainVerify from "@/views/CrossDomainVerify.vue";
import DataIdentityAuth from "@/views/DataIdentityAuth.vue";


Vue.use(VueRouter)
Vue.use(store)
const routes = [
    {
        path: "/login",
        name: "用户登录",
        component: UserLoginView,

    },

    {
        path:'/',
        component:Main,
        // redirect: '/home',
        children:[
            { path: 'home', name:'home', component: Home }, //首页
            {path: 'crossdomainverify', name:'crossdomainverify', component: CrossDomainVerify},
            { path: 'dataidentityauth', name: 'dataidentityauth', component: DataIdentityAuth },  // 新路由
            { path: 'user', name:'user', component: User },  //用户信息
            { path: 'chain', name:'chain', component: Chain} ,// 区块链信息
            { path: 'page1', name:'page1', component: PageOne}, // 区块链信息
            { path: 'page2', name:'page2', component: PageTwo} // 区块链信息
        ],

    },

  ]



const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    let user = store.state.user.user;
    const loggedIn = user && user.username  && user.username.trim() !== '';

    console.log('Navigating to:', to.path);
    console.log('User state:', user);
    console.log('Is logged in:', loggedIn);
    console.log('n user:', !user);
    console.log('n user.username:', !user.username);
    console.log('n logged in:', !loggedIn);

    if (!loggedIn && to.path !== '/login') {
        next('/login');
    } else if (loggedIn && to.path === '/login') {
        next('/home');
    } else {
        next();
    }
});


export default router