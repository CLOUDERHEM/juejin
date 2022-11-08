const axios = require('axios')

function feishu_hook (text) {
	return axios.post(
		'https://open.feishu.cn/open-apis/bot/v2/hook/53d17651-05ef-4fe4-b674-43cb5056e51a',
		{
			'msg_type': 'text',
			'content': {
				'text': text.join('\n'),
			},
		}, {
			headers: {
				'content-type': 'application/json',
			},
		}).then(({data}) => {
		if (data.StatusMessage === 'success' && data.StatusCode === 0)
			console.log('🤖️ 飞书机器人消息发送成功')
	})
}

module.exports = feishu_hook