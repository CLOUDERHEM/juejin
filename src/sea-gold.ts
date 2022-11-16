import {sleep} from './utils';
import jwt from 'jsonwebtoken';
import {message} from './message';
import {gameAxios} from './axios';
import {chunk, random} from 'lodash';

let COUNT = 0;
const COLUMN = 6;
const OBSTACLE = 6;
const ROLE_LIST = {
    CLICK: 2, YOYO: 1, HAWKING: 3
}
const NEGATIVE_DIRECTION: any = {
    U: 'D', L: 'R', D: 'U', R: 'L'
}

const gameEnd = () => gameAxios.post(`/game/sea-gold/game/over`, {isButton: 1});
const getTrack = (maps: any) => {
    const mapsTrack = [[3, 1, 'U'], [2, 2, 'L'], [4, 2, 'D'], [3, 3, 'R']];
    const mapsTree: any = chunk(maps, COLUMN);
    // 过滤掉有障碍物的位置
    const trackXY = mapsTrack.filter((item) => {
        const xy = mapsTree[item[0]][item[1]];
        return xy !== OBSTACLE;
    });
    // 移动后反方向移动回初始位置
    return trackXY.map((item) => [item[2], NEGATIVE_DIRECTION[item[2]]]).flat();
}
const getSign = (time: number, gameId: string) => {
    return jwt.sign({
            time,
            gameId
        },
        `-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49
AwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU
nYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==
-----END EC PRIVATE KEY-----`,
        {
            algorithm: 'ES256',
            expiresIn: 2592e3,
            header: {
                alg: 'ES256', typ: 'JWT'
            }
        })
}

export const seaGold = async () => {
    COUNT++;
    if(COUNT>30){
        message.push(`🎮【海底掘金】次数过多`)
        return
    }
    const {
        userInfo,
        gameStatus,
    } = await gameAxios.get('/game/sea-gold/home/info', {})
    if (!(userInfo.todayDiamond < userInfo.todayLimitDiamond)) {
        message.push('🎮【海底掘金】已上限');
        return
    }
    // 如果已经在游戏中那么先退出游戏
    if (gameStatus !== 0) await gameEnd();
    //登录
    await gameAxios.post('/game/sea-gold/user/login', {
        name: userInfo.name
    }, {})
    const {mapData, gameId} = await gameAxios.post('/game/sea-gold/game/start', {
        roleId: ROLE_LIST.CLICK
    }, {})
    await sleep(2000);
    await gameAxios.post('/game/sea-gold/game/command',
        {command: getTrack(mapData)},
        {
            headers: {
                'x-tt-gameid': getSign(+new Date(),gameId)
            }
        })
    await sleep(2000);
    const {realDiamond, todayDiamond, todayLimitDiamond} = await gameEnd();
    message.push(`🎮【海底掘金】本次获得: ${realDiamond}, 今日已获得: ${todayDiamond}, 今日上限: ${todayLimitDiamond}`);
    if (realDiamond < 40) {
        // 奖励小于40刷新下地图
        await sleep(2000);
        await gameAxios.post(`/game/sea-gold/game/fresh_map`, {});
    }
    if (todayDiamond < todayLimitDiamond) {
        const time = random(1000, 10000);
        await sleep(time);
        await seaGold();
    } else {
        message.push(`🎮【海底掘金】已上限`)
    }
}