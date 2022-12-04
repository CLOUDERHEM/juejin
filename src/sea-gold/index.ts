/**
 * 海底掘金
 */
import {Game} from './game';
import {message} from "../message";

export const seaGold = async () => {
    const game = new Game()
    const {todayDiamond, todayLimitDiamond} = await game.automatic()
    message.info(`🎮【海底掘金】${todayDiamond} / ${todayLimitDiamond}`)
}