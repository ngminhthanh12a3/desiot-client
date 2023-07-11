import { request } from 'umi';
import { TableListItem } from './data';

export function createVStorage(
  params: Partial<TableListItem>,
): Promise<{ data: API.DESIoTVStorageType }> {
  return request('/api/vstorage', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function rule(params: { config_id: string }, options: { [key: string]: any } = {}) {
  return request<{ data: API.DESIoTVStorageType[] }>('/api/vstorage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...options,
  });
}
