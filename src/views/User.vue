<template>
    <el-row>
        <el-col :span="7" style="padding-right: 10px">
            <el-card class="box-card">
                <div class = "user">
                    <img class = "user" src="../assets/data/BKNdata/Systemdata/Bdomain/photo/adminB.jpg" alt="">
                    <div class ="userinfo">
                        <p class="name">AdminB</p>
                    </div>
                </div>
                <div class = "login-info">
                    <p >域名:<span>B域</span></p>
                    <p >GID:<span>****************</span></p>
                    <p >金币:<span>10000</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height:auto;">
                <el-table  :data="tableData" style="width: 100%">
                <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val"/>
                </el-table>
            </el-card>
        <div class="grid-content bg-purple"></div></el-col>
        <el-col :span="17" style="padding-left: 5px">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex', padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
                    <div class=" detail">
                        <p class="price">{{ item.value }}次</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
          <el-card style="height: auto;">
            <div style="text-align: center;  font-size: 19px;height: auto">本地文件</div>
            <div class = "manage">
              <el-dialog
                  title="文件"
                  :visible.sync="dialogVisible"
                  width="50%"
                  :before-close="handleClose">
                <!--文件信息-->
                <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="用户名" prop="username">
                      <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="域名" prop="domain">
                      <el-select v-model="form.domain" placeholder="请选择域名">
                        <el-option label="A域" value="A域"></el-option>
                        <el-option label="B域" value="B域"></el-option>
                      </el-select>
                    </el-form-item>
                  <el-form-item label="文件名" prop="filename">
                    <el-input placeholder="请输入文件名" v-model="form.filename"></el-input>
                  </el-form-item>
                  <el-form-item label="分类" prop="category">
                    <el-select v-model="form.category" placeholder="请选择文件类别">
                      <el-option label="文学" value="文学"></el-option>
                      <el-option label="心理" value="心理"></el-option>
                      <el-option label="历史" value="历史"></el-option>
                      <el-option label="政治" value="政治"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="内容" prop="content">
                    <el-input placeholder="请输入文件内容" v-model="form.content" type="textarea" style="width: 260%;"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
              </el-dialog>
              <div class ="manage-header">
                <el-button @click="handleAdd" type="primary">
                  + 新增
                </el-button>
                <el-table
                    :data="tableData2"
                    style="width:200%;">
                  <el-table-column
                      prop="filename"
                      label="文件名">
                  </el-table-column>
                  <el-table-column
                      prop="domain"
                      label="域名">
                  </el-table-column>
                  <el-table-column
                      prop="username"
                      label="用户名">
                  </el-table-column>
                  <el-table-column
                      prop="category"
                      label="分类">
                  </el-table-column>
                  <el-table-column
                      prop="content"
                      label="内容" >
                    <template #default="scope1">
                      <el-button size="mini" @click="handleEdit(scope1.row)">查看</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="operate"
                      label="操作" >
                    <template #default="scope2" >
                      <el-button size="mini" @click="handlePub(scope2.row)">公开</el-button>
                      <el-button type="danger" size="mini" @click="handleDel(scope2.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-card>
        </el-col>
    </el-row>
</template>
<script>

import { getUser, addFile, editFile, pubFile, delFile } from '@/api'
import { getData } from '@/api'

export default{
        data(){
            return{
              tableData2:[],
              modelType: 0,//0表示新增，1表示查看
              dialogVisible: false,
              form:{
                  username:'',
                  domain:'',
                  filename:'',
                  category:'',
                  content:'',
              },
              rules:{
                username:[
                  { required: true, message: "请输入用户名"}
                ],
                domain:[
                  { required: true, message: "请选择域名"}
                ],
                filename:[
                  { required: true, message: "请输入文件"}
                ],
                category:[
                  { required: true, message: "请选择文件类别"}
                ],
                content:[
                  { required: true, message: "请输入文件内容"}
                ]
              },
                tableData: [],
                tableLabel:{
                    name:'分类',
                    todayDL:'今日下载',
                    monthDL:'本月下载',
                    totalDL:'总下载'
                },
                countData:[{
                    name:'今日下载次数',
                    value:'6000',
                    icon:'success',
                    color:'#2ec7c9'
          },{
            name:'本月下载次数',
                    value:'13000',
                    icon:'success',
                    color:'#2ec7c9'
          }, {
            name:'总下载次数',
                    value:'46000',
                    icon:'success',
                    color:'#2ec7c9'
          }]
            }
        },
        mounted() {
          getData().then(({data}) => {
            const { tableData } = data.data
           // console.log(tableData)
            this.tableData=tableData
          })
          this.getList()
         },
      methods:{

        //提交用户表单
        submit(){
          this.$refs.form.validate((valid)=>{
            //console.log(valid,'valid')
            if(valid){
              //console.log(this.form, 'form')
              //处理
                if(this.modelType === 0){
                  //新增文件
                   addFile(this.form).then(()=>{
                     //重新获取列表接口
                        this.getList()
                  })
                }else{
                  //查看文件
                  editFile(this.form).then(()=>{
                    //重新获取列表接口
                    this.getList()
                  })
                }
              //关闭弹窗
              this.$refs.form.resetFields()
              this.dialogVisible = false
            }
          })
        },
        //弹窗关闭时触发
        handleClose(){
          //console.log(this.$refs.form)
          this.$refs.form.resetFields()
          this.dialogVisible = false
        },
        cancel(){
          this.handleClose()
        },
        handleEdit(row){
            this.modelType = 1
            this.dialogVisible = true
            //对当前行数据进行深拷贝
            this.form = JSON.parse(JSON.stringify(row))
        },
        handlePub(row){
          this.$confirm('此操作将公开该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            pubFile(JSON.stringify(row)).then(()=>{
              this.$message({
                type: 'success',
                message: '公开成功!'
              });
            //重新获取列表接口
              this.getList()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消公开'
            });
          });
        },
        handleDel(row){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
                delFile({id: row.id}).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  //重新获取列表接口
                  this.getList()
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
          });
        },
        handleAdd(){
          this.modelType = 0
          this.dialogVisible = true
        },
        //获取列表中的数据
        getList(){
          getUser().then(({data}) =>{
            //console.log(data)
            this.tableData2= data.list
          })
        }

      }
    }
    </script>
 <style lang="less" scoped>


.user{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom:1px solid #ccc;
    img {
        margin-right: 40px;
        width:150px;
        height:150px;
        border-radius: 50%;
    }
    .userinfo{
        margin-bottom: 10px;
        font-size: 32px;
    }
}

.login-info{
    
    p {
       line-height:28px;
       font-size:14px;
       color:#999999;
       span{
        color:#666666;
        margin-left:60px;
       }
    }
}
.num{
    
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon{
        width: 80px;
        height: auto;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .detail{
        margin-left:10px;
        display:flex;
        flex-direction:column;
        justify-content: center;
    

        .price{
            font-size: 30px;
            margin-bottom: 8px;
            line-height: 30px;
            height: 15px;
        }
        .desc{
            font-size: 14px;
            color: #999;
            text-align: center;
        }
        
    }
    .el-card{
    width:32%;
    margin-bottom: 10px;
 }
}
</style>