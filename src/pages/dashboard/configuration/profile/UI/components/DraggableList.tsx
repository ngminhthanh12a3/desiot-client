import { ProList } from '@ant-design/pro-components';
import { Card, List, Space } from 'antd';
import VirtualList from 'rc-virtual-list';
import { FC } from 'react';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

const DraggableList: FC = () => {
  return (
    //   <Space direction="vertical" size="large" style={{ display: 'flex', height: '100%' }}>
    <List style={{ height: '100%' }}>
      <VirtualList data={data} style={{ height: '100%' }} itemHeight={47} itemKey="title">
        {(item) => (
          <List.Item>
            <Card key={item.title}>Content</Card>
          </List.Item>
        )}
      </VirtualList>
    </List>
    // </Space>
  );
};

export default DraggableList;
