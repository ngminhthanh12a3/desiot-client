import { Card } from 'antd';
import { FC } from 'react';
import { useModel } from 'umi';
import { DraggableCardProps } from '../data';
import styles from '../../components.less';

const DraggableCard: FC<DraggableCardProps> = ({ children, droppingItemParams }) => {
  const { setDroppingItem } = useModel('UI');
  return (
    <div style={{ height: '100px' }}>
      <Card
        className={styles.toolbarCardContainer}
        draggable
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', '');
          setDroppingItem(droppingItemParams);
        }}
      >
        <div className={styles.divDnD}></div>
        {children}
      </Card>
    </div>
  );
};

export default DraggableCard;
