import {signIn} from './sign-in';
import {bugFix} from "./bug-fix";
import {message} from './message';
import {seaGold} from './sea-gold';
import {luckDraw} from './luck-draw';
import {dipLucky} from './dip-lucky';
import {getMineral} from './get-mineral';
import {gameAxios, axios} from './axios';

const main = async () => {
    if (!process.env.COOKIE) {
        message.error('【cookie】未设置');
        return
    }
    const {user_name, user_id} = await axios.get('/user_api/v1/user/get');
    message.info(`👤【用户】${user_name}`);
    await axios.get('https://juejin.cn/get/token/get/token').then(({data})=>{
        gameAxios.defaults.headers.common['authorization'] = `Bearer ${data}`
        gameAxios.defaults.params = {time: +new Date(), uid: user_id}
    })
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
    await getMineral().then((mineral) => message.info(`💎【矿石】：${mineral}`));
}
main().finally(message.finally)
