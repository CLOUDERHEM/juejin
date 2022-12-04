/**
 *  签到
 */
import {message} from "./message";
import * as service from "./services";

export const signIn = async () => {
    // 查询签到状态
    const {data: {status}} = await service.getTodayStatus()
    if (status) {
        message.info('🍩【签到】已签到')
    } else {
        await service.checkIn();
        message.info('🍩【签到】操作成功')
    }
    // 签到信息
    const {data: {cont_count, sum_count}} = await service.getCounts()
    message.info(`🔄️【连续签到】${cont_count}天`);
    message.info(`🌼【累计签到】${sum_count}天`);
}