

/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * 
     */
    'id'?: number;
    /**
     * 
     */
    'petId'?: number;
    /**
     * 
     */
    'quantity'?: number;
    /**
     * 
     */
    'shipDate'?: string;
    /**
     * Order Status
     */
    'status'?: OrderStatusEnum;
    /**
     * 
     */
    'complete'?: boolean;
}

/**
    * @export
    * @enum {string}
    */
export enum OrderStatusEnum {
    Placed = 'placed',
    Approved = 'approved',
    Delivered = 'delivered'
}


