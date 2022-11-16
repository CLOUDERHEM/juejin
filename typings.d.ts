import {AxiosInstance as Instance} from 'axios'

declare module 'axios' {
    interface AxiosInstance extends Instance {
    }

    interface AxiosResponse<T = any> {
        [key: string]: any
    }
}