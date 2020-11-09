import request from '@/utils/request';

export async function queryCurrent(): Promise<any> {
  return request('/user/info');
}

export async function queryMessage(): Promise<any> {
  return request('/user/message');
}
