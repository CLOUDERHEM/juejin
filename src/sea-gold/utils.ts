import jwt from "jsonwebtoken";
import {chunk} from "lodash";

/**
 * gameId 转 x-tt-gameid
 * @param {string} gameId
 * @return {string} x-tt-gameid
 */
export const gameId2XTTGameid = (gameId: string) => {
    return jwt.sign({
            gameId,
            time: +new Date
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
/**
 * 获取 mapData 转 command
 * @param {number[]} mapData
 */
export const mapData2Command = (mapData: number[]) => {
    const COLUMN = 6;
    const OBSTACLE = 6;
    const NEGATIVE_DIRECTION: any = {
        U: 'D', L: 'R', D: 'U', R: 'L'
    }
    const mapsTrack = [[3, 1, 'U'], [2, 2, 'L'], [4, 2, 'D'], [3, 3, 'R']];
    const mapsTree:any = chunk(mapData, COLUMN);
    // 过滤掉有障碍物的位置
    const trackXY = mapsTrack.filter((item) => {
        const xy = mapsTree[item[0]][item[1]];
        return xy !== OBSTACLE;
    });
    // 移动后反方向移动回初始位置
    return trackXY.map((item) => [item[2], NEGATIVE_DIRECTION[item[2]]]).flat();
}