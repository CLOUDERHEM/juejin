import {cookieAxios} from "./axios";
import {message} from "./message";

export const signIn = async () => {
    // 查询签到状态
    const {data} = await cookieAxios.get('/growth_api/v1/get_today_status');
    if (data.data) return message.push('✅【签到】已签到');
    // 签到
    await cookieAxios.post('/growth_api/v1/check_in').then(({data}: any) => {
        if (data.err_msg === 'success') message.push('✅ 【签到】操作成功')
    })
}