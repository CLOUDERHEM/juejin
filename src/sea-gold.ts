import {to} from 'await-to-js'
import jwt from 'jsonwebtoken';
import {sleep} from './utils';
import {message} from './message';
import {chunk, random} from 'lodash';
import {authorizationAxios} from './axios';


class Game {
    private gameId?: string;
    private mapData?: string;
    private COLUMN = 6
    private OBSTACLE = 6
    private ROLE_LIST = {
        CLICK: 2, YOYO: 1, HAWKING: 3
    }
    private NEGATIVE_DIRECTION: any = {
        U: 'D', L: 'R', D: 'U', R: 'L'
    }
    private PUBLIC_KEY = `-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49
AwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU
nYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==
-----END EC PRIVATE KEY-----
`
    public start = async () => {
        const {
            userInfo,
            gameStatus,
        } = await authorizationAxios.get('/game/sea-gold/home/info', {}).then(({data}) => data.data);
        if (!(userInfo.todayDiamond < userInfo.todayLimitDiamond)) {
            return Promise.reject('🎮【海底掘金】已上限')
        }
        if (gameStatus !== 0) {
            // 如果已经在游戏中那么先退出游戏
            await this.end()
        }
        //登录
        await authorizationAxios.post('/game/sea-gold/user/login', {
            name: userInfo.name
        }, {})
        //开始
        await authorizationAxios.post('/game/sea-gold/game/start', {
            roleId: this.ROLE_LIST.CLICK
        }, {}).then(({data}) => {
            const {mapData, gameId} = data.data;
            this.gameId = gameId;
            this.mapData = mapData;
        })
    };
    private getSign = (time: any) => {
        return jwt.sign({
                time,
                gameId: this.gameId
            },
            this.PUBLIC_KEY,
            {
                algorithm: 'ES256',
                expiresIn: 2592e3,
                header: {
                    alg: 'ES256', typ: 'JWT'
                }
            })
    }
    private getTrack = (maps: any) => {
        const mapsTrack = [[3, 1, 'U'], [2, 2, 'L'], [4, 2, 'D'], [3, 3, 'R']];
        const mapsTree: any = chunk(maps, this.COLUMN);
        // 过滤掉有障碍物的位置
        const trackXY = mapsTrack.filter((item) => {
            const xy = mapsTree[item[0]][item[1]];
            return xy !== this.OBSTACLE;
        });
        // 移动后反方向移动回初始位置
        return trackXY.map((item) => [item[2], this.NEGATIVE_DIRECTION[item[2]]]).flat();
    };
    move = () => {
        const NOW_TIME = +new Date()
        const command = this.getTrack(this.mapData)
        const xttgameid = this.getSign(NOW_TIME)
        return authorizationAxios.post('/game/sea-gold/game/command',
            {command},
            {
                headers: {
                    'x-tt-gameid': xttgameid
                }
            })
    };
    end = () => {
        return authorizationAxios.post(`/game/sea-gold/game/over`, {isButton: 1}).then(({data}) => data.data);
    }
    freshMap = () => {
        return authorizationAxios.post(`/game/sea-gold/game/fresh_map`, {});
    }
}

export const seaGold = async () => {
    const game = new Game();
    const [error] = await to(game.start())
    if (error) {
        message.push('🎮 error');
        return
    }
    await sleep(2000);
    await game.move();
    await sleep(2000);
    const {realDiamond, todayDiamond, todayLimitDiamond} = await game.end();
    message.push(`🎮【海底掘金】本次获得: ${realDiamond}, 今日已获得: ${todayDiamond}, 今日上限: ${todayLimitDiamond}`)
    if (realDiamond < 40) {
        // 奖励小于40刷新下地图
        await sleep(2000);
        await game.freshMap();
    }
    if (todayDiamond < todayLimitDiamond) {
        const time = random(1000, 10000);
        await sleep(time);
        await seaGold();
    } else {
        message.push(`🎮【海底掘金】已上限`)
    }
}