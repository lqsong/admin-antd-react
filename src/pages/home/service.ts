import request from '@/utils/request';
import { TableListQueryParams } from './data.d';

export async function dailynewArticles(): Promise<any> {
  return request('/home/articles/dailynew');
}

export async function weeknewWorks(): Promise<any> {
  return request('/home/works/weeknew');
}

export async function monthnewTopics(): Promise<any> {
  return request('/home/topics/monthnew');
}

export async function annualnewLinks(): Promise<any> {
  return request('/home/links/annualnew');
}

export async function hotSearchQueryList(
  params?: TableListQueryParams,
): Promise<any> {
  return request('/home/searchs/keywords', {
    params,
  });
}

export async function hotTagsQueryList(
  params?: TableListQueryParams,
): Promise<any> {
  return request('/home/tags', {
    params,
  });
}

export async function articleHitQueryList(
  params?: TableListQueryParams,
): Promise<any> {
  return request('/home/articles', {
    params,
  });
}

export async function worksHitQueryList(
  params?: TableListQueryParams,
): Promise<any> {
  return request('/home/works', {
    params,
  });
}
