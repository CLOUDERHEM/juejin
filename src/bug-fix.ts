import {getCookieParam} from "./utils";
import {cookieAxios} from './axios';

export const bugFix = async () => {
    const {aid,uuid} = getCookieParam();
    const axios = cookieAxios.create({
        params:{
            aid,
            uuid
        }
    })

}