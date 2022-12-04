import axios from 'axios'

export const request = axios.create({
    headers: {
        Cookie: process.env.COOKIE,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    }
});

request.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response.data)
)

// gameAxios
export const gameRequest = axios.create({
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    }
})
gameRequest.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response.data)
)
gameRequest.interceptors.request.use((config) => {
    config.params.time = +new Date
    return config
})
