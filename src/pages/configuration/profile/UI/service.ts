import { request } from 'umi';
import _ from 'lodash';
import { RequestOptionsType } from '@ant-design/pro-components';
import { TabsProps } from 'antd';
export function createUI(
  params: Partial<API.DESIoTUIModel>,
  options: { [key: string]: any } = {},
): Promise<{ data: API.DESIoTUIModel }> {
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

export async function findUI(params: { config_id: string }, options: { [key: string]: any } = {}) {
  const { data: UIModels = [] } = await request<{ data: API.DESIoTUIModel[] }>('/api/UI', {
    method: 'GET',
    params,
    ...options,
  });
  const UITabs: TabsProps['items'] = UIModels.map((UIModel) => ({
    key: UIModel._id,
    label: UIModel.name,
  }));
  return { data: UITabs };
}

export function deleteUIService(_id: string) {
  return request<{ data: API.DESIoTUIModel }>('/api/UI/' + _id, {
    method: 'DELETE',
  });
}
