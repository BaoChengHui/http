import instance, { type ResSelector } from '../instance';
import {type AxiosRequestConfig} from 'axios'
import { Order } from '../models';




export class StoreApi{
    static deleteOrder(params:StoreApiDeleteOrderRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        return instance.request({
            method:'DELETE',
            url:`/store/order/{orderId}`
                    .replace(`{${"orderId"}}`, encodeURIComponent(String(params.orderId))),   
            ...submitData,
            ...options,
        })
    }
    static getInventory(options:AxiosRequestConfig={}):Promise<ResSelector<{ [key: string]: number; }>> {
        const submitData:Record<string,any> = {}
        return instance.request({
            method:'GET',
            url:'/store/inventory',   
            ...submitData,
            ...options,
        })
    }
    static getOrderById(params:StoreApiGetOrderByIdRequest,options:AxiosRequestConfig={}):Promise<ResSelector<Order>> {
        const submitData:Record<string,any> = {}
        return instance.request({
            method:'GET',
            url:`/store/order/{orderId}`
                    .replace(`{${"orderId"}}`, encodeURIComponent(String(params.orderId))),   
            ...submitData,
            ...options,
        })
    }
    static placeOrder(params:StoreApiPlaceOrderRequest,options:AxiosRequestConfig={}):Promise<ResSelector<Order>> {
        const submitData:Record<string,any> = {}
        submitData.data = params
        return instance.request({
            method:'POST',
            url:'/store/order',   
            ...submitData,
            ...options,
        })
    }
}




/**
 * Request parameters for deleteOrder operation in StoreApi.
 * @export
 */
export interface StoreApiDeleteOrderRequest {
    /**ID of the order that needs to be deleted*/
    readonly orderId: number;
}


/**
 * Request parameters for getOrderById operation in StoreApi.
 * @export
 */
export interface StoreApiGetOrderByIdRequest {
    /**ID of pet that needs to be fetched*/
    readonly orderId: number;
}

/**
 * Request parameters for placeOrder operation in StoreApi.
 * @export
 */
export interface StoreApiPlaceOrderRequest extends Order{
    
}







