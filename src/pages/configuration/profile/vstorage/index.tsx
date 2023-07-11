import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { FC, useRef } from 'react';
import { useRequest } from 'umi';
import ModalFormButton from './components/modalFormButton';
import { TableListItem } from './data';
import { createVStorage, rule } from './service';
type VStoragePropsType = {
  config_id: string;
};
const VSIDEnums = Array.from({ length: 32 }, (_, k) => ({ [k]: `VS${k}` })).reduce(
  (previousValue, currentValue) => ({ ...previousValue, ...currentValue }),
);

const VStorage: FC<API.DESIoTPropsType<VStoragePropsType>> = (props) => {
  const { config_id } = props.match.params;
  const actionRef = useRef<ActionType>();
  const { data: dataSource, mutate } = useRequest(rule, {
    defaultParams: [{ config_id }],
  });
  const { run: createVStorageRun } = useRequest(createVStorage, {
    manual: true,
    onSuccess(data, params) {
      mutate((oldData) => [...oldData, data]);
    },
  });
  const onModalFormFinish = async (formData: TableListItem) => {
    createVStorageRun(formData);
    return true;
  };
  const columns: ProColumns<API.DESIoTVStorageType>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: 'VStorage ID',
      dataIndex: 'vs_id',
      valueType: 'text',
      valueEnum: VSIDEnums,
    },
    {
      title: 'Data Type',
      dataIndex: 'type',
      valueType: 'text',
      valueEnum: {
        0: 'Integer',
      },
    },
  ];
  return (
    <ProTable
      headerTitle="Virtual Storage"
      actionRef={actionRef}
      rowKey="_id"
      search={false}
      toolBarRender={() => [
        <ModalFormButton onModalFormFinish={onModalFormFinish} config_id={config_id} />,
      ]}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default VStorage;
