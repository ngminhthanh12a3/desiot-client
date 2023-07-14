import { vsFindOneService } from '@/services/vsSync';
import { Card, Switch } from 'antd';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useModel, useRequest } from 'umi';
import styles from './component.less';

const RunItemGenerator: FC<{ item: API.DESIoT_UIDomItem }> = ({ item }) => {
  const [itemContent, setitemContent] = useState<API.DESIoTDOMItemContent>();
  const { curSyncDev, vsSyncEEmitter, VSUpdate } = useModel('VSSync');
  const { title, vs_id = '' } = item.config;
  const { data, loading } = useRequest(vsFindOneService, {
    defaultParams: [{ _id: vs_id, config_id: curSyncDev?.config_id || '' }],
  });
  useEffect(() => {
    if (!!data) {
      const dataContent = data.data[curSyncDev?._id || ''];
      setitemContent(dataContent);
    }
    const eventName = `${curSyncDev?._id}-${vs_id}`;

    const callback = (data: string) => {
      setitemContent(data);
    };
    vsSyncEEmitter.current.on(eventName, callback);

    return () => {
      vsSyncEEmitter.current.removeListener(eventName, callback);
    };
  }, [data]);
  return (
    <Card bordered={false} title={title} loading={loading}>
      {() => {
        switch (item.type) {
          case 'label':
            return <>{itemContent || '<empty>'}</>;
          case 'switch': {
            return (
              <Switch
                checked={!!itemContent}
                onChange={(checked) => VSUpdate(Number(checked), vs_id, curSyncDev)}
              />
            );
          }
          default:
            return <></>;
        }
      }}
    </Card>
  );
};

export function generateRunDOM(items: API.DESIoT_UIDomItems) {
  return items.map((item) => (
    <div key={item.i} data-grid={item}>
      <Card style={{ height: 'inherit' }} className={styles.runItemContainer}>
        <RunItemGenerator item={item} key={item.i} />
      </Card>
    </div>
  ));
}
