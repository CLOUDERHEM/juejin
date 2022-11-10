const axios = require('./juejin-axios');
const message = require('./message');

async function luck_draw() {
    // 查询免费抽奖次数
    const {data} = await axios.get('https://api.juejin.cn/growth_api/v1/lottery_config/get');
    if (data.data.free_count === 0) return message.push('✅【免费抽奖】免费次数已用光');
    // 抽奖
    await axios.post('https://api.juejin.cn/growth_api/v1/lottery/draw').then(({data}) => {
        if (data.err_msg === 'success') message.push(`✅【免费抽奖】${data.data.lottery_name}`);
    })
}

module.exports = luck_draw;