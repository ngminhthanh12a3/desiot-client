import { TabsProps } from 'antd';
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

export function RunUIDashboardFind(
  params: { config_id: string },
  options: { [key: string]: any } = {},
) {
  return request<{ data: API.DESIoTUIModel[] }>('/api/UI', {
    method: 'GET',
    params,
    ...options,
  });
}

export async function RunUIDashboardTabFind(
  params: { config_id: string },
  options: { [key: string]: any } = {},
) {
  const { data: UIDashboards } = await RunUIDashboardFind(params, options);
  const UIDashboardTabs = UIDashboards.map((dashboard) => ({
    key: dashboard._id,
    label: dashboard.name,
    ...dashboard,
  }));
  return { data: UIDashboardTabs };
}

export function filterLineDataService(params: number[], options: { [key: string]: any } = {}) {
  return request<{ data: number[] }>('/api/dsp/digital_filtering', {
    method: 'POST',
    data: params,
    ...options,
  });
}
