import to from '@hudiemon/await-to'
import {sleep} from "@hudiemon/utils"
import {mapData2Command, gameId2XTTGameid} from './utils'
import {homeInfo, userLogin, gameStart, gameCommand, gameOver, gameFreshMap} from '../services'

export class Game {
    LOOP_COUNT = 0
    ROLE_LIST = {
        CLICK: 2, YOYO: 1, HAWKING: 3
    }

    /**
     * 自动玩游戏
     * @returns {number} todayDiamond 今天获得的积分
     * @returns {number} todayLimitDiamond 今日游戏上限
     */
    public async automatic(): Promise<{ todayDiamond: number, todayLimitDiamond: number }> {
        this.LOOP_COUNT++;
        if (this.LOOP_COUNT > 30) {
            return Promise.reject(`次数过多，稍后再试`)
        }
        const {error, response} = await to(this.start())
        if (error) return Promise.reject(error)
        await sleep(2000)
        await this.command(response.gameId, response.mapData)
        await sleep(2000)
        const {realDiamond, todayDiamond, todayLimitDiamond} = await this.over();
        if (todayDiamond < todayLimitDiamond) {
            if (realDiamond < 40) {
                // 奖励小于40刷新下地图
                await sleep(2000)
                await gameFreshMap()
            }
            await sleep(1000, 10000)
            return this.automatic()
        }
        return {todayDiamond, todayLimitDiamond}
    }

    public async start() {
        const {error, response} = await to(homeInfo())
        if (error) return Promise.reject(error)
        // 如果已经在游戏中那么先退出游戏
        if (response.data.gameStatus !== 0) await this.over()
        await userLogin({name: response.data.userInfo.name})
        const {data} = await gameStart({roleId: this.ROLE_LIST.CLICK})
        return data
    }

    public command(gameId: string, mapData: number[]) {
        return gameCommand({
            command: mapData2Command(mapData)
        }, {
            headers: {
                'x-tt-gameid': gameId2XTTGameid(gameId)
            }
        })
    }

    public async over() {
        const {data} = await gameOver()
        return data
    }
}