import {gameAxios} from "./axios";
import {getToken} from './services';


export const setAxiosToken = async (user_id: string) => {
    const {data} = await getToken()
    gameAxios.defaults.headers.common['authorization'] = `Bearer ${data}`
    gameAxios.defaults.params = {time: +new Date(), uid: user_id}
}