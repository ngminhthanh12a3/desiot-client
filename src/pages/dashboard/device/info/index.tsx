import { PageContainer } from '@ant-design/pro-layout';
import { FC } from 'react';
import { useRequest } from 'umi';
import { deviceFindID } from './service';
type InfoParamsType = {
  device_id: string;
};
const Detail: FC<API.DESIoTPropsType<InfoParamsType>> = (props) => {
  const { device_id } = props.match.params;
  const { data } = useRequest(deviceFindID, { defaultParams: [{ _id: device_id }] });
  return <PageContainer title={data?.name || ''}></PageContainer>;
};

export default Detail;
