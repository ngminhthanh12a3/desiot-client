import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { FC, useRef } from 'react';

import type { TableListItem, TableListPagination } from './data';
import { ModalFormButton } from './components';
import { rule, createNewDevice } from './service';
import { history, useRequest } from 'umi';
import { Typography } from 'antd';

const { Paragraph } = Typography;

type DeviceParamsType = {
  config_id: string;
};

const Device: FC<API.DESIoTPropsType<DeviceParamsType>> = (props) => {
  const { config_id } = props.match.params;
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      tooltip: 'Click to open the detail page',
      render(dom, entity, index, action, schema) {
        return (
          <a
            onClick={() =>
              history.push('/dashboard/device/' + entity._id, {
                filter: { config_id },
              })
            }
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'ID',
      dataIndex: '_id',
      valueType: 'password',
      render(dom, entity, index, action, schema) {
        return (
          <Paragraph copyable ellipsis>
            {entity._id}
          </Paragraph>
        );
      },
    },
  ];
  const actionRef = useRef<ActionType>();
  const {
    data: dataSource,
    mutate,
    loading,
  } = useRequest(rule, { defaultParams: [{ config_id }, {}] });
  const { run: addReqRun } = useRequest(createNewDevice, {
    manual: true,
    onSuccess: (data) => mutate((oldData) => [...oldData, data]),
  });
  const OnMFAddingDevFinish = (formData: TableListItem) => {
    addReqRun({ ...formData, config_id });
    return true;
  };
  return (
    <ProTable<TableListItem, TableListPagination>
      loading={loading}
      headerTitle="Device List"
      actionRef={actionRef}
      rowKey="_id"
      search={false}
      toolBarRender={() => [<ModalFormButton OnMFAddingDevFinish={OnMFAddingDevFinish} />]}
      // request={rule}
      dataSource={dataSource}
      columns={columns}
      // rowSelection={{}}
    />
  );
};

export default Device;
