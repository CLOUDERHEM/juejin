import {instanceAxios} from './axios';

export const getMineral = () => instanceAxios.get('/growth_api/v1/get_cur_point');
