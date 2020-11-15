/**
 * 自定义 request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 * @author LiQingSong
 */
import { history } from 'umi';
import { extend } from 'umi-request';
import { notification } from 'antd';
import settings from '@/config/settings';
import { getToken, setToken } from '@/utils/localToken';

export interface ResponseData {
  code: number;
  data?: any;
  msg?: string;
  token?: string;
}

const customCodeMessage: any = {
  10002: '当前用户登入信息已失效，请重新登入再操作', // 未登陆
};

const serverCodeMessage: any = {
  200: '服务器成功返回请求的数据',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: {
  response: Response;
  message: string;
  data: any;
}) => {
  const { response, message, data } = error;

  if (message === 'CustomError') {
    // 自定义错误

    const { req, res } = data;
    const { url } = req;
    const { code } = res;

    const reqUrl = url.split('?')[0].replace(API_HOST, '');
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) {
      notification.error({
        message: `提示`,
        description: customCodeMessage[code] || res.msg || 'Error',
      });

      if (code === 10002) {
        history.replace({
          pathname: '/user/login',
        });
      }
    }
  } else if (message === 'CancelToken') {
    // 取消请求 Token
    // eslint-disable-next-line no-console
    console.log(message);
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  // return error; // 如果return. 正常返回,走try正常流程.

  throw error; // 如果throw. 错误将继续抛出,走catch流程.
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'same-origin', // 默认请求是否带上cookie
  prefix: API_HOST,
});

request.use(async (ctx, next) => {
  // 请求前
  const { req } = ctx;
  const { options } = req;

  const headers = {};
  const headerToken = await getToken();
  if (headerToken) {
    headers[settings.ajaxHeadersTokenKey] = headerToken;
  }

  ctx.req.options = {
    ...options,
    headers,
  };

  await next();

  // 请求后
  const { res } = ctx;
  const { code, token } = res;

  /**
   * 统一 ajax 验证
   * 如果自定义代码不是 0，则判断为错误。
   */
  if (code !== 0) {
    return Promise.reject({
      data: ctx,
      message: 'CustomError',
    });
  }

  // 重置刷新token
  if (token) {
    await setToken(token);
  }
});

export default request;
