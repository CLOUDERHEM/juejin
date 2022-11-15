import {message} from './message';
import {cookieAxios} from './axios';

export const luckDraw = async () => {
    // 查询免费抽奖次数
    const free_count = await cookieAxios.get('/growth_api/v1/lottery_config/get').then(({data}: any) => data.data.free_count);
    if (free_count === 0) return message.push('✅【免费抽奖】免费次数已用光');
    // 抽奖
    await cookieAxios.post('/growth_api/v1/lottery/draw').then(({data}: any) => {
        if (data.err_msg === 'success') message.push(`✅【免费抽奖】${data.data.lottery_name}`);
    })
}