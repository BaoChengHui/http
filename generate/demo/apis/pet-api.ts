import instance, { type ResSelector } from '../instance';
import {type AxiosRequestConfig} from 'axios'
import { ApiResponse } from '../models';
import { Pet } from '../models';




export class PetApi{
    static addPet(params:PetApiAddPetRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        submitData.data = params
        return instance.request({
            method:'POST',
            url:'/pet',   
            ...submitData,
            ...options,
        })
    }
    static deletePet(params:PetApiDeletePetRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        submitData.headers = {
            'api_key':params.apiKey
        }
        return instance.request({
            method:'DELETE',
            url:`/pet/{petId}`
                    .replace(`{${"petId"}}`, encodeURIComponent(String(params.petId))),   
            ...submitData,
            ...options,
        })
    }
    static findPetsByStatus(params:PetApiFindPetsByStatusRequest,options:AxiosRequestConfig={}):Promise<ResSelector<Array<Pet>>> {
        const submitData:Record<string,any> = {}
        submitData.params = params
        return instance.request({
            method:'GET',
            url:'/pet/findByStatus',   
            ...submitData,
            ...options,
        })
    }
    static findPetsByTags(params:PetApiFindPetsByTagsRequest,options:AxiosRequestConfig={}):Promise<ResSelector<Array<Pet>>> {
        const submitData:Record<string,any> = {}
        submitData.params = params
        return instance.request({
            method:'GET',
            url:'/pet/findByTags',   
            ...submitData,
            ...options,
        })
    }
    static getPetById(params:PetApiGetPetByIdRequest,options:AxiosRequestConfig={}):Promise<ResSelector<Pet>> {
        const submitData:Record<string,any> = {}
        return instance.request({
            method:'GET',
            url:`/pet/{petId}`
                    .replace(`{${"petId"}}`, encodeURIComponent(String(params.petId))),   
            ...submitData,
            ...options,
        })
    }
    static updatePet(params:PetApiUpdatePetRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        submitData.data = params
        return instance.request({
            method:'PUT',
            url:'/pet',   
            ...submitData,
            ...options,
        })
    }
    static updatePetWithForm(params:PetApiUpdatePetWithFormRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        const formData = new FormData()
        formData.append('name',params.name as any)
        formData.append('status',params.status as any)
        submitData.data=formData
        return instance.request({
            method:'POST',
            url:`/pet/{petId}`
                    .replace(`{${"petId"}}`, encodeURIComponent(String(params.petId))),   
            ...submitData,
            ...options,
        })
    }
    static uploadFile222(params:PetApiUploadFile222Request,options:AxiosRequestConfig={}):Promise<ResSelector<ApiResponse>> {
        const submitData:Record<string,any> = {}
        const formData = new FormData()
        formData.append('additionalMetadata',params.additionalMetadata as any)
        formData.append('file',params.file as any)
        submitData.data=formData
        return instance.request({
            method:'POST',
            url:`/pet/{petId}/uploadImage`
                    .replace(`{${"petId"}}`, encodeURIComponent(String(params.petId))),   
            ...submitData,
            ...options,
        })
    }
}




/**
 * Request parameters for addPet operation in PetApi.
 * @export
 */
export interface PetApiAddPetRequest extends Pet{
    
}


/**
 * Request parameters for deletePet operation in PetApi.
 * @export
 */
export interface PetApiDeletePetRequest {
    /**Pet id to delete*/
    readonly petId: number;
    
    readonly apiKey?: string;
}

/**
 * Request parameters for findPetsByStatus operation in PetApi.
 * @export
 */
export interface PetApiFindPetsByStatusRequest {
    /**Status values that need to be considered for filter*/
    readonly status: Array<'available' | 'pending' | 'sold'>;
}

/**
 * Request parameters for findPetsByTags operation in PetApi.
 * @export
 */
export interface PetApiFindPetsByTagsRequest {
    /**Tags to filter by*/
    readonly tags: Array<string>;
}

/**
 * Request parameters for getPetById operation in PetApi.
 * @export
 */
export interface PetApiGetPetByIdRequest {
    /**ID of pet to return*/
    readonly petId: number;
}

/**
 * Request parameters for updatePet operation in PetApi.
 * @export
 */
export interface PetApiUpdatePetRequest extends Pet{
    
}


/**
 * Request parameters for updatePetWithForm operation in PetApi.
 * @export
 */
export interface PetApiUpdatePetWithFormRequest {
    /**ID of pet that needs to be updated*/
    readonly petId: number;
    /**Updated name of the pet*/
    readonly name?: string;
    /**Updated status of the pet*/
    readonly status?: string;
}

/**
 * Request parameters for uploadFile222 operation in PetApi.
 * @export
 */
export interface PetApiUploadFile222Request {
    /**ID of pet to update*/
    readonly petId: number;
    /**Additional data to pass to server*/
    readonly additionalMetadata?: string;
    /**file to upload*/
    readonly file?: File;
}

/**
  * @export
  * @enum {string}
  */
export const enum FindPetsByStatusStatusEnum {
    Available = 'available',
    Pending = 'pending',
    Sold = 'sold'
}





