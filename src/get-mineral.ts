import {cookieAxios} from './axios';

export const getMineral=()=>{
    return cookieAxios.get('/growth_api/v1/get_cur_point').then(({data}) => data.data)
}
