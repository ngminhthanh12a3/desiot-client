import { EllipsisOutlined } from '@ant-design/icons';
import { RouteContext } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Descriptions, Dropdown, MenuProps, Typography } from 'antd';
import { FC, Fragment, useEffect } from 'react';
import { history, useModel, useRequest } from 'umi';
import styles from './style.less';

const { Text } = Typography;

const tabList = [
  {
    key: 'device',
    tab: 'Device',
  },
  {
    key: 'vstorage',
    tab: 'Virtual Storage',
  },
  {
    key: 'UI',
    tab: 'UI',
  },
];

type ProfileParamsType = {
  config_id: string;
};
const Profile: FC<API.DESIoTPropsType<ProfileParamsType>> = (props) => {
  const { config_id } = props.match.params;
  const { setConfig_id } = useModel('UI');
  useEffect(() => {
    setConfig_id(config_id);

    return () => {};
  }, []);

  const { data = { name: '' }, loading } = useRequest<{ data: API.DESIoTConfig }>(
    '/api/configs/' + config_id,
  );
  const { run: deleteConfigRun } = useRequest<{ data: API.DESIoTConfig }>(
    { url: '/api/configs/' + config_id, method: 'DELETE' },
    {
      manual: true,
      onSuccess(data, params) {
        const path = props.match.url.replace(/\/[a-z0-9A-Z]{24}/g, '');
        history.push(path);
      },
    },
  );
  const getTabKey = () => {
    const { match, location } = props;
    const url = match.url === '/' ? '' : match.url;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'device';
  };

  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    history.push(`${url}/${key}`, { config_id });
  };

  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="ID">
            <Text copyable>{config_id}</Text>
          </Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

  const onDeleteConfigHandler = () => {
    if (confirm('Do you want to delete this configuration?')) {
      deleteConfigRun();
    }
  };
  const items: MenuProps['items'] = [
    {
      label: 'Delete',
      key: 'delete',
      danger: true,
      onClick: () => onDeleteConfigHandler(),
    },
  ];
  const action = (
    <RouteContext.Consumer>
      {(isMobile) => {
        return (
          <Fragment>
            <Button.Group>
              <Dropdown placement="bottomRight" menu={{ items }}>
                <Button>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </Button.Group>
          </Fragment>
        );
      }}
    </RouteContext.Consumer>
  );
  return (
    <PageContainer
      title={data.name}
      loading={loading}
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
      content={description}
      fixedHeader
      extra={action}
    >
      {props.children}
    </PageContainer>
  );
};

export default Profile;
