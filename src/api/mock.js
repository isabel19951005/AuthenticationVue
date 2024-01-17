import Mock from 'mockjs'
import home from './mockServeData/home'
import user from './mockServeData/user'
//定义mock请求拦截
Mock.mock('/api/user/getData', home.getStatisticalData)
//获取列表
Mock.mock('/api/user/getUser', user.getUserList)

//用户文件列表的数据操作
Mock.mock('/api/user/add', 'post', user.createFile)
Mock.mock('/api/user/edit', 'post', user.updateFile)
Mock.mock('/api/user/pub', 'post', user.publicFile)
Mock.mock('/api/user/del', 'post', user.deleteFile)

//A域信息操作
Mock.mock('/api/page1/getAdomain', user.getAdomainList)
Mock.mock('/api/page1/dlAdata', 'post', user.downloadFile)

//B域信息操作
Mock.mock('/api/page2/getBdomain', user.getBdomainList)
Mock.mock('/api/page2/dlBdata', 'post', user.downloadFile)

//主链获取数据
Mock.mock('/api/chain/getBKL', user.getBKList)


