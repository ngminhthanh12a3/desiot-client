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

export function VSUpdateService(
  params: {
    config_id: string;
    _id: string;
    data: { [key: string]: any };
  },
  options: { [key: string]: any } = {},
) {
  const { _id, data, ...restParams } = params;
  return request<{ data: API.DESIoTVStorageType }>('/api/vstorage/' + _id, {
    method: 'PATCH',
    params: restParams,
    data,
    ...options,
  });
}
