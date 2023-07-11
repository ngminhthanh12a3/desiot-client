import { request } from 'umi';
import { TableListItem } from './data';

export async function rule(
  params: {
    current?: number;
    pageSize?: number;
    config_id: string;
  },
  options: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/device', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createNewDevice(params: Partial<TableListItem>): Promise<{ data: any }> {
  return request('/api/device', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
