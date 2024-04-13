<template>
  <div>
    <el-row>
      <div style="text-align: center;  font-size: 19px;height: auto; margin-bottom: 20px;">主链数据</div>
      <el-col :span="10">
        <div style="font-size: 19px;height: auto; text-align: center; margin-bottom: 20px;">黑名单</div>
            <el-card style="display: flex; justify-content: center;height: auto; width:70%;margin-left: 50px;">
              <div>
                <div>
                  <el-table
                      stripe
                      :data="bkData"
                      style="width: 100%;">
                    <el-table-column
                        prop="domain"
                        label="域名">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-card>
      </el-col>
      <el-col :span="14">
        <div style="font-size: 19px;height: auto; text-align: center; margin-bottom: 20px;">白名单</div>
            <el-card style="display: flex; justify-content: center;height: 540px; width:80%;margin-left: 100px;">
              <div class = "manage">
                <div class ="manage-header">
                  <div style="height: 480px; overflow-y: auto;position:relative;">
                  <el-table
                      stripe
                      :data="tableData2"
                      style="width: 500px; padding:0 0;">
                    <el-table-column
                        prop="domain"
                      label="域名">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        prop="revoke"
                        label="撤销">
                      <template #default="scope1">
                        <el-button size="mini" @click="handleRevoke(scope1.row)">撤销</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="forbid"
                        label="禁用">
                      <template #default="scope2" >
                        <el-button type="danger" size="mini" @click="handleForbid(scope2.row)">禁用</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  </div>
                  <div style="position: absolute;bottom:0;right: 80px;">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        @current-change="handlePage">
                    </el-pagination>
                  </div>
                </div>
              </div>
        </el-card>
      </el-col>
      </el-row>
   </div>
</template>
<script>
import {getData, getBKL} from '@/api'
export default{
  data(){
    return{
      total: 0,
      pageData:{
        page:1,
        limit:10
      },
      bkData:[],
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
    getData().then(({data}) => {
      //console.log(data)
      const { bkData } = data.data
      // console.log(tableData)
      this.bkData=bkData
    })
    getBKL({params: this.pageData}).then(({data}) =>{
      //console.log(data)
      this.tableData2= data.list
    })
    this.getList()
  },
  methods:{
    getList(){
      //获取列表中的数据
      getBKL({params: this.pageData}).then(({data}) =>{
        //console.log(data)
        this.tableData2= data.list
        this.total=data.count || 0
      })},
    //页码回调
    handlePage(val){
      //console.log(val,"val")
      this.pageData.page=val
      this.getList()
    },
    handleRevoke(row){

    },
    handleForbid(row){

    }
  }
}
</script>