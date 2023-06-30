import { request } from 'umi';

export function deviceFind(
  params: {
    [key: string]: any;
  } = { filter: {} },
  options: { [key: string]: any } = {},
): Promise<{ data: API.DESIoTDeviceType[] }> {
  return request('/api/device', {
    method: 'GET',
    params: params,
    ...options,
  });
}
