const axios = require('./juejin-axios');

async function get_mineral() {
    return axios.get('https://api.juejin.cn/growth_api/v1/get_cur_point').then(({data}) => data.data)
}

module.exports = get_mineral