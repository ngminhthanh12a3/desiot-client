import { DESIoT_DefaultUIComponentParams } from '@/constants';
import { Card, Switch } from 'antd';
import { FC } from 'react';
import { UIGeneralProps } from '../data';

type UILabelProps = UIGeneralProps & {
  title?: string;
  value?: string;
  droppingInitParams?: API.DESIoTDroppingItemParamsType;
  Container: FC<API.DESIoTDraggableCardProps>;
};

const SWLabel: FC<UILabelProps> = ({
  title = 'Switch',
  value = 1,
  Container,
  droppingInitParams = DESIoT_DefaultUIComponentParams['switch'],
}) => {
  return (
    <Container droppingItemParams={droppingInitParams}>
      <Card title={title} bordered={false}>
        <Switch defaultChecked={!!value} />
      </Card>
    </Container>
  );
};

export default SWLabel;
