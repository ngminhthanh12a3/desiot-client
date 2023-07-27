import { ModalForm, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { TabsProps } from 'antd';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { history, useRequest } from 'umi';
import { createUI, deleteUIService, findUI } from './service';

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
      setActiveKey(data[0]?.key);
    },
    defaultParams: [{ config_id }],
  });
  const { run: createUIRun } = useRequest(createUI, {
    manual: true,
    onSuccess(data, params) {
      data?._id &&
        setItems([
          ...items,
          {
            key: data?._id,
            label: data?.name,
          },
        ]);
      if (activeKey === '') data?._id && setActiveKey(data?._id);
    },
  });
  const { run: deleteUIRun } = useRequest(deleteUIService, {
    manual: true,
    onSuccess(data, params) {
      setItems((oldItems) => _.reject(oldItems, { key: data._id }));
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
      case 'remove':
        if (typeof e === 'string')
          if (confirm('Do you want to delete this UI tab?')) deleteUIRun(e);
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
          destroyInactiveTabPane: true,
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
        modalProps={{ destroyOnClose: true }}
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
