import {random} from "lodash";
import {sleep} from "../utils";
import {message} from "../message";
import * as service from './service';
import {mapData2Command, gameId2XTTGameid} from './utils';

export class Game {
    LOOP_COUNT = 0
    ROLE_LIST = {
        CLICK: 2, YOYO: 1, HAWKING: 3
    }

    public async automatic(): Promise<any> {
        this.LOOP_COUNT++;
        if (this.LOOP_COUNT > 30) {
            message.push(`❌【海底掘金】次数过多，稍后再试`)
            return
        }
        const {gameId, mapData} = await this.start()
        await sleep(2000)
        await this.command(gameId, mapData)
        await sleep(2000)
        const {realDiamond, todayDiamond, todayLimitDiamond} = await this.over();
        if (realDiamond < 40) {
            // 奖励小于40刷新下地图
            await sleep(2000)
            await service.freshMap()
        }
        if (todayDiamond < todayLimitDiamond) {
            const time = random(1000, 10000)
            await sleep(time)
            await this.automatic()
        }
        return {todayDiamond, todayLimitDiamond}
    }

    public async start() {
        const {userInfo, gameStatus} = await service.info()
        // 如果已经在游戏中那么先退出游戏
        if (gameStatus !== 0) await this.over()
        await service.login({name: userInfo.name})
        return service.start({roleId: this.ROLE_LIST.CLICK})
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

    public over() {
        return service.over()
    }
}