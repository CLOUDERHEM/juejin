import {sleep} from "@hudiemon/utils";
import * as service from '../services';
import {mapData2Command, gameId2XTTGameid} from './utils';

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
            return Promise.reject(`【海底掘金】次数过多，稍后再试`)
        }
        const {gameId, mapData} = await this.start()
        await sleep(2000)
        await this.command(gameId, mapData)
        await sleep(2000)
        const {realDiamond, todayDiamond, todayLimitDiamond} = await this.over();
        if (todayDiamond < todayLimitDiamond) {
            if (realDiamond < 40) {
                // 奖励小于40刷新下地图
                await sleep(2000)
                await service.freshMap()
            }
            await sleep(1000, 10000)
            return this.automatic()
        }
        return {todayDiamond, todayLimitDiamond}
    }

    public async start() {
        const {userInfo, gameStatus} = await service.info()
        // 如果已经在游戏中那么先退出游戏
        if (gameStatus !== 0) await this.over()
        await service.login({name: userInfo.name})
        const {data} = await service.start({roleId: this.ROLE_LIST.CLICK})
        return data
    }

    public command(gameId: string, mapData: number[]) {
        return service.command({
            command: mapData2Command(mapData)
        }, {
            headers: {
                'x-tt-gameid': gameId2XTTGameid(gameId)
            }
        })
    }

    public async over() {
        const {data} = await service.over()
        return data
    }
}