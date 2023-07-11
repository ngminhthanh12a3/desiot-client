import { TabsProps } from 'antd';
import { request } from 'umi';

export async function deviceFind(
  params: {
    [key: string]: any;
  } = {},
  options: { [key: string]: any } = {},
) {
  const deviceList = await request<{ data: API.DESIoTDeviceType[] }>('/api/device', {
    method: 'GET',
    params: params,
    ...options,
  });
  const tabItems: TabsProps['items'] = deviceList.data.map((datu) => ({
    key: datu._id,
    label: datu.name,
  }));
  return { data: tabItems };
}
