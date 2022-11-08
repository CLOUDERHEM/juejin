const axios = require('./juejin-axios');
const message = require('./message');

async function get_mineral () {
	return axios.get('https://api.juejin.cn/growth_api/v1/get_cur_point').
		then(({data}) => {
			message.push(`💎 当前矿石数：${data.data}`, data.data)
		})
}

module.exports = get_mineral