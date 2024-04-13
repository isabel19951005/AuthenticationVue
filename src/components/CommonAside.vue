<template>
        <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo"
         @open="handleOpen" 
         @close="handleClose" 
         :collapse="isCollapse"
         background-color="#FFFFFF"
        active-text-color="#409EFF">

         <h3>{{isCollapse?'后台':'跨域身份认证系统'}}</h3>
          <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>
          <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
              <template slot="title">
                  <i :class="`el-icon-${item.icon}`"></i>
                  <span slot="title">{{ item.label }}</span>
              </template>
              <el-menu-item-group  v-for="subItem in item.children" :key="subItem.path">
                  <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <h4>@对对对队</h4>
       </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100dvh;
    h3 {
        font-size: 16px;
        font-family: "Microsoft YaHei", sans-serif;
        font-weight: 700;
        text-align: center;
        line-height: 48px;
    }
    h4 {
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
        position: absolute; 
        bottom: 0; 
        width: 100%; 
    }

  }
</style>

<script>
import { FormItem } from 'element-ui';

  export default {
    data() {
      return {
        menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/user",
          name: "user",
          label: "用户信息",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          path: "/chain",
          name: "chain",
          label: "主链信息",
          icon: "s-order",
          url: "ChainManage/ChainManage",
        },
        {
          label: "域信息",
          icon: "folder",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "A域",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "B域",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        console.log(item)
        if(this.$route.path !== item.path && !((this.$route.path === '/home') && (item.path === '/' ))){
        this.$router.push(item.path)
        }
        this.$store.commit('selectMenu',item)

      }
    },
    computed:{
        //没有子菜单
        noChildren(){
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        hasChildren(){
            return this.menuData.filter(item => item.children)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    }
    
  }
</script>
<style lang="less" scoped>
.el-menu{
  border-right: none
}
</style>