import { Button, Card, Col, Row } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useModel, useRequest } from 'umi';
import DynamicProForm from '../components/DynamicProForm';
import UIToolbox from '../components/UIToolbox';
import styles from '../index.less';
import { updateUIDashboardData } from './service';

const UIDashBoard: FC<
  API.DESIoTPropsType<{
    config_id: string;
    ui_id: string;
  }>
> = (props) => {
  const { ui_id, config_id } = props.match.params;
  const { editable, setEditable, formRef } = useModel('UI');
  const [proDynamicFormKey, setproDynamicFormKey] = useState(0);
  const {
    data: formInitialValues = { counter: 0, items: [], layout: [] },
    mutate: setFormInitialValues,
    run: UIDataReqRun,
    loading: formLoading,
  } = useRequest<API.DESIoTResponse<API.DESIoTUIDataType>>('/api/UI/' + ui_id, {
    defaultParams: [{ config_id }, {}],
    // manual: true,
  });

  const { run: updateUIDataRun } = useRequest(updateUIDashboardData, {
    manual: true,
    onSuccess(data, params) {
      setFormInitialValues(data);
      setproDynamicFormKey(proDynamicFormKey + 1);
    },
  });
  return (
    <div className={styles.editor}>
      <Row className={styles.editorBd}>
        {editable && (
          <Col span={4} className={styles.editorSidebar}>
            <UIToolbox />
          </Col>
        )}
        <Col span={editable ? 20 : 24} className={styles.editorContent}>
          <DynamicProForm
            key={proDynamicFormKey}
            formInitialValues={formInitialValues}
            // UIDataReqRun={UIDataReqRun}
            updateUIDataFinish={updateUIDataFinish}
            formLoading={formLoading}
          />
        </Col>
      </Row>
    </div>
  );
  function updateUIDataFinish(params: Partial<API.DESIoTUIModel>) {
    return updateUIDataRun({ _id: ui_id, config_id, ...params });
  }
};

export default UIDashBoard;
