import { useRef, useState } from 'react';
import _ from 'lodash';
import { ProFormInstance } from '@ant-design/pro-components';
// type DroppingItemParamsType = API.DESIoTDraggableCardProps;
export default () => {
  // const [items, setItems] = useState<API.DESIoT_UIDomItems>([]);
  const formRef = useRef<ProFormInstance<API.DESIoTUIDataType>>();

  const [droppingItem, setDroppingItem] = useState<API.DESIoTDroppingItemParamsType>({
    i: 'test',
    w: 3,
    h: 3,
  });
  const [editable, setEditable] = useState(false);
  const [config_id, setConfig_id] = useState<string>();
  const [setingItem, setSetingItem] = useState<API.DESIoT_UIDomItem>();
  const [modalFormOpen, setmodalFormOpen] = useState(false);

  return {
    droppingItem: droppingItem,
    setDroppingItem,
    UIRemoveItem,
    // items,
    UIAddItem,
    // setItems,
    formRef,
    editable,
    setEditable,
    config_id,
    setConfig_id,
    UIOpenSettingModal,
    setingItem,
    modalFormOpen,
    setmodalFormOpen,
    UIUpdateItem,
  };

  function UIRemoveItem(i: string) {
    // setItems(_.reject(items, { i: i }));
    const items = formRef.current?.getFieldValue('items');
    formRef.current?.setFieldValue('items', _.reject(items, { i: i }));
  }
  function UIAddItem(i: API.DESIoT_UIDomItem) {
    const items = formRef.current?.getFieldValue('items');
    formRef.current?.setFieldValue('items', items.concat(i));
    // setItems();
  }

  function UIOpenSettingModal(item: API.DESIoT_UIDomItem) {
    setSetingItem(item);
    setmodalFormOpen(true);
  }

  function UIUpdateItem(
    settingItem: API.DESIoT_UIDomItem,
    configUpdate: Partial<API.DESIoT_UIDomItemAdditionalAtts>,
  ) {
    const items: API.DESIoT_UIDomItems = formRef.current?.getFieldValue('items');
    formRef.current?.setFieldValue(
      'items',
      items.map((item) =>
        item.i === settingItem.i
          ? {
              ...item,
              ...configUpdate,
            }
          : item,
      ),
    );
  }
};
