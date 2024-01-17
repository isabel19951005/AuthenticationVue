import http from '../utils/request'

//请求用户数据
export const getData = () => {
    //返回一个promise对象
    return http.get('/user/getData')
}

export const getUser = (params) => {
    //返回文件列表
    return http.get('/user/getUser', params)
}

export const getAdomain = (params) => {
    //返回文件列表
    return http.get('/page1/getAdomain', params)
}

export const getBdomain = (params) => {
    //返回文件列表
    return http.get('/page2/getBdomain', params)
}

export const getBKL = (params) => {
    //返回文件列表
    return http.get('/chain/getBKL', params)
}
export const addFile = (data) => {
    //返回用户列表
    return http.post('/user/add', data)
}

export const editFile = (data) => {
    //返回用户列表
    return http.post('/user/edit', data)
}

export const pubFile = (data) => {
    //返回用户列表
    return http.post('/user/pub', data)
}

export const delFile = (data) => {
    //返回用户列表
    return http.post('/user/del', data)
}

export const dlAdata = (data) => {
    //返回用户列表
    return http.post('/page1/dlAdata', data)
}

export const dlBdata = (data) => {
    //返回用户列表
    return http.post('/page2/dlBdata', data)
}