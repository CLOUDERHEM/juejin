import {signIn} from './sign-in';
import {message} from './message';
import {luckDraw} from './luck-draw';
import {dipLucky} from './dip-lucky';
import {getMineral} from './get-mineral';
import {seaGold} from './sea-gold';
import {feishuHook} from './feishu-hook';
import {setAuthorizationAxios} from './axios';

const main = async () => {
    if (!process.env.COOKIE) {
        message.push('❌ 未设置cookie');
        return
    }
    await setAuthorizationAxios();
    await getMineral().then((prevMineral) => message.push(`💎 昨日矿石：${prevMineral}`));
    await Promise.allSettled([
        (async () => {
            //签到
            await signIn();
            //签到后免费抽奖
            await luckDraw();
        })(),
        dipLucky(),
        seaGold()
    ]);
    await getMineral().then((mineral) => message.push(`💎 当前矿石：${mineral}`));
}
main().finally(() => {
    feishuHook(message.text)
})
