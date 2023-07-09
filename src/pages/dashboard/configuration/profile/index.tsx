import { PageContainer } from '@ant-design/pro-layout';
import { FC } from 'react';
import { history, useModel, useRequest } from 'umi';
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
  setConfig_id(config_id);
  const { data = { name: '' }, loading } = useRequest('/api/configs/' + config_id);

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
  return (
    <PageContainer
      title={data.name}
      loading={loading}
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
      fixedHeader
    >
      {props.children}
    </PageContainer>
  );
};

export default Profile;
