import { Space } from 'antd';
import { FC } from 'react';
import DraggableCard from './components/DraggableCard';
import FilterGraph from './components/FilterGraph';
import SWLabel from './components/SWLabel';
import UILabel from './components/UILabel';

const UIToolbox: FC = () => {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <UILabel Container={DraggableCard} />
      <SWLabel Container={DraggableCard} />
      <FilterGraph Container={DraggableCard} />
    </Space>
  );
};
export default UIToolbox;
