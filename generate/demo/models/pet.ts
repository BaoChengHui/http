
// May contain unused imports in some cases
// @ts-ignore
import { Category } from './category';
// May contain unused imports in some cases
// @ts-ignore
import { Tag } from './tag';

/**
 * 
 * @export
 * @interface Pet
 */
export interface Pet {
    /**
     * 
     */
    'id'?: number;
    /**
     * 
     */
    'category'?: Category;
    /**
     * 
     */
    'name': string;
    /**
     * 
     */
    'photoUrls': Array<string>;
    /**
     * 
     */
    'tags'?: Array<Tag>;
    /**
     * pet status in the store
     */
    'status'?: PetStatusEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum PetStatusEnum {
    Available = 'available',
    Pending = 'pending',
    Sold = 'sold'
}


