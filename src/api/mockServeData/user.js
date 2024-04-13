import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}


let List1 = []
const count1 = 20

let List2 = []
const count2 = 200
const dList = ["A域", "B域"];
const cList = ["文学", "心理","历史", "政治"];
const fList =["红楼梦", "西游记", "三国演义", "水浒传"]
const mList  = ["下载地址：****",
                         "下载地址：-----",
                         "下载地址1：-----；下载地址2：******"];
for (let i = 0; i < count1; i++) {
    List1.push(
        Mock.mock({
            id: Mock.Random.guid(),
            username: Mock.Random.name(),
            filename:Mock.Random.pick(fList)  + Mock.Random.natural(1,200),
            domain: Mock.Random.pick(dList),
            category:Mock.Random.pick(cList),
            content: Mock.Random.pick(mList),
        })
    )
}


for (let i = 0; i < count2; i++) {
    List2.push(
        Mock.mock({
            id: Mock.Random.guid(),
            username: Mock.Random.name(),
            filename:Mock.Random.pick(fList)  + Mock.Random.natural(1,200),
            domain: Mock.Random.pick(dList),
            category:Mock.Random.pick(cList),
            content: Mock.Random.pick(mList),
        })
    )
}


export default {
    /**
     * 获取用户列表
     * 要带参数 filename, page, limit; filename可以不填, page,limit有默认值。
     * @return {{code: number, count: number, list: *[]}}
     * @param config
     */
    getUserList: config => {
        const { filename, page = 1, limit = 10} = param2Obj(config.url)
        console.log('filename:' + filename, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List1.filter(user => {
            return !(filename && user.filename.indexOf(filename) === -1);

        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },

    /**
     * 获取A域列表
     * 要带参数 filename, page, limit; filename可以不填, page,limit有默认值。
     * @return {{code: number, count: number, list: *[]}}
     * @param config
     */
    getAdomainList: config => {
        const { filename, page = 1, limit = 10 } = param2Obj(config.url)
        console.log('filename:' + filename, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List2.filter(user => {
            if (filename && user.filename.indexOf(filename) === -1) return false;
            return user.domain === "A域";
            
        });
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },

    /**
     * 获取B域列表
     * 要带参数 filename, page, limit; filename可以不填, page,limit有默认值。
     * @return {{code: number, count: number, list: *[]}}
     * @param config
     */
    getBdomainList: config => {
        const { filename, page = 1, limit = 10 } = param2Obj(config.url)
        console.log('filename:' + filename, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List2.filter(user => {
            if (filename && user.filename.indexOf(filename) === -1) return false;
            return user.domain === "B域";

        });
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },

    /**
     * 获取区块链白名单列表
     * 要带参数 filename, page, limit; filename可以不填, page,limit有默认值。
     * @return {{code: number, count: number, list: *[]}}
     * @param config
     */
    getBKList: config => {
        const { filename, page = 1, limit = 8 } = param2Obj(config.url)
        console.log('filename:' + filename, 'page:' + page, '分页大小limit:' + limit)
        const List = List1.concat(List2);
        const mockList = List.filter(user => {
            return !(filename && user.filename.indexOf(filename) === -1);

        });
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },



    /**
     * 增加文件
     * @return {{code: number, data: {message: string}}}
     * @param config
     */
    createFile: config => {
        const { username, domain, filename, category, content } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List1.unshift({
            id: Mock.Random.guid(),
            username: username,
            filename:filename,
            domain: domain,
            category:category,
            content:content,
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },

    /**
     * 修改文件
     * @return {{code: number, data: {message: string}}}
     * @param config
     */
    updateFile: config => {
        const { id, username, domain, filename, category, content } = JSON.parse(config.body)
        parseInt(username);
        parseInt(domain);
        parseInt(category);
        List1.some(u => {
            if (u.id === id) {
                u.filename = filename
                u.content = content
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '查看成功'
            }
        }
    },

    /**
     * 公开文件
     * @return {{code: number, data: {message: string}}}
     * @param config
     */
    publicFile: config => {
        const { id, username, domain, filename, category, content } = JSON.parse(config.body);

        const isDuplicate = List2.some(item => (
            item.id === id &&
            item.username === username &&
            item.domain === domain &&
            item.filename === filename &&
            item.category === category &&
            item.content === content
        ));

        if (!isDuplicate) {
            List2.unshift({
                id: id,
                username: username,
                filename: filename,
                domain: domain,
                category: category,
                content: content,
            });

            return {
                code: 20000,
                data: {
                    message: '公开成功'
                }
            };
        } else {
            return {
                code: 20001,
                data: {
                    message: '数据已存在'
                }
            };
        }
    },

    /**
     * 下载文件
     * @return {{code: number, data: {message: string}}}
     * @param config
     */
    downloadFile: config => {
        const { id, username, domain, filename, category, content } = JSON.parse(config.body);

        const isDuplicate = List1.some(item => (
            item.id === id &&
            item.username === username &&
            item.domain === domain &&
            item.filename === filename &&
            item.category === category &&
            item.content === content
        ));

        if (!isDuplicate) {
            List1.unshift({
                id: id,
                username: username,
                filename: filename,
                domain: domain,
                category: category,
                content: content,
            });

            return {
                code: 20000,
                data: {
                    message: '下载成功'
                }
            };
        } else {
            return {
                code: 20001,
                data: {
                    message: '数据已存在，无需重复下载'
                }
            };
        }
    },


    /**
     * 删除文件
     * @return {*}
     * @param config
     */
    deleteFile: config => {
        const { id } = JSON.parse(config.body)
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List1 = List1.filter(u => u.id !== id)
            List2 = List2.filter(u => u.id !== id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },


}