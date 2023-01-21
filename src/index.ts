import {signIn} from './sign-in'
import {bugFix} from "./bug-fix"
import {message} from './message'
import {seaGold} from './sea-gold'
import {lottery} from './lottery';
import to from '@hudiemon/await-to'
import {toMoneyUnit} from "./utils"
import {dipLucky} from './dip-lucky'
import {gameRequest} from './request'
import BigNumber from "bignumber.js"
import {getUser, getCurPoint, getToken} from './services';

const main = async () => {
    if (!process.env.COOKIE) {
        message.error('【secrets.COOKIE】未设置')
        return
    }
    const {response: getUserRes} = await to(getUser())
    if (getUserRes.err_no !== 0) {
        message.error(getUserRes.err_msg)
        return
    }
    message.info(`👤【用户】${getUserRes.data.user_name}`)
    //获取任务前的矿石
    const {response: {data: prevMineral}} = await to(getCurPoint())
    //签到
    await to(signIn())
    //抽奖
    await to(lottery())
    //沾喜气
    await to(dipLucky())
    //BugFix
    await to(bugFix())
    const {data: token} = await getToken()
    gameRequest.defaults.params = {uid: getUserRes.data.user_id}
    gameRequest.defaults.headers.common['authorization'] = `Bearer ${token}`
    //海底掘金
    // await to(seaGold())
    //获取执行任务后最新的矿石
    const {response: {data: mineral}} = await to(getCurPoint())
    //今日获得的矿石
    const upwardsMineral = new BigNumber(mineral).minus(prevMineral).toNumber()
    message.info(`📈【今日增长矿石】${upwardsMineral} ≈ ${toMoneyUnit(upwardsMineral)}`);
    message.info(`💎【总矿石】：${mineral} ≈ ${toMoneyUnit(mineral)}`)
}
main().finally(message.finally)
