/*
* @name 沾喜气
 */
import {random} from 'lodash';
import {message} from './message';
import {cookieAxios} from './axios';


export const dipLucky = async ()=>{
    const lotteries = await cookieAxios.post('/growth_api/v1/lottery_history/global_big', {
        page_no: 1,
        page_size: 5
    }).then(({data}) => data.data.lotteries);
    const index = random(0, lotteries.length - 1);
    await cookieAxios.post('/growth_api/v1/lottery_lucky/dip_lucky', {lottery_history_id: lotteries[index].history_id}).then(({data}) => {
        if (data.data.has_dip) {
            message.push(`✅【沾喜气】已沾过喜气，喜气值：${data.data.total_value}`)
        } else if (data.data.dip_action === 1) {
            message.push(`✅【沾喜气】操作成功，喜气值：${data.data.total_value}`)
        }
    })
}