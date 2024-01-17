import Mock from "mockjs";

export default {
    getStatisticalData: () => {
        return {
            data: {
                tableData: [{
                    name:'文学',
                    todayDL:'1000',
                    monthDL:'1000',
                    totalDL:'5000'
                }, {
                    name:'心理',
                    todayDL:'0',
                    monthDL:'2000',
                    totalDL:'6000'
                }, {
                    name:'历史',
                    todayDL:'2000',
                    monthDL:'6000',
                    totalDL:'20000'
                }, {
                    name:'政治',
                    todayDL:'3000',
                    monthDL:'4000',
                    totalDL:'15000'
                },],
                    bkData:[{
                        username: 'sandy',
                        domain: "A域"
                    },{
                        username: 'sue',
                        domain: "B域"
                    },],
            }
        }
    }
}
