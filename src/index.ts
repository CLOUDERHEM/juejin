import {to} from 'await-to-js';
import {toMoney} from "./utils";
import {signIn} from './sign-in';
import {bugFix} from "./bug-fix";
import {message} from './message';
import {seaGold} from './sea-gold';
import {lottery} from './lottery';
import {dipLucky} from './dip-lucky';
import {getUser, getCurPoint} from './services';

const main = async () => {
    if (!process.env.COOKIE) {
        message.error('未设置 COOKIE')
        return
    }
    const {user_name, user_id} = await getUser();
    message.info(`👤【用户】${user_name}`);
    //获取任务前的矿石
    const prevMineral = await getCurPoint()
    //签到
    await to(signIn())
    //抽奖
    await to(lottery())
    //沾喜气
    await to(dipLucky())
    //BugFix
    await to(bugFix())
    //海底掘金
    await to(seaGold(user_id))
    //获取执行任务后最新的矿石
    const mineral = await getCurPoint()
    //今日获得的矿石
    const upwardsMineral = mineral - prevMineral
    message.info(`📈【今日增长矿石】${upwardsMineral} ≈ ${toMoney(upwardsMineral)}`);
    message.info(`💎【总矿石】：${mineral} ≈ ${toMoney(mineral)}`)
}
main().finally(message.finally)
