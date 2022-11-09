const get_mineral = require('./get-mineral');
const sign_in = require('./sign-in');
const luck_draw = require('./luck-draw');
const dip_lucky = require('./dip-lucky');
const sea_gold = require('./sea-gold');
const message = require('./message');
const feishu_hook = require('./feishu-hook');

//主任务线
(async () => {
    if (!process.env.COOKIE) {
        message.push('❌ 未设置cookie');
        return
    }
    const prevMineral = await get_mineral();
    message.push(`💎 昨日矿石：${prevMineral}`)
    await Promise.allSettled([
        (async () => {
            //签到
            await sign_in();
            //签到后免费抽奖
            await luck_draw();
        })(),
        dip_lucky(),
        sea_gold()
    ]);
    const mineral = await get_mineral();
    message.push(`💎 当前矿石：${mineral}`)
})().finally(() => {
    feishu_hook(message.text)
})

