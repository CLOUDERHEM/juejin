const axios = require('axios');

async function sign_in() {
    // 查询签到状态
   const {data} = await axios.get('https://api.juejin.cn/growth_api/v1/get_today_status');
    if (data.data) return console.log('❌ 今日已签到');
    // 签到
    await axios.post('https://api.juejin.cn/growth_api/v1/check_in').then(({data}) => {
        console.log('✅ 签到成功');
    });
}

module.exports = sign_in;