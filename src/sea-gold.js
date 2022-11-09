const jwt = require('jsonwebtoken');
const axios = require('./juejin-axios');
const messages = require('./message');
const chunk = require('lodash/chunk');
const random = require('lodash/random');

const COLUMN = 6;
const OBSTACLE = 6;
const ROLE_LIST = {
    CLICK: 2, YOYO: 1, HAWKING: 3
};
const PUBLIC_KEY = `-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49
AwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU
nYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==
-----END EC PRIVATE KEY-----
`
const NEGATIVE_DIRECTION = {
    U: 'D', L: 'R', D: 'U', R: 'L'
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const getTrack = (maps) => {
    const mapsTrack = [[3, 1, 'U'], [2, 2, 'L'], [4, 2, 'D'], [3, 3, 'R']];
    const mapsTree = chunk(maps, COLUMN);
    // 过滤掉有障碍物的位置
    const trackXY = mapsTrack.filter((item) => {
        const xy = mapsTree[item[0]][item[1]];
        return xy !== OBSTACLE;
    });

    // 移动后反方向移动回初始位置
    return trackXY.map((item) => [item[2], NEGATIVE_DIRECTION[item[2]]]).flat();
};

class Game {
    #axios
    getAuthorization = () => axios.post('https://juejin.cn/get/token').then(({data}) => `Bearer ${data.data}`);
    init = async () => {
        const authorization = await this.getAuthorization();
        this.#axios = axios.create({
            headers: {
                authorization,
            }
        });
    }

    start = async () => {
        const {
            userInfo, gameStatus
        } = await this.#axios.get('https://juejin-game.bytedance.com/game/sea-gold/home/info', {
            params: {
                time: +new Date(), uid: process.env.UID
            }
        }).then(({data}) => data.data);
        if (gameStatus !== 0) {
            // 如果已经在游戏中那么先退出游戏
            await this.end()
        }
        //登录
        await this.#axios.post('https://juejin-game.bytedance.com/game/sea-gold/user/login', {
            name: userInfo.name
        }, {
            params: {
                time: +new Date(), uid: process.env.UID
            }
        })
        //开始
        return this.#axios.post('https://juejin-game.bytedance.com/game/sea-gold/game/start', {
            roleId: ROLE_LIST.CLICK
        }, {
            params: {
                time: +new Date(), uid: process.env.UID
            }
        }).then(({data}) => data.data)
    };
    getSign = (time, gameId) => {
        return jwt.sign({
            gameId, time
        }, PUBLIC_KEY, {
            algorithm: 'ES256', expiresIn: 2592e3, header: {
                alg: 'ES256', typ: 'JWT'
            }
        })
    }
    move = (command, gameId) => {
        const NOW_TIME = +new Date()
        const xttgameid = this.getSign(NOW_TIME, gameId)
        return this.#axios.post('https://juejin-game.bytedance.com/game/sea-gold/game/command',
            {command},
            {
                headers: {
                    'x-tt-gameid': xttgameid
                }, params: {
                    time: +new Date(), uid: process.env.UID
                }
            })
    };
    end = () => {
        return this.#axios.post(`https://juejin-game.bytedance.com/game/sea-gold/game/over`, {isButton: 1}, {
            params: {
                time: +new Date(), uid: process.env.UID
            }
        }).then(({data}) => data.data);
    }
    freshMap = () => {
        return this.#axios.post(`https://juejin-game.bytedance.com/game/sea-gold/game/fresh_map`,
            {},
            {
                params: {
                    time: +new Date(),
                    uid: process.env.UID
                }
            });
    }
}

const sea_gold = async () => {
    const game = new Game();
    await game.init();
    const {mapData, gameId} = await game.start();
    const track = getTrack(mapData);
    await sleep(2000);
    await game.move(track, gameId);
    await sleep(2000);
    const {realDiamond, todayDiamond, todayLimitDiamond} = await game.end();
    messages.push(`🎮 本次获得: ${realDiamond}, 今日已获得: ${todayDiamond}, 今日上限: ${todayLimitDiamond}`)
    if (realDiamond < 40) {
        // 奖励小于40刷新下地图
        await sleep(2000);
        await game.freshMap();
    }
    if (todayDiamond < todayLimitDiamond) {
        const time = random(1000, 10000);
        await sleep(time);
        await sea_gold();
    }
}
module.exports = sea_gold;