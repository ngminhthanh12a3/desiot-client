import { FC } from 'react';
type DevicePageProps = API.DESIoTPropsType<{}>;
const DevicePage: FC<DevicePageProps> = (props) => {
  return <>{props.children}</>;
};

export default DevicePage;
