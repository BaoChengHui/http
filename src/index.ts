import axios, { AxiosRequestConfig } from "axios";
import { CreateAxiosDefaults } from "axios";
import {saveAs} from "file-saver";

declare module "axios" {
  interface AxiosRequestConfig {
    messageType?:'none'|'message'|'alert'
    filename?:string
  }
  
  interface AxiosInstance{
    create(config?: CreateAxiosDefaults): AxiosInstance;
    download:(config: AxiosRequestConfig)=>Promise<void>
  }
  interface CreateAxiosDefaults{
    message?:(msg:string)=>void
    alert?:(msg:string)=>void
  }
  interface InternalAxiosRequestConfig{
    message?:(msg:string)=>void
    alert?:(msg:string)=>void
  }
}


const defaultConfig: CreateAxiosDefaults = {
  timeout: 60000,
};

export interface ServiceResponse<T = any> {
  data: T;
  code: number;
  success: boolean;
  msg?: string;
}

const instance = axios.create(defaultConfig);

instance.create = (config) => {
  const instance = axios.create({ ...defaultConfig, ...config });
  instance.download = async(config:AxiosRequestConfig)=>{
    const res = await instance.request({
      responseType:'blob',
      ...config,
    })
    const {filename} = config
    let donwFilename
    const {data,headers} = res
    const match =
              headers?.["content-disposition"]?.match(/filename=?(\S*)/)
    if (match && match.length > 1) {
      donwFilename = match[1]
    }
    if(filename){
      donwFilename = filename
    }
    if(!donwFilename){
      return Promise.reject("未指定文件名")
    }
    saveAs(data,donwFilename)
  }
  instance.interceptors.response.use(
    (res) => {
      console.log("interceptors",res);
      const { data:resData, config } = res;
      const { message, alert, messageType = "message",responseType } = config;
      const callErr = (msg: string) => {
        if (messageType === "message" && message) {
          message(msg);
        } else if (messageType === "alert" && alert) {
          alert(msg);
        }
      };
      if(responseType === 'blob'){
        return res
      }
      const { data, msg, success } = resData
      if(!success){
        callErr(msg??'服务器错误，请稍候重试！')
        return Promise.reject(res.data)
      }
      return data;
    },
    (err) => {
      console.log("err", err);
      const { response, code, message, config } = err || {};
      let errMessage= '';
      if (code === "ECONNABORTED" && message.includes("timeout")) {
        errMessage = "请求超时，请重试";
      }
      if (message?.includes("Network Error")) {
        errMessage = "网络异常，请检查您的网络连接是否正常";
      }
      if (!errMessage) {
        const status = (response?.status || 0) as number;
        switch (status) {
          case 400:
            errMessage = "参数错误！";
            break;
          case 401:
          case 403:
            errMessage = "您没有权限！";
            break;
          case 404:
            errMessage = "网络请求错误，未找到该资源";
            break;
          case 405:
            errMessage = "网络请求错误，不允许该请求方式";
            break;
          case 500:
          case 501:
          case 502:
          case 503:
            errMessage = "服务器错误，请稍候重试！";
            break;
          case 504:
            errMessage = "网络超时";
            break;
          default:
            errMessage = "未知错误";
        }
      }
      if (config.message) {
        config.message(errMessage);
      }
      return Promise.reject(err);
    }
  );
  return instance;
};

export default instance;
