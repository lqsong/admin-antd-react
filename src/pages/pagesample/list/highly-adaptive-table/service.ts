import request from '@/utils/request';
import { TableListQueryParams, TableListItem } from './data.d';

export async function queryList(params?: TableListQueryParams): Promise<any> {
  return request('/pages/list', {
    params,
  });
}

export async function createData(
  params: Omit<TableListItem, 'id'>,
): Promise<any> {
  return request('/pages/list', {
    method: 'POST',
    data: params,
  });
}

export async function updateData(
  id: number,
  params: Omit<TableListItem, 'id'>,
): Promise<any> {
  return request(`/pages/list/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeData(id: number): Promise<any> {
  return request(`/pages/list/${id}`, {
    method: 'delete',
  });
}

export async function detailData(id: number): Promise<any> {
  return request(`/pages/list/${id}`);
}
