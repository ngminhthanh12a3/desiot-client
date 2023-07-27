import { Empty, Tabs } from 'antd';
import { FC, useEffect } from 'react';
import { history, useLocation, useRequest } from 'umi';
import styles from './index.less';
import { deviceFind } from './service';
// const { Sider, Content } = Layout;

type DevicePageProps = API.DESIoTPropsType<{}>;
const DevicePage: FC<DevicePageProps> = (props) => {
  const { state } = useLocation<{ filter: { [key: string]: any } }>();
  const { data: items, mutate: setItems } = useRequest(deviceFind, {
    defaultParams: [{ ...state?.filter }],
    onSuccess(data, params) {
      setItems(data.map((item) => ({ ...item, children: props.children })));
    },
  });
  useEffect(
    () => setItems(items?.map((item) => ({ ...item, children: props.children }))),
    [props.children],
  );
  return (
    (items?.length && (
      <div className={styles.editor}>
        <div className={styles.editorBd}>
          <Tabs
            style={{ height: 'calc(100vh - 80px)' }}
            tabPosition="left"
            items={items}
            activeKey={getActiveKey()}
            onTabClick={onTabClick}
            destroyInactiveTabPane
          />
        </div>
      </div>
    )) || <Empty />
  );

  function getActiveKey() {
    const { url } = props.match;
    const pathNameActiveKey = props.location.pathname.replace(url, '').substring(1, 1 + 24);
    const curActiveKey = pathNameActiveKey || (items?.length && items[0].key) || '';
    return curActiveKey;
  }
  function onTabClick(activeKey: string) {
    history.push(props.match.path + '/' + activeKey);
  }
};

export default DevicePage;
