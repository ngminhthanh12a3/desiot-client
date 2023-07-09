import { Col, Row } from 'antd';
import { FC } from 'react';
import { useRequest } from 'umi';
import DynamicProForm from '../components/DynamicProForm';
import { UIDashboardProps } from '../data';
import styles from '../index.less';
const ReadOnlyUIDashboard: FC<API.DESIoTPropsType<UIDashboardProps>> = (props) => {
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
  return (
    <div className={styles.editor}>
      <Row className={styles.editorBd}>
        <Col span={24} className={styles.editorContent}>
          <DynamicProForm editable={false} UIDataReqRun={UIDataReqRun} />
        </Col>
      </Row>
    </div>
  );
};

export default ReadOnlyUIDashboard;
