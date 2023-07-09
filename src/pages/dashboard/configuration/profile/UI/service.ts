import { request } from 'umi';
import _ from 'lodash';
import { RequestOptionsType } from '@ant-design/pro-components';
export function createUI(
  params: Partial<API.DESIoTUIModel>,
  options: { [key: string]: any } = {},
): Promise<API.DESIoTUIModel> {
  return request('/api/UI', {
    method: 'POST',
    data: params,
    ...options,
  });
}

export async function VSSelectRequest(
  params: { config_id: string },
  options: { [key: string]: any } = {},
) {
  const VSs = await request<API.DESIoTResponse<API.DESIoTVStorageType[]>>('/api/vstorage', {
    method: 'GET',
    params,
    ...options,
  });
  const VSSelectData: RequestOptionsType[] = VSs.data.map((vs) => ({
    value: vs._id,
    label: vs.name + ` (VS${vs.vs_id})`,
  }));
  return { data: VSSelectData };
}
