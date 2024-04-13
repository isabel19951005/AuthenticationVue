<template>
    <div>
        <el-container>
        <el-aside width="auto">
            <common-aside />
        </el-aside>
        <el-container>
            <el-header style="height: 50px;">
                <common-header />
            </el-header>
                <common-tag class="custom-main" />
            <el-main class="custom-main">
                <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
        
       
    </div>
    </template>
    <script>
    import CommonAside from '../components/CommonAside.vue'
    import CommonHeader from '../components/CommonHeader.vue'
    import CommonTag from "../components/CommonTag.vue"
    export default{
        data(){
            return{}
        },
        components:{
            CommonAside,
            CommonHeader,
            CommonTag
        }
    }
    </script>
    <style scoped>
    .el-header{
        padding:0
    }
    .custom-main {
      background-color: #f8f8f8;
    }

    </style>