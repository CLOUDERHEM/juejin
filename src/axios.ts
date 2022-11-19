import externalAxios from 'axios';

const headers = {
    'content-type': 'application/json; charset=utf-8',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'accept': '*/*',
    'referer': 'https://juejin.cn/',
}
// axios
export const axios = externalAxios.create({
    baseURL: "https://api.juejin.cn",
    headers,
});
axios.defaults.headers.common['cookie'] = process.env.COOKIE;
axios.interceptors.response.use((response: any) => {
    const {err_no, err_msg,data} = response.data;
    if (err_no === 0 && err_msg === 'success') {
        return data ?? {}
    }
    return response.data
});
// gameAxios
export const gameAxios = externalAxios.create({
    baseURL: "https://juejin-game.bytedance.com",
    headers
})
gameAxios.interceptors.response.use((response: any) => {
    const {code, message, data} = response.data;
    if (code === 0 && message === 'success') {
        return data ?? {}
    }
    return response.data
});