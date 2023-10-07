import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import axios from "axios";
import { defaultConfig } from "./config";
import saveAs from "file-saver";

export interface CustomConfig {
  message?: (msg: string) => void;
  alert?: (msg: string) => void;
  apiResponseAdapter?: (data: unknown) => ApiResponse;
  apiErrorHandler?: (data: unknown, res: AxiosResponse) => void;
}

export interface ApiResponse<T = any> {
  data: T;
  code: number;
  success: boolean;
  msg?: string;
}

let instanceMap: Record<number, CustomConfig> = {};
let uid = 0;
export function createInstance(config: CreateAxiosDefaults = {}) {
  const {
    message,
    alert,
    apiResponseAdapter,
    apiErrorHandler,
    ...otherConfig
  } = config;
  const instance = axios.create({ ...defaultConfig, ...otherConfig });
  instance.uid = uid;
  instanceMap[uid] = {
    message,
    alert,
    apiResponseAdapter,
    apiErrorHandler,
  };
  uid += 1;

  instance.download = async (config: AxiosRequestConfig) => {
    const res = await instance.request({
      responseType: "blob",
      ...config,
    });
    const { filename } = config;
    let donwFilename;
    const { data, headers } = res;
    const match = headers?.["content-disposition"]?.match(/filename=?(\S*)/);
    if (match && match.length > 1) {
      donwFilename = match[1];
    }
    if (filename) {
      donwFilename = filename;
    }
    if (!donwFilename) {
      return Promise.reject("未指定文件名");
    }
    saveAs(data, donwFilename);
  };
  instance.interceptors.response.use(
    (res) => {
      let { data: resData, config } = res;
      const { messageType = "message", responseType } = config;
      const { alert, message, apiResponseAdapter, apiErrorHandler } =
        getInsatnceConfig(instance);
      const callErr = (msg: string) => {
        if (messageType === "message" && message) {
          message(msg);
        } else if (messageType === "alert" && alert) {
          alert(msg);
        }
      };
      if (responseType === "blob") {
        return res;
      }
      if (apiResponseAdapter) {
        resData = apiResponseAdapter(resData);
      }
      if (apiErrorHandler) {
       apiErrorHandler(resData, res);
      }

      const { data, msg, success } = resData as ApiResponse;
      if (!success) {
        callErr(msg ?? "服务器错误，请稍候重试！");
        return Promise.reject(res.data);
      }
      return data;
    },
    (err) => {
      const { response, code, message } = err || {};
      let errMessage = "";
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
      const { message: Message } = getInsatnceConfig(instance);
      if (Message) {
        Message(errMessage);
      }
      return Promise.reject(err);
    }
  );

  return instance;
}

function getInsatnceConfig(instance: AxiosInstance) {
  return instanceMap[instance.uid];
}
