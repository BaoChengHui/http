# @baochat/http

axios 封装，默认配置了 axios 的响应拦截器，处理后端返回接口的格式为`ApiResponse`，增加 download 方法，调用请求方法返回的数据为`ApiResponse['data']`,配置请求拦截器均，请求等 api 均与 axios 一致。

```ts
export interface ApiResponse<T = any> {
  data: T;
  code: number;
  success: boolean;
  msg?: string;
  [p: string]: any;
}
```

## 默认 http 错误消息

```ts
export const defaultMessageMap = {
  timeout: "请求超时，请重试",
  networkError: "网络异常，请检查您的网络连接是否正常",
  serviceError: "服务器错误，请稍候重试！",
  default: "未知错误",
  400: "参数错误！",
  401: "您没有权限！",
  403: "您没有权限！",
  404: "网络请求错误，未找到该资源",
  405: "网络请求错误，不允许该请求方式",
  500: "服务器错误，请稍候重试！",
  501: "服务器错误，请稍候重试！",
  502: "服务器错误，请稍候重试！",
  503: "服务器错误，请稍候重试！",
  504: "网络超时",
};
```

## 安装

```
npm i -S @baochat/http
```

## 基础使用

配置了 message 和 alert 方法,后端接口报错默认调用 message 方法，msg 为`ApiResponse['msg']`,使用组件库可以配置组件库的 message 方法

```ts
import http from "@baochat/http";
import { ElMessage, ElMessageBox } from "element-plus";

const instance = http.create({
  baseURL: "/api",
  message(msg) {
    ElMessage.error(msg);
  },
  alert(msg) {
    ElMessageBox.alert(msg);
  },
});
```

请求示例，接口/pet，返回的数据格式示例`PetApiRes`，调用`getPet`方法返回的数据为`Pet`

```ts
interface Pet {
  name: string;
  category: string;
}

interface PetApiRes {
  data: Pet;
  code: number;
  success: boolean;
  msg?: string;
}

export function getPet(id: number): Promise<Pet> {
  return instance.request({
    url: "/pet",
    method: "get",
    params: {
      id,
    },
  });
}
```

## 适配后端接口返回

后端接口类型返回的格式非`ApiResponse`类型时，如`ApiRes`,创建 instance 时，
配置`apiResponseAdapter`返回`ApiResponse`的数据格式即可

```ts
interface ApiRes {
  data: T;
  code: number;
  isSuccess: boolean;
  message?: string;
}

const instance = http.create({
  baseURL: "/api",
  apiResponseAdapter(data: ApiRes) {
    return {
      ...data,
      success: data.isSuccess,
      msg: data.message,
    };
  },
});
```

## 自定义处理后端接口报错

```ts
const instance = http.create({
  baseURL: "/api",
  apiErrorHandler(data, res) {
    if (data.code === 401) {
      //todo
    }
  },
});
```

## 自定义 http 错误的消息内容

通过`setErrMessageMap`覆盖默认的错误消息

```ts
import http, { setErrMessageMap } from "@baochat/http";

setErrMessageMap({
  401: "错误消息",
  403: "错误消息2",
});
```
