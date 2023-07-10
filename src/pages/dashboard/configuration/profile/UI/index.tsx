import { ModalForm, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { TabsProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { history, useRequest } from 'umi';
import { createUI, findUI } from './service';

const UI: FC<
  API.DESIoTPropsType<{
    config_id: string;
  }>
> = (props) => {
  // const [items, setItems] = useState(initialItems);
  const { config_id } = props.match.params;
  const {
    data: items = [],
    mutate: setItems,
    loading,
  } = useRequest(findUI, {
    onSuccess(data, params) {
      const UIDataArray: API.DESIoTUIModel[] = data as API.DESIoTUIModel[];
      setItems(
        UIDataArray.map((ui) => ({
          key: ui._id,
          label: ui.name,
        })),
      );
      setActiveKey(UIDataArray[0]?._id);
    },
    defaultParams: [{ config_id }],
  });
  const { run: createUIRun } = useRequest(createUI, {
    manual: true,
    onSuccess(data, params) {
      const UIData: API.DESIoTUIModel = data as API.DESIoTUIModel;
      setItems([
        ...items,
        {
          key: UIData._id,
          label: UIData.name,
        },
      ]);
      if (activeKey === '') setActiveKey(UIData._id);
    },
  });

  const [activeKey, setActiveKey] = useState<string>('');
  const [modalVisit, setModalVisit] = useState(false);
  const onChange: TabsProps['onChange'] = (activeKey) => {
    setActiveKey(activeKey);
  };

  const onEdit: TabsProps['onEdit'] = (e, action) => {
    switch (action) {
      case 'add':
        setModalVisit(true);
        break;

      default:
        break;
    }
  };
  const onTabClick: TabsProps['onTabClick'] = (activeKey, e) => {
    if (!((e.target as any).baseURI as string).includes(activeKey))
      pushActiveKeyToHistory(activeKey);
  };
  useEffect(() => {
    if (activeKey?.length) {
      pushActiveKeyToHistory(activeKey);
    }
  }, [activeKey]);
  useEffect(() => {
    setItems(
      items.map((item: any) => ({
        ...item,
        children: props.children,
      })),
    );
  }, [props.children]);
  return (
    <>
      <ProCard
        tabs={{
          type: 'editable-card',
          onChange,
          activeKey,
          onEdit,
          items,
          onTabClick,
        }}
        loading={loading}
      ></ProCard>
      {/* {props.children} */}
      <ModalForm<Partial<API.DESIoTUIModel>>
        title="Add new UI"
        open={modalVisit}
        onFinish={async (value) => {
          createUIRun(value);
          return true;
        }}
        onOpenChange={setModalVisit}
        initialValues={{ config_id }}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="UI Name"
          rules={[
            {
              required: true,
              message: 'Please type UI name!',
            },
          ]}
        />
        <ProForm.Item name="config_id" />
      </ModalForm>
    </>
  );

  function pushActiveKeyToHistory(activeKey: string) {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    history.push(`${url}/${activeKey}`);
  }
};

export default UI;
