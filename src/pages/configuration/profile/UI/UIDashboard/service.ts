import { DESIoTResponse } from '@/services/ant-design-pro/typings';
import { request } from 'umi';

export function updateUIDashboardData(
  params: Partial<API.DESIoTUIModel>,
  options: { [key: string]: any } = {},
): Promise<DESIoTResponse<API.DESIoTUIModel>> {
  return request('/api/UI/' + params._id, {
    method: 'PATCH',
    data: params,
    ...options,
  });
}
