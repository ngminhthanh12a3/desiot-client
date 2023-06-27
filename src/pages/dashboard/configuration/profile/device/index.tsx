import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components"
import { FC, useRef } from "react"

import type { TableListItem, TableListPagination } from './data';
import {ModalFormButton} from './components'
import {rule, createNewDevice} from './service'
import { useRequest } from "umi";

type DeviceProps = {
    match: {
        params: {config_id: string};
      };
}

const columns: ProColumns<TableListItem>[] = [
    {
        title: 'Name',
        dataIndex: 'name',
        valueType: 'text'
    }
]
const Device:FC<DeviceProps> = (props) => {
    const actionRef = useRef<ActionType>();
    const {config_id} = props.match.params;
    const {data:dataSource, mutate, loading} = useRequest(rule, {defaultParams: [{config_id}, {}]})
    const {run: addReqRun} = useRequest(createNewDevice, {manual: true, onSuccess: (data) => mutate((oldData) => [...oldData, data])})
    const OnMFAddingDevFinish =  (formData:TableListItem) => {
         addReqRun({...formData, config_id})
         return (true);
    }
    return <ProTable<TableListItem, TableListPagination> 
    loading={loading}
        headerTitle="Device List"
        actionRef={actionRef}
        rowKey="_id"
        search={false}
        toolBarRender={() => [
            <ModalFormButton OnMFAddingDevFinish={OnMFAddingDevFinish}/>
        ]}
        // request={rule}
        dataSource={dataSource}
        columns={columns}
        // rowSelection={{}}
    />
}

export default Device