import { PageContainer } from '@ant-design/pro-layout';
import { FC } from 'react';
import { useRequest } from 'umi';
const tabList = [
  {
    key: 'device',
    tab: 'Device',
  },
];

type ProfileParamsType = {
  config_id: string;
};
const Profile: FC<API.DESIoTPropsType<ProfileParamsType>> = (props) => {
  const { config_id } = props.match.params;
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

  const handleTabChange = () => {};
  return (
    <PageContainer
      title={data.name}
      loading={loading}
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      {props.children}
    </PageContainer>
  );
};

export default Profile;
