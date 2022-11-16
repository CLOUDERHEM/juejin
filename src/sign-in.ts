import {instanceAxios} from "./axios";
import {message} from "./message";

export const signIn = async () => {
    // 查询签到状态
    await instanceAxios.get('/growth_api/v1/get_today_status').then(async (data) => {
        if (data) return message.push('🎉【签到】已签到');
        // 签到
        await instanceAxios.post('/growth_api/v1/check_in');
        message.push('🎉【签到】操作成功');
    });
    // 签到信息
    const {cont_count, sum_count} = await instanceAxios.get('/growth_api/v1/get_counts');
    message.push(`🔄【连续签到】${cont_count}天`);
    message.push(`📦【累计签到】${sum_count}天`);
}