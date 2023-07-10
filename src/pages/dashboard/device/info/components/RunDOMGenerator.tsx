import { Card, Empty } from 'antd';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useModel } from 'umi';
import styles from './component.less';

const RunItemGenerator: FC<{ item: API.DESIoT_UIDomItem }> = ({ item }) => {
  const [itemContent, setitemContent] = useState<API.DESIoTDOMItemContent>();
  const { getInitialSyncContent, curSyncDev, vsSyncEEmitter } = useModel('VSSync');
  const { title, vs_id } = item.config;
  useEffect(() => {
    getInitialSyncContent(vs_id, curSyncDev).then((initContent) => {
      setitemContent(initContent);
    });
    const eventName = `${curSyncDev?._id}-${vs_id}`;

    const callback = (data: string) => {
      console.log('get eE', data);
    };
    vsSyncEEmitter.current.on(eventName, callback);
    return () => {
      vsSyncEEmitter.current.removeListener(eventName, callback);
    };
  }, []);

  switch (item.type) {
    case 'label':
      return (
        <Card bordered={false} title={title}>
          {itemContent || '<empty>'}
        </Card>
      );
    default:
      return <></>;
  }
};

export function generateRunDOM(items: API.DESIoT_UIDomItems) {
  return items.map((item) => (
    <div key={item.i} data-grid={item}>
      <Card style={{ height: 'inherit' }} className={styles.runItemContainer}>
        <RunItemGenerator item={item} />
      </Card>
    </div>
  ));
}
