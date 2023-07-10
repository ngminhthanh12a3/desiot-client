import { PageContainer } from '@ant-design/pro-layout';
import { TabPaneProps } from 'antd';
import React, { FC } from 'react';
import { useModel, useRequest } from 'umi';
import { deviceFindID } from './service';
type InfoParamsType = {
  device_id: string;
};

const tabList: (TabPaneProps & {
  key?: React.ReactText;
})[] = [
  {
    key: 'UI',
    tab: 'UI',
  },
];

const Detail: FC<API.DESIoTPropsType<InfoParamsType>> = (props) => {
  const { device_id } = props.match.params;

  const { setCurSyncDev } = useModel('VSSync');
  const { data: deviceModel, loading } = useRequest(deviceFindID, {
    defaultParams: [{ _id: device_id }],
    refreshDeps: [device_id],
    onSuccess(data, params) {
      setCurSyncDev(data);
    },
  });
  // console.log(deviceModel);
  const UIDashBoards = React.Children.map(props.children, (child) =>
    React.cloneElement(child as React.ReactElement, { deviceModel }),
  );
  return (
    <PageContainer loading={loading} title={deviceModel?.name || ''} tabList={tabList}>
      {UIDashBoards}
    </PageContainer>
  );
};

export default Detail;
