import _ from 'lodash';
import { Card } from 'antd';
import styles from './components.less';
import DOMDropdownMenu from './UIToolbox/components/DOMDropdownMenu';
import { useModel } from 'umi';

export function generateEditaleDOM(items: API.DESIoT_UIDomItems, editable: boolean): JSX.Element[] {
  return _.map(items, (item) => {
    return (
      <div key={item.i} data-grid={item} className={styles.DomEditableGenerator}>
        <Card style={{ height: 'inherit' }} className={styles.editableItemContainer}>
          {generateEditableItem(item)}
        </Card>
        {editable && (
          <div className={styles.divDnD}>
            <DOMDropdownMenu key={'DOMDropdownMenu' + item.i} item={item} />
          </div>
        )}
      </div>
    );
  });
}

function generateEditableItem(item: API.DESIoT_UIDomItem) {
  const { title } = item.config;
  switch (item.type) {
    case 'label':
      return (
        <Card bordered={false} title={title}>
          Content
        </Card>
      );
    default:
      return <>unknow</>;
  }
}
