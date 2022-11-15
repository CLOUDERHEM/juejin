import axios from 'axios';

const getHeaders = (headers?: any) => {
    return {
        'content-type': 'application/json; charset=utf-8',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'accept': '*/*',
        'referer': 'https://juejin.cn/',
        ...headers
    }
}

export const cookieAxios = axios.create({
    baseURL: "https://api.juejin.cn",
    headers: getHeaders({'cookie': process.env.COOKIE}),
});

export const authorizationAxios = axios.create({
    baseURL: "https://juejin-game.bytedance.com",
    headers: getHeaders()
})

export const setAuthorizationAxios = async () => {
    const {user_id} = await cookieAxios.get('/user_api/v1/user/get').then(({data}) => data.data);
    authorizationAxios.defaults.headers.authorization = await cookieAxios.post('https://juejin.cn/get/token/get/token').then(({data}) => `Bearer ${data.data}`);
    authorizationAxios.defaults.params = {
        time: +new Date(),
        uid: user_id
    }
}