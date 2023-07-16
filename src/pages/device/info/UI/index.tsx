import { Tabs } from 'antd';
import { FC } from 'react';
import { useRequest } from 'umi';
import RGL_RUN_UI from '../components/RGL_RUN_UI';
import { RunUIDashboardTabFind } from '../service';

const UI: FC<
  API.DESIoTPropsType<{ device_id: string }> & { deviceModel: API.DESIoTDeviceType | undefined }
> = ({ deviceModel, ...props }) => {
  const { data: UIDashboardTabs, mutate: setUIDasboardTabs } = useRequest(RunUIDashboardTabFind, {
    defaultParams: [{ config_id: deviceModel?.config_id || 'unknown' }],
    onSuccess(data, params) {
      setUIDasboardTabs(
        data.map((datu) => ({
          ...datu,
          children: <RGL_RUN_UI items={datu.items} />,
        })),
      );
    },
  });
  return <Tabs items={UIDashboardTabs} destroyInactiveTabPane />;
};

export default UI;
