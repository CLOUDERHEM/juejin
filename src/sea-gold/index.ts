/**
 * 海底掘金
 */
import {Game} from './game';
import {message} from "../message";
import {to} from 'await-to-js';
import {setAxiosToken} from '../set-axios-token';

export const seaGold = async (user_id: string) => {
    await setAxiosToken(user_id)
    const game = new Game()
    const [error, data] = await to(game.automatic())
    if (error) {
        message.error((error as any))
        return
    }
    message.info(`🎮【海底掘金】${data.todayDiamond} / ${data.todayLimitDiamond}`)
}