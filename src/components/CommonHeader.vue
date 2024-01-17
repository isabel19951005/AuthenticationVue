<template>
    <div class="header-container">
        <div class="l-content">
           <el-button style ="margin-right: 20px" @click="handleMenu" icon="el-icon-menu" size = "mini"></el-button>
          <h1>欢迎使用!</h1>
         <!-- <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in tags" :key ="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb> -->
        </div>
        <div class="r-content">
            
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class = "user" src="../assets/data/BKNdata/Systemdata/Bdomain/photo/adminB.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class ="text2">AdminB</span>
        </div>
    </div>

</template>
    <script>
   // import  { mapState } from 'vuex'
    export default{
        data(){
            return{}
        },
        methods:{
            handleMenu(){
                this.$store.commit('collapseMenu')
            }
        }
   /*     computed:{
          ...mapState({
              tags: state => state.tab.tabsList
               })
        }*/
    }
    </script>
<style lang="less" scoped>
    .header-container{
        padding:0px 20px;
        background-color: #333;
        height: 48px;
        display: flex;
        justify-content:space-between;
        align-items: center;

        .r-content{
            display: flex;
            align-items: center;
            .user{
                width:40px;
                height:40px;
                border-radius: 50%;
            }
           
        }


      .l-content{
        display: flex;
        align-items: center;
        h1{
          font-size: 16px;
          color: #fff;
        }

      /*  /deep/.el-breadcrumb__item{
          .el-breadcrumb__inner{
            font-weight:normal;
            &.is-link{
              color: #666
            }
          }
          &:last-child{
            .el-breadcrumb__inner {
              color: #fff
            }
          }
        }
        */

      }
      .text2-container {
        display: flex;
        align-items: center;
      }
      .text2 {
        color: #fff;
        font-size: 16px;
        margin-left: 10px;
      }
    }


    
</style>