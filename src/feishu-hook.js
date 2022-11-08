const axios = require('axios')

function feishu_hook (text) {
	if(!process.env.FEISHU_WEB_HOOK){
		console.log('🤖️ 飞书机器人未设置')
		return
	}
	return axios.post(
		process.env.FEISHU_WEB_HOOK,
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