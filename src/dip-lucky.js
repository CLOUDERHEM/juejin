const axios = require('./juejin-axios');
const message = require('./message');
const random = require("lodash/random");


async function dip_lucky() {
    const lotteries = await axios.post('https://api.juejin.cn/growth_api/v1/lottery_history/global_big', {
        page_no: 1,
        page_size: 5
    }).then(({data}) => data.data.lotteries);
    const index = random(0, lotteries.length - 1);
    await axios.post('https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky', {lottery_history_id: lotteries[index].history_id}).then(({data}) => {
        if (data.data.has_dip) {
            message.push(`❌ 今日已沾过喜气，喜气值：${data.data.total_value}`)
        } else if (data.data.dip_action === 1) {
            message.push(`✅ 沾喜气成功，喜气值：${data.data.total_value}`)
        }
    })
}

module.exports = dip_lucky;