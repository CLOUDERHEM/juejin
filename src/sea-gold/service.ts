import {gameAxios} from "../axios";
import type {AxiosRequestConfig} from 'axios';

export const info = (): Promise<{ gameStatus: number, userInfo: { name: string } }> => gameAxios.get('/game/sea-gold/home/info')
export const login = (data: { name: string }) => gameAxios.post('/game/sea-gold/user/login', data)
export const over = (): Promise<{ realDiamond: number, todayDiamond: number, todayLimitDiamond: number }> => gameAxios.post(`/game/sea-gold/game/over`, {isButton: 1});
export const start = (data: { roleId: number }): Promise<{ gameId: string, mapData: number[] }> => gameAxios.post('/game/sea-gold/game/start', data)
export const command = (data: { command: any }, config: AxiosRequestConfig) => gameAxios.post('/game/sea-gold/game/command', data, config)
export const freshMap = () => gameAxios.post(`/game/sea-gold/game/fresh_map`, {})