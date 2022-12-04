import axios from 'axios'
import {getToken} from "./services"

export const request = axios.create({
    headers: {
        Cookie: process.env.COOKIE,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    }
});

request.interceptors.response.use(
    (response) =>{
        console.log( response.data)
        return  response.data
    },
    (error) => Promise.reject(error.response.data)
)

// gameAxios
export const gameRequest = axios.create({
    baseURL: "https://juejin-game.bytedance.com",
})
gameRequest.interceptors.response.use((response) => {
    const {code, message, data} = response.data
    if (code === 0) return data
    return Promise.reject(message)
})
gameRequest.interceptors.request.use((config) => {
    config.params.time = +new Date
    return config
})

export const setGameRequestAuthorization = async () => {
    const token = await getToken()
    gameRequest.defaults.headers.common['authorization'] = `Bearer ${token}`
}