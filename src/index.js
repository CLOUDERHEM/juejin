const get_mineral = require('./get-mineral');
const sign_in = require('./sign-in');
const luck_draw = require('./luck-draw');
const dip_lucky = require('./dip-lucky');
const message = require('./message');
const feishu_hook = require('./feishu-hook');

(async function () {
	//查询当前矿石数
	await get_mineral()
	await Promise.allSettled([sign_in(), luck_draw(), dip_lucky()])
	feishu_hook(message.text)
})()

