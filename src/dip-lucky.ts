/*
* @name 沾喜气
 */
import {random} from 'lodash';
import {message} from './message';
import {instanceAxios} from './axios';


export const dipLucky = async ()=>{
    const {lotteries} = await instanceAxios.post('/growth_api/v1/lottery_history/global_big', {
        page_no: 1,
        page_size: 5
    });
    const index = random(0, lotteries.length - 1);
    const {has_dip,dip_action,total_value} = await instanceAxios.post('/growth_api/v1/lottery_lucky/dip_lucky', {lottery_history_id: lotteries[index].history_id});
    if (has_dip) {
        message.push(`🌈【沾喜气】已沾过喜气，喜气值：${total_value}`)
    } else if (dip_action === 1) {
        message.push(`🌈【沾喜气】操作成功，喜气值：${total_value}`)
    }
}
