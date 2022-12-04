/**
 * 海底掘金
 */
import {Game} from './game';
import to from '@hudiemon/await-to'
import {message} from "../message";

export const seaGold = async () => {
    const game = new Game()
    const {error, response: {todayDiamond, todayLimitDiamond}} = await to(game.automatic())
    if (error) {
        message.error(error)
        return
    }
    message.info(`🎮【海底掘金】${todayDiamond} / ${todayLimitDiamond}`)
}