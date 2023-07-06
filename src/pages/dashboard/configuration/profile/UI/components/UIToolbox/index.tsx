import { Space } from 'antd';
import { FC } from 'react';
import DraggableCard from './components/DraggableCard';
import UILabel from './components/UILabel';

const UIToolbox: FC = () => {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <UILabel Container={DraggableCard} />
    </Space>
  );
};
export default UIToolbox;
