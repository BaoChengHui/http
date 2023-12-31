export const errMessageMap = {};

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

export const setErrMessageMap = (messageMap: Record<string, string>) => {
  Object.assign(errMessageMap, messageMap);
};
