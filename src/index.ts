import axios from "axios";
import { defaultConfig } from "./config";
import { CustomConfig, createInstance } from "./instance";
import { defaultMessageMap, setErrMessageMap } from "./message";

declare module "axios" {
  interface AxiosRequestConfig {
    messageType?: "none" | "message" | "alert";
    filename?: string;
  }

  interface AxiosInstance {
    create(config?: CreateAxiosDefaults): AxiosInstance;
    download: (config: AxiosRequestConfig) => Promise<void>;
    uid: number;
  }
  interface CreateAxiosDefaults extends CustomConfig {}
  interface InternalAxiosRequestConfig extends CustomConfig {}
}

const instance = axios.create(defaultConfig);
setErrMessageMap(defaultMessageMap)
instance.create = createInstance;
export default instance;
export { setErrMessageMap };
