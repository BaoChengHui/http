import http from "bch-axios";


export interface BaseRes <T=any>{
    code?:number
    data?:T
    success?:boolean
}

export type ResSelector<T extends any> = T extends BaseRes? T['data']:T


const instance = http.create()

export default instance