import externalAxios from 'axios'
import {AxiosResponse} from 'axios'
import {isNil} from 'lodash'

// axios
export const axios = externalAxios.create({
    baseURL: "https://api.juejin.cn",
    headers: {
        cookie: process.env.COOKIE
    }
});
axios.interceptors.response.use((response: AxiosResponse) => {
    const {err_no, err_msg, data} = response.data;
    if (isNil(err_no)) return response.data
    if (err_no === 0) return data
    return Promise.reject(err_msg)
});

// gameAxios
export const gameAxios = externalAxios.create({
    baseURL: "https://juejin-game.bytedance.com",
})
gameAxios.interceptors.response.use((response: AxiosResponse) => {
    const {code, message, data} = response.data;
    if (code === 0) return data
    return Promise.reject(message)
});