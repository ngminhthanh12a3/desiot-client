import { Col, Row } from 'antd';
import { FC } from 'react';
import { history, useRequest } from 'umi';
import DynamicProForm from '../components/DynamicProForm';
import ItemSettingModalForm from '../components/ItemSettingModalForm';
import UIToolbox from '../components/UIToolbox';
import { UIDashboardProps } from '../data';
import styles from '../index.less';
import { VSSelectRequest } from '../service';
import { updateUIDashboardData } from '../UIDashboard/service';

const EditableUIDashboard: FC<API.DESIoTPropsType<UIDashboardProps>> = (props) => {
  const { ui_id, config_id } = props.match.params;
  const { run: UIDataReqRun } = useRequest<API.DESIoTResponse<API.DESIoTUIModel>>(
    '/api/UI/' + ui_id,
    {
      manual: true,
      defaultParams: [
        {
          params: {
            config_id,
          },
        },
      ],
    },
  );

  const { run: updateUIDashboardRun } = useRequest(updateUIDashboardData, {
    manual: true,
    onSuccess(data, params) {
      const readOnlyPathname = history.location.pathname.replace('/edit', '');
      history.push(readOnlyPathname);
    },
  });
  const { run: VSSelectRequestRun } = useRequest(VSSelectRequest, {
    manual: true,
    defaultParams: [{ config_id }],
  });
  return (
    <div className={styles.editor}>
      <Row className={styles.editorBd}>
        <Col span={4} className={styles.editorSidebar}>
          <UIToolbox />
        </Col>
        <Col span={20} className={styles.editorContent}>
          <DynamicProForm
            editable={true}
            UIDataReqRun={UIDataReqRun}
            updateUIDashboardPre={updateUIDashboardPre}
          />
        </Col>
      </Row>
      <ItemSettingModalForm run={VSSelectRequestDefaultRun} />
    </div>
  );

  function updateUIDashboardPre(params: Partial<API.DESIoTUIDataType>) {
    updateUIDashboardRun({ _id: ui_id, config_id, ...params });
  }
  async function VSSelectRequestDefaultRun() {
    return await VSSelectRequestRun({ config_id });
  }
};

export default EditableUIDashboard;
