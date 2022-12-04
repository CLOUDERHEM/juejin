/**
 *  抽奖
 */
import {message} from './message';
import * as service from './services';

export const lottery = async () => {
    // 查询免费抽奖次数
    const {data: {free_count}} = await service.getLotteryConfig()
    if (free_count === 0) return message.info('🎁【抽奖】免费次数已用光')
    // 抽奖
    const {data: {lottery_name}} = await service.drawLottery();
    message.info(`🎁【抽奖】${lottery_name}`)
}