import request from '@/utils/request';

export async function queryDetail(): Promise<any> {
  return request('/pages/detail');
}
