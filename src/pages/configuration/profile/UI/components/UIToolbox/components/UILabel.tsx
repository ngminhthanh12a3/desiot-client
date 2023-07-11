import { DESIoT_DefaultUIComponentParams } from '@/constants';
import { Card } from 'antd';
import { FC } from 'react';
import { UIGeneralProps } from '../data';

type UILabelProps = UIGeneralProps & {
  title?: string;
  value?: string;
  droppingInitParams?: API.DESIoTDroppingItemParamsType;
  Container: FC<API.DESIoTDraggableCardProps>;
};

const UILabel: FC<UILabelProps> = ({
  title = 'Label',
  value = 'Content',
  Container,
  droppingInitParams = DESIoT_DefaultUIComponentParams['label'],
}) => {
  return (
    <Container droppingItemParams={droppingInitParams}>
      <Card title={title} bordered={false}>
        {value}
      </Card>
    </Container>
  );
};

export default UILabel;
