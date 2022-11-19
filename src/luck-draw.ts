import {message} from './message';
import {axios} from './axios';

export const luckDraw = async () => {
    // 查询免费抽奖次数
    const {free_count} = await axios.get('/growth_api/v1/lottery_config/get')
    if (free_count === 0) return message.push('🎁【免费抽奖】免费次数已用光');
    // 抽奖
    const {lottery_name} = await axios.post('/growth_api/v1/lottery/draw');
    message.push(`🎁【免费抽奖】${lottery_name}`)
}