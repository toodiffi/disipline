import Taro, { RequestParams } from '@tarojs/taro';
import Cookie from 'cookie';
import { toast } from '.';

// 判定现在的环境
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const hosts = {
  dev: 'http://localhost:7001',
  prod: 'https://discipline.marktion.cn'
};
const COOKIE_KEY = 'app_cookie';
// const CSRF_TOKEN_KEY = 'csrfToken';

export const API_BASE_URL = hosts[env];

const handleHeader = header => {
  // 小程序 cookie 用逗号分割，只能特殊处理

  // 正式环境返回的是 Set-Cookie， 本地开发环境返回的是 set-cookie
  const cookie = ((header['Set-Cookie'] || header['set-cookie'] || '') as string)
    .split(/,(?=[^,]*=)/)
    .join(';');
  const SESSION_ID = Cookie.parse(cookie).SESSION_ID;
  // Cookie.serialize 默认使用 encodeURIComponent 把内容编码
  SESSION_ID && Taro.setStorageSync(COOKIE_KEY, Cookie.serialize('SESSION_ID', SESSION_ID));
  // const csrfToken = Cookie.parse(cookie).csrfToken;
  // csrfToken && Taro.setStorageSync(CSRF_TOKEN_KEY, csrfToken);
};

export default (option: RequestParams): Promise<Request.requestResult> =>
  new Promise((resolve, reject) => {
    const { url, data = {} } = option;
    const reqUrl = API_BASE_URL + url;

    // 删减没有数据的参数
    const requestData = Object.keys(data).reduce((pre: { [key: string]: any }, key) => {
      if (data[key] !== undefined) {
        pre[key] = data[key];
      }
      return pre;
    }, {});

    // 请求携带 token
    // const csrfToken = Taro.getStorageSync(CSRF_TOKEN_KEY);
    const cookie = decodeURIComponent(Taro.getStorageSync(COOKIE_KEY));
    Taro.request({
      ...option,
      data: requestData,
      url: reqUrl,
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        cookie
        // 'x-csrf-token': csrfToken
      },
      success: res => {
        if (res && res.statusCode === 200 && res.data.code === 0) {
          const { header } = res;
          handleHeader(header);
          resolve(res.data);
          return;
        }
        reject(res && res.data);
      },
      fail: error => {
        toast(error.errMsg, 'error');
        reject(error);
      }
    });
  });
