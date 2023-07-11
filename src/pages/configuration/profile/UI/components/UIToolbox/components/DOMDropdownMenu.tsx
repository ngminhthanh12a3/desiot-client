import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { FC } from 'react';
import { useModel } from 'umi';
import styles from '../../components.less';
type DOMDropdownMenuProps = {
  item: API.DESIoT_UIDomItem;
};
const DOMDropdownMenu: FC<DOMDropdownMenuProps> = ({ item }) => {
  const { UIRemoveItem, UIOpenSettingModal } = useModel('UI');
  const items: MenuProps['items'] = [
    {
      key: 'setting',
      label: 'Setting',
      icon: <SettingOutlined />,
      onClick: () => UIOpenSettingModal(item),
    },
    {
      key: 'delete',
      danger: true,
      label: 'Delete',
      icon: <DeleteOutlined />,
      onClick: () => UIRemoveItem(item.i),
    },
  ];
  return <Dropdown.Button menu={{ items }} className={styles.dropDownDnD} />;
};

export default DOMDropdownMenu;
