const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const axios = require('./juejin-axios');
const messages = require('./message');
const chunk = require('lodash/chunk');
const random = require('lodash/random');
const message = require("./message");


const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

class Game {
    #axios
    #gameId
    #mapData
    #COLUMN = 6
    #OBSTACLE = 6
    #ROLE_LIST = {
        CLICK: 2, YOYO: 1, HAWKING: 3
    }
    #NEGATIVE_DIRECTION = {
        U: 'D', L: 'R', D: 'U', R: 'L'
    }
    #PUBLIC_KEY = `-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49
AwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU
nYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==
-----END EC PRIVATE KEY-----
`
    #getAuthorization = () => axios.post('https://juejin.cn/get/token').then(({data}) => `Bearer ${data.data}`);
    init = async () => {
        const authorization = await this.#getAuthorization();
        this.#axios = axios.create({
            baseURL: 'https://juejin-game.bytedance.com/game/sea-gold',
            headers: {
                authorization,
            },
            params: {
                time: +new Date(),
                uid: process.env.UID
            }
        });
    }
    start = async () => {
        const {
            userInfo,
            gameStatus,
            todayDiamond,
            todayLimitDiamond
        } = await this.#axios.get('/home/info', {}).then(({data}) => data.data);
        if (!(todayDiamond < todayLimitDiamond)) {
            return Promise.reject('🎮【海底掘金】已上限')
        }
        if (gameStatus !== 0) {
            // 如果已经在游戏中那么先退出游戏
            await this.end()
        }
        //登录
        await this.#axios.post('/user/login', {
            name: userInfo.name
        }, {})
        //开始
        await this.#axios.post('/game/start', {
            roleId: this.#ROLE_LIST.CLICK
        }, {}).then(({data}) => {
            const {mapData, gameId} = data.data;
            this.#gameId = gameId;
            this.#mapData = mapData;
        })
    };
    #getSign = (time) => {
        return jwt.sign({
                time,
                gameId: this.#gameId
            },
            this.#PUBLIC_KEY,
            {
                algorithm: 'ES256',
                expiresIn: 2592e3,
                header: {
                    alg: 'ES256', typ: 'JWT'
                }
            })
    }
    #getTrack = (maps) => {
        const mapsTrack = [[3, 1, 'U'], [2, 2, 'L'], [4, 2, 'D'], [3, 3, 'R']];
        const mapsTree = chunk(maps, this.#COLUMN);
        // 过滤掉有障碍物的位置
        const trackXY = mapsTrack.filter((item) => {
            const xy = mapsTree[item[0]][item[1]];
            return xy !== this.#OBSTACLE;
        });
        // 移动后反方向移动回初始位置
        return trackXY.map((item) => [item[2], this.#NEGATIVE_DIRECTION[item[2]]]).flat();
    };
    move = () => {
        const NOW_TIME = +new Date()
        const command = this.#getTrack(this.#mapData)
        const xttgameid = this.#getSign(NOW_TIME)
        return this.#axios.post('/game/command',
            {command},
            {
                headers: {
                    'x-tt-gameid': xttgameid
                }
            })
    };
    end = () => {
        return this.#axios.post(`/game/over`, {isButton: 1}).then(({data}) => data.data);
    }
    freshMap = () => {
        return this.#axios.post(`/game/fresh_map`, {});
    }
}

const sea_gold = async () => {
    if (!process.env.UID) {
        message.push('❌【海底掘金】未设置UID');
        return
    }
    const game = new Game();
    // 初始化
    await game.init();
    const [error] = await to(game.start())
    if (error) {
        messages.push(error);
        return
    }
    await sleep(2000);
    await game.move();
    await sleep(2000);
    const {realDiamond, todayDiamond, todayLimitDiamond} = await game.end();
    messages.push(`🎮【海底掘金】本次获得: ${realDiamond}, 今日已获得: ${todayDiamond}, 今日上限: ${todayLimitDiamond}`)
    if (realDiamond < 40) {
        // 奖励小于40刷新下地图
        await sleep(2000);
        await game.freshMap();
    }
    if (todayDiamond < todayLimitDiamond) {
        const time = random(1000, 10000);
        await sleep(time);
        await sea_gold();
    } else {
        messages.push(`🎮【海底掘金】已上限`)
    }
}
module.exports = sea_gold;