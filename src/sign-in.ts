/*
*  签到
*/
import {axios} from "./axios";
import {message} from "./message";

export const signIn = async () => {
    // 查询签到状态
    await axios.get('/growth_api/v1/get_today_status').then(async (data) => {
        if (data) return message.info('🎉【签到】已签到');
        // 签到
        await axios.post('/growth_api/v1/check_in');
        message.info('🎉【签到】操作成功');
    });
    // 签到信息
    const {cont_count, sum_count} = await axios.get('/growth_api/v1/get_counts');
    message.info(`🔄【连续签到】${cont_count}天`);
    message.info(`📦【累计签到】${sum_count}天`);
}