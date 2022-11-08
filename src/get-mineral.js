const axios = require('axios');

async function get_mineral() {
    return axios.get('https://api.juejin.cn/growth_api/v1/get_cur_point').then(({data}) => {
        console.log('💎当前矿石数：', data.data)
    })
}

module.exports = get_mineral;