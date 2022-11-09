const axios = require('axios');

const juejin_axios = axios.create({
	headers: {
		'content-type': 'application/json; charset=utf-8',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
		'accept-encoding': 'gzip, deflate, br',
		'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
		'sec-ch-ua-mobile': '?0',
		'accept': '*/*',
		'cookie': process.env.COOKIE
	},
})

module.exports = juejin_axios;