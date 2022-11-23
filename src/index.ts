import {signIn} from './sign-in';
import {bugFix} from "./bug-fix";
import {message} from './message';
import {seaGold} from './sea-gold';
import {luckDraw} from './luck-draw';
import {dipLucky} from './dip-lucky';
import {getMineral} from './get-mineral';
import {gameAxios, axios} from './axios';

const main = async () => {
    if (!process.env.REQUIRED_PARAMS) {
        message.error('未设置 REQUIRED_PARAMS')
        return
    }
    global.REQUIRED_PARAMS = JSON.parse(process.env.REQUIRED_PARAMS);
    axios.defaults.headers.common['cookie'] = global.REQUIRED_PARAMS.cookie;
    const {user_name, user_id}: any = await axios.get('/user_api/v1/user/get');
    message.info(`👤【用户】${user_name}`);
    await axios.get('https://juejin.cn/get/token/get/token').then(({data}) => {
        gameAxios.defaults.headers.common['authorization'] = `Bearer ${data}`
        gameAxios.defaults.params = {time: +new Date(), uid: user_id}
    })
    const prevMineral: any = await getMineral()
    await Promise.allSettled([
        (async () => {
            //签到
            await signIn();
            //签到后免费抽奖
            await luckDraw();
        })(),
        dipLucky(),
        seaGold(),
        bugFix()
    ]);
    const mineral: any = await getMineral();
    const upwardsMineral = mineral - prevMineral
    message.info(`📈【今日增长矿石】${upwardsMineral} ≈ ${Math.round(upwardsMineral / 10000 * 3.3458856345885635)}元`);
    message.info(`💎【总矿石】：${mineral} ≈ ${Math.round(mineral / 10000 * 3.3458856345885635)}元`)
}
main().finally(message.finally)
