import {axios} from './axios';

export const getMineral = () => axios.get('/growth_api/v1/get_cur_point');
