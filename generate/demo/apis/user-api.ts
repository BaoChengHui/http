import instance, { type ResSelector } from '../instance';
import {type AxiosRequestConfig} from 'axios'
import { User } from '../models';




export class UserApi{
    static createUser(params:UserApiCreateUserRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        submitData.data = params
        return instance.request({
            method:'POST',
            url:'/user',   
            ...submitData,
            ...options,
        })
    }
    static createUsersWithArrayInput(params:UserApiCreateUsersWithArrayInputRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        submitData.data = params
        return instance.request({
            method:'POST',
            url:'/user/createWithArray',   
            ...submitData,
            ...options,
        })
    }
    static createUsersWithListInput(params:UserApiCreateUsersWithListInputRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        submitData.data = params
        return instance.request({
            method:'POST',
            url:'/user/createWithList',   
            ...submitData,
            ...options,
        })
    }
    static deleteUser(params:UserApiDeleteUserRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        return instance.request({
            method:'DELETE',
            url:`/user/{username}`
                    .replace(`{${"username"}}`, encodeURIComponent(String(params.username))),   
            ...submitData,
            ...options,
        })
    }
    static getUserByName(params:UserApiGetUserByNameRequest,options:AxiosRequestConfig={}):Promise<ResSelector<User>> {
        const submitData:Record<string,any> = {}
        return instance.request({
            method:'GET',
            url:`/user/{username}`
                    .replace(`{${"username"}}`, encodeURIComponent(String(params.username))),   
            ...submitData,
            ...options,
        })
    }
    static loginUser(params:UserApiLoginUserRequest,options:AxiosRequestConfig={}):Promise<ResSelector<string>> {
        const submitData:Record<string,any> = {}
        submitData.params = params
        return instance.request({
            method:'GET',
            url:'/user/login',   
            ...submitData,
            ...options,
        })
    }
    static logoutUser(options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        return instance.request({
            method:'GET',
            url:'/user/logout',   
            ...submitData,
            ...options,
        })
    }
    static updateUser(params:UserApiUpdateUserRequest,options:AxiosRequestConfig={}):Promise<ResSelector<void>> {
        const submitData:Record<string,any> = {}
        submitData.data = params
        return instance.request({
            method:'PUT',
            url:`/user/{username}`
                    .replace(`{${"username"}}`, encodeURIComponent(String(params.username))),   
            ...submitData,
            ...options,
        })
    }
}




/**
 * Request parameters for createUser operation in UserApi.
 * @export
 */
export interface UserApiCreateUserRequest extends User{
    
}


/**
 * Request parameters for createUsersWithArrayInput operation in UserApi.
 * @export
 */
export interface UserApiCreateUsersWithArrayInputRequest extends Array<User>{
    
}


/**
 * Request parameters for createUsersWithListInput operation in UserApi.
 * @export
 */
export interface UserApiCreateUsersWithListInputRequest extends Array<User>{
    
}


/**
 * Request parameters for deleteUser operation in UserApi.
 * @export
 */
export interface UserApiDeleteUserRequest {
    /**The name that needs to be deleted*/
    readonly username: string;
}

/**
 * Request parameters for getUserByName operation in UserApi.
 * @export
 */
export interface UserApiGetUserByNameRequest {
    /**The name that needs to be fetched. Use user1 for testing. */
    readonly username: string;
}

/**
 * Request parameters for loginUser operation in UserApi.
 * @export
 */
export interface UserApiLoginUserRequest {
    /**The user name for login*/
    readonly username: string;
    /**The password for login in clear text*/
    readonly password: string;
}


/**
 * Request parameters for updateUser operation in UserApi.
 * @export
 */
export interface UserApiUpdateUserRequest extends User{
    CodegenParameter{isFormParam&#x3D;false, isQueryParam&#x3D;false, isPathParam&#x3D;true, isHeaderParam&#x3D;false, isCookieParam&#x3D;false, isBodyParam&#x3D;false, isContainer&#x3D;false, isCollectionFormatMulti&#x3D;false, isPrimitiveType&#x3D;true, isModel&#x3D;false, isExplode&#x3D;false, baseName&#x3D;&#39;username&#39;, paramName&#x3D;&#39;username&#39;, dataType&#x3D;&#39;string&#39;, datatypeWithEnum&#x3D;&#39;null&#39;, dataFormat&#x3D;&#39;null&#39;, collectionFormat&#x3D;&#39;null&#39;, description&#x3D;&#39;name that need to be updated&#39;, unescapedDescription&#x3D;&#39;name that need to be updated&#39;, baseType&#x3D;&#39;null&#39;, containerType&#x3D;&#39;null&#39;, containerTypeMapped&#x3D;&#39;null&#39;, defaultValue&#x3D;&#39;undefined&#39;, enumDefaultValue&#x3D;&#39;null&#39;, enumName&#x3D;&#39;null&#39;, style&#x3D;&#39;null&#39;, deepObject&#x3D;&#39;false&#39;, isMatrix&#x3D;&#39;false&#39;, allowEmptyValue&#x3D;&#39;false&#39;, example&#x3D;&#39;username_example&#39;, examples&#x3D;&#39;null&#39;, jsonSchema&#x3D;&#39;{
  &quot;name&quot; : &quot;username&quot;,
  &quot;in&quot; : &quot;path&quot;,
  &quot;description&quot; : &quot;name that need to be updated&quot;,
  &quot;required&quot; : true,
  &quot;schema&quot; : {
    &quot;type&quot; : &quot;string&quot;
  }
}&#39;, isString&#x3D;true, isNumeric&#x3D;false, isInteger&#x3D;false, isShort&#x3D;false, isLong&#x3D;false, isUnboundedInteger&#x3D;false, isNumber&#x3D;false, isFloat&#x3D;false, isDouble&#x3D;false, isDecimal&#x3D;false, isByteArray&#x3D;false, isBinary&#x3D;false, isBoolean&#x3D;false, isDate&#x3D;false, isDateTime&#x3D;false, isUuid&#x3D;false, isUri&#x3D;false, isEmail&#x3D;false, isPassword&#x3D;false, isFreeFormObject&#x3D;false, isAnyType&#x3D;false, isArray&#x3D;false, isMap&#x3D;false, isFile&#x3D;false, isEnum&#x3D;false, isEnumRef&#x3D;false, _enum&#x3D;null, allowableValues&#x3D;null, items&#x3D;null, mostInnerItems&#x3D;null, additionalProperties&#x3D;null, vars&#x3D;[], requiredVars&#x3D;[], vendorExtensions&#x3D;{}, hasValidation&#x3D;false, maxProperties&#x3D;null, minProperties&#x3D;null, isNullable&#x3D;false, isDeprecated&#x3D;false, required&#x3D;true, maximum&#x3D;&#39;null&#39;, exclusiveMaximum&#x3D;false, minimum&#x3D;&#39;null&#39;, exclusiveMinimum&#x3D;false, maxLength&#x3D;null, minLength&#x3D;null, pattern&#x3D;&#39;null&#39;, maxItems&#x3D;null, minItems&#x3D;null, uniqueItems&#x3D;false, uniqueItemsBoolean&#x3D;null, contentType&#x3D;null, multipleOf&#x3D;null, isNull&#x3D;false, isVoid&#x3D;false, getAdditionalPropertiesIsAnyType&#x3D;false, getHasVars&#x3D;false, getHasRequired&#x3D;false, getHasDiscriminatorWithNonEmptyMapping&#x3D;false, composedSchemas&#x3D;null, hasMultipleTypes&#x3D;false, schema&#x3D;CodegenProperty{openApiType&#x3D;&#39;string&#39;, baseName&#x3D;&#39;username&#39;, complexType&#x3D;&#39;null&#39;, getter&#x3D;&#39;getUsername&#39;, setter&#x3D;&#39;setUsername&#39;, description&#x3D;&#39;null&#39;, dataType&#x3D;&#39;string&#39;, datatypeWithEnum&#x3D;&#39;string&#39;, dataFormat&#x3D;&#39;null&#39;, name&#x3D;&#39;username&#39;, min&#x3D;&#39;null&#39;, max&#x3D;&#39;null&#39;, defaultValue&#x3D;&#39;undefined&#39;, defaultValueWithParam&#x3D;&#39; &#x3D; data.username;&#39;, baseType&#x3D;&#39;string&#39;, containerType&#x3D;&#39;null&#39;, containerTypeMapped&#x3D;&#39;null&#39;, title&#x3D;&#39;null&#39;, unescapedDescription&#x3D;&#39;null&#39;, maxLength&#x3D;null, minLength&#x3D;null, pattern&#x3D;&#39;null&#39;, example&#x3D;&#39;null&#39;, jsonSchema&#x3D;&#39;{
  &quot;type&quot; : &quot;string&quot;
}&#39;, minimum&#x3D;&#39;null&#39;, maximum&#x3D;&#39;null&#39;, exclusiveMinimum&#x3D;false, exclusiveMaximum&#x3D;false, required&#x3D;false, deprecated&#x3D;false, hasMoreNonReadOnly&#x3D;false, isPrimitiveType&#x3D;true, isModel&#x3D;false, isContainer&#x3D;false, isString&#x3D;true, isNumeric&#x3D;false, isInteger&#x3D;false, isShort&#x3D;false, isLong&#x3D;false, isUnboundedInteger&#x3D;false, isNumber&#x3D;false, isFloat&#x3D;false, isDouble&#x3D;false, isDecimal&#x3D;false, isByteArray&#x3D;false, isBinary&#x3D;false, isFile&#x3D;false, isBoolean&#x3D;false, isDate&#x3D;false, isDateTime&#x3D;false, isUuid&#x3D;false, isUri&#x3D;false, isEmail&#x3D;false, isPassword&#x3D;false, isFreeFormObject&#x3D;false, isArray&#x3D;false, isMap&#x3D;false, isEnum&#x3D;false, isInnerEnum&#x3D;false, isEnumRef&#x3D;false, isAnyType&#x3D;false, isReadOnly&#x3D;false, isWriteOnly&#x3D;false, isNullable&#x3D;false, isSelfReference&#x3D;false, isCircularReference&#x3D;false, isDiscriminator&#x3D;false, isNew&#x3D;false, isOverridden&#x3D;null, _enum&#x3D;null, allowableValues&#x3D;null, items&#x3D;null, additionalProperties&#x3D;null, vars&#x3D;[], requiredVars&#x3D;[], mostInnerItems&#x3D;null, vendorExtensions&#x3D;{}, hasValidation&#x3D;false, isInherited&#x3D;false, discriminatorValue&#x3D;&#39;null&#39;, nameInCamelCase&#x3D;&#39;Username&#39;, nameInSnakeCase&#x3D;&#39;USERNAME&#39;, enumName&#x3D;&#39;null&#39;, maxItems&#x3D;null, minItems&#x3D;null, maxProperties&#x3D;null, minProperties&#x3D;null, uniqueItems&#x3D;false, uniqueItemsBoolean&#x3D;null, multipleOf&#x3D;null, isXmlAttribute&#x3D;false, xmlPrefix&#x3D;&#39;null&#39;, xmlName&#x3D;&#39;null&#39;, xmlNamespace&#x3D;&#39;null&#39;, isXmlWrapped&#x3D;false, isNull&#x3D;false, isVoid&#x3D;false, getAdditionalPropertiesIsAnyType&#x3D;false, getHasVars&#x3D;false, getHasRequired&#x3D;false, getHasDiscriminatorWithNonEmptyMapping&#x3D;false, composedSchemas&#x3D;null, hasMultipleTypes&#x3D;false, requiredVarsMap&#x3D;null, ref&#x3D;null, schemaIsFromAdditionalProperties&#x3D;false, isBooleanSchemaTrue&#x3D;false, isBooleanSchemaFalse&#x3D;false, format&#x3D;null, dependentRequired&#x3D;null, contains&#x3D;null}, content&#x3D;null, requiredVarsMap&#x3D;null, ref&#x3D;null, schemaIsFromAdditionalProperties&#x3D;false}/**name that need to be updated*/
    readonly username:string;
}







