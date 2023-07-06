import _ from 'lodash';
import { Card } from 'antd';
import styles from './components.less';
import DOMDropdownMenu from './UIToolbox/components/DOMDropdownMenu';
import { useModel } from 'umi';

export function generateEditaleDOM(items: API.DESIoT_UIDomItems): JSX.Element[] {
  const { editable } = useModel('UI');
  return _.map(items, (item) => {
    return (
      <div key={item.i} data-grid={item} className={styles.DomEditableGenerator}>
        <Card style={{ height: 'inherit' }}>DOM</Card>
        {editable && (
          <div className={styles.divDnD}>
            <DOMDropdownMenu key={'DOMDropdownMenu' + item.i} item={item} />
          </div>
        )}
      </div>
    );
  });
}
