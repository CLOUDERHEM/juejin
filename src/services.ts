import {request,gameRequest} from './request';
import type {AxiosRequestConfig} from "axios";

/**
 * 获取用户信息
 * @returns {Promise<string>} user_name 用户名
 * @returns {Promise<string>} user_id 用户id
 */
export const getUser = (): Promise<{ user_name: string, user_id: string }> => request.get('https://api.juejin.cn/user_api/v1/user/get')
/**
 * 获取当前矿石数量
 * @returns {Promise<number>} 矿石数量
 */
export const getCurPoint = (): Promise<number> => request.get('https://api.juejin.cn/growth_api/v1/get_cur_point');
/**
 * 获取签到状态
 * @returns {Promise<boolean>} 签到状态
 */
export const getTodayStatus = (): Promise<any> => request.get('https://api.juejin.cn/growth_api/v1/get_today_status');
/**
 * 签到
 */
export const checkIn = () => request.post('https://api.juejin.cn/growth_api/v1/check_in');
/**
 * 获取签到次数
 */
export const getCounts = (): Promise<any> => request.get('https://api.juejin.cn/growth_api/v1/get_counts');
/**
 * 获取抽奖信息
 * @returns {Promise<number>} free_count 免费抽奖次数
 */
export const getLotteryConfig = (): Promise<any> => request.get('https://api.juejin.cn/growth_api/v1/lottery_config/get');
/**
 * 获取抽奖信息
 * @returns {Promise<string>} lottery_name 奖品名称
 */
export const drawLottery = (): Promise<any> => request.post('https://api.juejin.cn/growth_api/v1/lottery/draw');
/**
 * 大奖信息
 * @param {object} data
 * @param {number} data.page_no 页数
 * @param {number} data.page_size 每页多少条
 * @returns {Promise<Array>} lotteries 获得大奖的用户名单
 */
export const bigLottery = (data: { page_no: number, page_size: number }): Promise<any> => request.post('https://api.juejin.cn/growth_api/v1/lottery_history/global_big', data);
/**
 * 沾喜气
 * @param {object} data
 * @param {string} data.lottery_history_id 中奖者id
 * @returns {Promise<string>} has_dip 是否沾过喜气
 * @returns {Promise<number>} dip_action 沾喜气是否成功
 * @returns {Promise<number>} total_value 喜气值
 */
export const dipLucky = (data: { lottery_history_id: string }): Promise<any> => request.post('https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky', data);
/**
 * 未收集的bug
 * @param {object} data
 * @returns {Promise<Array>} notCollect 未收集的bug列表
 */
export const notCollectBug = (data: {}): Promise<any> => request.post("https://api.juejin.cn/user_api/v1/bugfix/not_collect", data)
/**
 * 收集的bug
 * @param {object} data
 * @param {string} data.bug_type bug类型
 * @param {string} data.bug_time bug生成时间
 */
export const collectBug = (data: { bug_type: string, bug_time: string }) => request.post("https://api.juejin.cn/user_api/v1/bugfix/collect", data)
/**
 * 获取token
 */
export const getToken = () => request.get('https://juejin.cn/get/token/get/token')

export const info = (): Promise<{ gameStatus: number, userInfo: { name: string } }> => gameRequest.get('https://juejin-game.bytedance.com/game/sea-gold/home/info')
export const login = (data: { name: string }) => gameRequest.post('https://juejin-game.bytedance.com/game/sea-gold/user/login', data)
export const over = (): Promise<any> => gameRequest.post(`https://juejin-game.bytedance.com/game/sea-gold/game/over`, {isButton: 1});
export const start = (data: { roleId: number }): Promise<any> => gameRequest.post('https://juejin-game.bytedance.com/game/sea-gold/game/start', data)
export const command = (data: { command: any }, config: AxiosRequestConfig) => gameRequest.post('https://juejin-game.bytedance.com/game/sea-gold/game/command', data, config)
export const freshMap = () => gameRequest.post(`https://juejin-game.bytedance.com/game/sea-gold/game/fresh_map`, {})