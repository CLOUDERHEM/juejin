/**
 *  沾喜气
 */
import {random} from 'lodash';
import {message} from './message';
import * as service from './services';


export const dipLucky = async () => {
    const {data: {lotteries}} = await service.bigLottery({
        page_no: 1,
        page_size: 5
    })
    const index = random(0, lotteries.length - 1);
    const {
        data: {
            has_dip,
            dip_action,
            total_value
        }
    } = await service.dipLucky({lottery_history_id: lotteries[index].history_id});
    if (has_dip) {
        message.info(`🌈【沾喜气】已沾过喜气，当前喜气值：${total_value}`)
    } else if (dip_action === 1) {
        message.info(`🌈【沾喜气】操作成功，当前喜气值：${total_value}`)
    }
}
