import { Card } from 'antd';
import { FC } from 'react';

const UIDOMContainer: FC<API.DESIoT_UI_DOMContainerProps> = ({ children }) => {
  return <Card style={{ height: '100%' }}>{children}</Card>;
};

export default UIDOMContainer;
