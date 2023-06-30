import { request } from 'umi';

export function deviceFindID(
  params: { _id: string },
  options: { [key: string]: any } = {},
): Promise<{ data: API.DESIoTDeviceType }> {
  return request('/api/device/' + params._id, {
    method: 'GET',
    params: params,
    ...options,
  });
}
