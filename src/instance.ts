import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import axios from "axios";
import { defaultConfig } from "./config";
import saveAs from "file-saver";
import { defaultMessageMap } from "./message";

export interface CustomConfig {
  message?: (msg: string) => void;
  alert?: (msg: string) => void;
  apiResponseAdapter?: (data: any) => ApiResponse;
  apiErrorHandler?: (data: any, res: AxiosResponse) => void;
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

      const { data, msg, success } = resData as ApiResponse;
      if (!success) {
        if (apiErrorHandler) {
          apiErrorHandler(resData, res);
        }
        callErr(msg ?? defaultMessageMap.serviceError);
        return Promise.reject(res.data);
      }
      return data;
    },
    (err) => {
      const { response, code, message } = err || {};
      let errMessage = "";
      if (code === "ECONNABORTED" && message.includes("timeout")) {
        errMessage = defaultMessageMap.timeout;
      }
      if (message?.includes("Network Error")) {
        errMessage = defaultMessageMap.networkError;
      }
      if (!errMessage) {
        const status = (response?.status || 0) as number;
        if (Reflect.has(defaultMessageMap, status)) {
          errMessage =
            defaultMessageMap[status as keyof typeof defaultMessageMap];
        } else {
          errMessage = defaultMessageMap.default;
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
