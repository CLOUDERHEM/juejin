const get_mineral = require('./get-mineral');
const sign_in = require('./sign-in');
const luck_draw = require('./luck-draw');
const dip_lucky = require('./dip-lucky');
const message = require('./message');
const feishu_hook = require('./feishu-hook');

//主任务线
(async function () {
    await Promise.allSettled([
        (async () => {
            //签到
            await sign_in();
            //签到后免费抽奖
            await luck_draw();
        })(), dip_lucky()])
    //查询当前矿石数
    await get_mineral();
    //飞书消息通知
    feishu_hook(message.text)
})()

