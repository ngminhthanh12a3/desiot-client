import { request } from 'umi';

export function vsFindOneService(
  params: { config_id: string; _id: string },
  options: { [key: string]: any } = {},
) {
  return request<{ data: API.DESIoTVStorageType | undefined }>('/api/vstorage/' + params._id, {
    method: 'GET',
    params,
    ...options,
  });
}
