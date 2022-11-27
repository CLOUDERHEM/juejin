/**
 * 海底掘金
 */
import {Game} from './game';
import {message} from "../message";
import {to} from 'await-to-js';
import {setGameRequestAuthorization} from '../request';

export const seaGold = async () => {
    await setGameRequestAuthorization()
    const game = new Game()
    const [error, data] = await to(game.automatic())
    if (error) {
        message.error(error)
        return
    }
    message.info(`🎮【海底掘金】${data?.todayDiamond} / ${data?.todayLimitDiamond}`)
}