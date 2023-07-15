import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  colorWeak: false,
  title: 'DESIoT',
  logo: 'https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-cloud-network-and-cloud-computing-flatart-icons-flat-flatarticons-10.png',
  iconfontUrl: '',
  footerRender: false,
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  pwa: true,
  headerHeight: 48,
};

export default Settings;
