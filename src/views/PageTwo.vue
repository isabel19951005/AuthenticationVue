<template>
  <div>
    <div style="text-align: center;  font-size: 19px;height: auto; margin-bottom: 20px;">B域文件</div>
    <el-card style="height: 640px; width: 90%;margin-left: 60px;">
      <div class = "manage">
        <div style="display: flex; justify-content: flex-end; align-items: center;">
          <el-form :inline="true" :model="userForm">
            <el-form-item>
              <el-input placeholder="请输入文件名" v-model="userForm.filename" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 510px; overflow-y: auto;position: relative;">
          <el-table
              stripe
              :data="tableData2"
              style="width: 100%">
            <el-table-column
                prop="domain"
                label="域名">
            </el-table-column>
            <el-table-column
                prop="filename"
                label="文件名">
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
                label="内容">
              <template #default="scope1">
                <el-button size="mini" @click="handleEdit(scope1.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column
                prop="category"
                label="分类">
              <template #default="scope2">
                <el-button type="danger" size="mini" @click="handleDown(scope2.row)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="position: absolute;right: 100px;">
          <el-pagination
              layout="prev, pager, next"
              :total="total"
              @current-change="handlePage">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>

import {dlBdata, getBdomain} from '@/api'
export default{
  data(){
    return{
      userForm:{
        filename:''
      },
      total: 0,
      pageData:{
        page:1,
        limit:10
      },
      tableData2:[],
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
    }
  },
  mounted() {
    //获取列表中的数据
    getBdomain().then(({data}) =>{
      //console.log(data)
      this.tableData2= data.list
    })
    this.getList()
  },
  methods:{
    handleEdit(row){
      this.$alert(row.content, '内容', {
        confirmButtonText: '关闭',
      });
    },
    handleDown(row){
      this.$confirm('此操作将下载该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dlBdata(JSON.stringify(row)).then(() => {
          this.$message({
            type: 'success',
            message: '下载成功!'
          });
          //重新获取列表接口
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        });
      });
    },
    //获取列表中的数据
    getList(){
      getBdomain({params: {...this.userForm,...this.pageData}}).then(({data}) =>{
        //console.log(data)
        this.tableData2 = data.list
        this.total=data.count || 0
      })
    },
    //页码回调
    handlePage(val){
      //console.log(val,"val")
      this.pageData.page=val
      this.getList()
    },
    //列表搜索
    onSubmit(){
      this.getList()
    }
  }
}
</script>